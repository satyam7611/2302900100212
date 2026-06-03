import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { fetchNotifications } from '../services/notificationService';
import { getSortedPriorityNotifications } from '../utils/priorityCalculator';
import useLocalStorage from '../hooks/useLocalStorage';
import { logInfo, logError, logFatal } from '../../../logging_middleware/logger';

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  // State for all accumulated notifications (pool for priority calculation and deduplication)
  const [notificationPool, setNotificationPool] = useState({});
  
  // State for active notifications shown on the current paginated view
  const [currentPageNotifications, setCurrentPageNotifications] = useState([]);
  
  // Read state persisted in localStorage
  const [readIds, setReadIds] = useLocalStorage('campus_notifications_read_ids', []);
  
  // Configuration states
  const [filterType, setFilterType] = useState('All');
  const [topN, setTopN] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  
  // UI States
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [error, setError] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  // Reference trackers
  const paramsRef = useRef({ currentPage, limitPerPage, filterType });
  const prevPageRef = useRef(1);

  // Keep a reference to latest state values to use inside the polling interval
  useEffect(() => {
    paramsRef.current = { currentPage, limitPerPage, filterType };
  }, [currentPage, limitPerPage, filterType]);

  // Log application startup initialization
  useEffect(() => {
    logInfo('component', 'Application initialized and mounted successfully');
    
    // Global exception handler logging
    const handleUnhandledException = (event) => {
      logFatal('component', `Unhandled application exception: ${event.message || 'Unknown runtime error'}`);
    };
    
    window.addEventListener('error', handleUnhandledException);
    return () => window.removeEventListener('error', handleUnhandledException);
  }, []);

  // Track page change navigation
  useEffect(() => {
    if (currentPage !== prevPageRef.current) {
      logInfo('component', `User navigated to page ${currentPage}`);
      prevPageRef.current = currentPage;
    }
  }, [currentPage]);

  /**
   * Helper to merge new notifications into the global pool for priority sorting
   */
  const mergeIntoPool = useCallback((newItems) => {
    if (!newItems || newItems.length === 0) return;
    
    setNotificationPool((prevPool) => {
      const updatedPool = { ...prevPool };
      newItems.forEach((item) => {
        const id = item.ID || item.id;
        if (id) {
          // Keep existing item or merge. Ensure keys match the API format (capitalized ID, Type, Message, Timestamp)
          updatedPool[id] = {
            ID: id,
            Type: item.Type || item.type,
            Message: item.Message || item.message,
            Timestamp: item.Timestamp || item.timestamp,
          };
        }
      });
      return updatedPool;
    });
  }, []);

  /**
   * Primary fetch function
   */
  const loadNotifications = useCallback(async (isBackground = false) => {
    if (isBackground) {
      setPolling(true);
    } else {
      setLoading(true);
      setError(null);
    }

    try {
      const currentParams = paramsRef.current;
      const data = await fetchNotifications({
        page: currentParams.currentPage,
        limit: currentParams.limitPerPage,
        type: currentParams.filterType,
      });

      // Handle both { notifications: [...] } and standard array responses
      const fetchedItems = data.notifications || data || [];
      
      // Update paginated list
      setCurrentPageNotifications(fetchedItems);
      
      // Merge into pool for priority calculation
      mergeIntoPool(fetchedItems);

      // Log success to the logging middleware
      logInfo('api', `Notifications fetched successfully: retrieved ${fetchedItems.length} alerts for page ${currentParams.currentPage} with filter "${currentParams.filterType}"`);

      // If background poll fetched new items, maybe show a brief alert
      if (isBackground && fetchedItems.length > 0) {
        setSnackbarMessage('Notifications updated in real-time');
      }
    } catch (err) {
      console.error('Failed to load notifications:', err);
      
      const errMsg = err.message || 'Unknown connectivity issue';
      
      // Only set error state if not a background poll, or if the initial load failed
      if (!isBackground) {
        if (err.response && err.response.status === 401) {
          setError('Unauthorized access. Please configure your ACCESS_TOKEN in src/config/affordmedConfig.js.');
          logError('api', 'Unauthorized API access: Token validation failed on GET /notifications');
        } else if (!navigator.onLine) {
          setError('Network failure. Please check your internet connection.');
          logError('api', 'Failed to fetch notifications: Network offline status detected');
        } else {
          setError('Failed to fetch notifications from the campus API. Please check your connection or try again later.');
          logError('api', `Failed to fetch notifications due to network timeout or server error: ${errMsg}`);
        }
      } else {
        logError('api', `Background polling fetch failed silently: ${errMsg}`);
      }
    } finally {
      setLoading(false);
      setPolling(false);
    }
  }, [mergeIntoPool]);

  // Effect to load data when page, limit, or filter changes
  useEffect(() => {
    loadNotifications(false);
  }, [currentPage, limitPerPage, filterType, loadNotifications]);

  // Effect for 30 seconds real-time background polling
  useEffect(() => {
    const interval = setInterval(() => {
      loadNotifications(true);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [loadNotifications]);

  // Priority notifications calculation: unread notifications from pool sorted by computed priority
  const getPriorityList = useCallback(() => {
    const allItems = Object.values(notificationPool);
    const unreadItems = allItems.filter(item => !readIds.includes(item.ID));
    const sorted = getSortedPriorityNotifications(unreadItems);
    return sorted.slice(0, topN);
  }, [notificationPool, readIds, topN]);

  // Mark notification as read
  const markAsRead = useCallback((id) => {
    if (!id) return;
    setReadIds((prevIds) => {
      if (prevIds.includes(id)) return prevIds;
      return [...prevIds, id];
    });
    logInfo('component', `Notification marked as read: ${id}`);
  }, [setReadIds]);

  // Mark all notifications in current pool as read
  const markAllAsRead = useCallback(() => {
    const allIds = Object.keys(notificationPool);
    setReadIds(allIds);
    setSnackbarMessage('All notifications marked as read');
    logInfo('component', `User executed bulk mark all as read for ${allIds.length} notifications`);
  }, [notificationPool, setReadIds]);

  // Toggle filter type
  const handleFilterChange = useCallback((newType) => {
    setFilterType(newType);
    setCurrentPage(1); // Reset to page 1 on filter
    logInfo('component', `User selected ${newType} filter`);
  }, []);

  // Compute Statistics
  const getStats = useCallback(() => {
    const allItems = Object.values(notificationPool);
    const total = allItems.length;
    const unread = allItems.filter(item => !readIds.includes(item.ID)).length;
    const placements = allItems.filter(item => item.Type === 'Placement').length;
    const results = allItems.filter(item => item.Type === 'Result').length;
    const events = allItems.filter(item => item.Type === 'Event').length;

    return {
      total,
      unread,
      placements,
      results,
      events,
    };
  }, [notificationPool, readIds]);

  const value = {
    notifications: currentPageNotifications,
    priorityNotifications: getPriorityList(),
    readIds,
    filterType,
    topN,
    currentPage,
    limitPerPage,
    loading,
    polling,
    error,
    snackbarMessage,
    stats: getStats(),
    setSnackbarMessage,
    markAsRead,
    markAllAsRead,
    setFilterType: handleFilterChange,
    setTopN,
    setCurrentPage,
    setLimitPerPage,
    refreshFeed: () => loadNotifications(false),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
