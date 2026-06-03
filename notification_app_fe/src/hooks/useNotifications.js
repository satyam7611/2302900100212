import { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';

/**
 * Hook to consume the notification state and actions.
 * @returns {Object} Notification context value
 */
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default useNotifications;
