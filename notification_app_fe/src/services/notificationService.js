import apiClient from './api';

/**
 * Fetches notifications from the API with pagination and type filtering.
 * 
 * @param {Object} options
 * @param {number} options.page - Page number (1-based)
 * @param {number} options.limit - Number of items to retrieve
 * @param {string} options.type - Filter type ('All', 'Placement', 'Result', 'Event')
 * @returns {Promise<Object>} API Response JSON containing notifications array
 */
export const fetchNotifications = async ({ page = 1, limit = 10, type = 'All' } = {}) => {
  const params = {
    page,
    limit,
  };

  // Add notification_type parameter only if filtering to a specific type
  if (type && type !== 'All') {
    params.notification_type = type;
  }

  const response = await apiClient.get('/notifications', { params });
  
  // Return the data directly
  return response.data;
};
