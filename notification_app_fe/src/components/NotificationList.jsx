import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import NotificationCard from './NotificationCard';
import { useNotifications } from '../hooks/useNotifications';

const NotificationList = () => {
  const { notifications, filterType } = useNotifications();

  if (!notifications || notifications.length === 0) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 5, 
          textAlign: 'center', 
          border: '1px dashed #cbd5e1', 
          borderRadius: '16px',
          bgcolor: '#fafafa'
        }}
      >
        <InboxIcon sx={{ fontSize: '3.5rem', color: '#cbd5e1', mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#64748b', mb: 1 }}>
          No Notifications Found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {filterType === 'All' 
            ? 'There are currently no notifications in the campus feed.' 
            : `There are no notifications matching the "${filterType}" category.`}
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 700, 
            color: '#1e293b', 
            fontFamily: "'Outfit', 'Inter', sans-serif" 
          }}
        >
          All Notifications
        </Typography>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
          Showing {notifications.length} alerts
        </Typography>
      </Box>
      
      <Box>
        {notifications.map((notification) => (
          <NotificationCard 
            key={notification.ID || notification.id} 
            notification={notification} 
            isPriorityView={false} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default NotificationList;
