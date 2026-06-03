import { TYPE_WEIGHTS } from '../constants/notificationTypes';

// Parse ISO date from string
export const parseTimestamp = (timestampStr) => {
  if (!timestampStr) return 0;
  const formattedStr = timestampStr.trim().replace(' ', 'T');
  const date = new Date(formattedStr);
  return isNaN(date.getTime()) ? 0 : date.getTime();
};

// Priority calculation: typeWeight * 1000 + recencyScore (normalized 0-999)
export const calculatePriorityScore = (notification, minTime, maxTime) => {
  const type = notification.Type || notification.type;
  const weight = TYPE_WEIGHTS[type] || 0;
  const timestamp = parseTimestamp(notification.Timestamp || notification.timestamp);

  let recencyScore = 0;
  if (maxTime > minTime) {
    recencyScore = ((timestamp - minTime) / (maxTime - minTime)) * 999;
  } else {
    recencyScore = 999;
  }

  return (weight * 1000) + recencyScore;
};

// Sort unread notifications by priority score descending
export const getSortedPriorityNotifications = (unreadNotifications) => {
  if (!unreadNotifications || unreadNotifications.length === 0) return [];

  const itemsWithTime = unreadNotifications.map(item => ({
    ...item,
    parsedTime: parseTimestamp(item.Timestamp || item.timestamp)
  }));

  const times = itemsWithTime.map(item => item.parsedTime);
  const minTime = Math.min(...times);
  const maxTime = Math.max(...times);

  return itemsWithTime
    .map(item => {
      const score = calculatePriorityScore(item, minTime, maxTime);
      return {
        ...item,
        priorityScore: Math.round(score * 100) / 100
      };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
};
