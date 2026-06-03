import React from 'react';
import { Box, Typography, Paper, Alert, AlertTitle } from '@mui/material';
import { Star as StarIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import NotificationCard from './NotificationCard';
import { useNotifications } from '../hooks/useNotifications';

const PriorityNotifications = () => {
  const { priorityNotifications, topN } = useNotifications();

  if (!priorityNotifications || priorityNotifications.length === 0) {
    return (
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          bgcolor: '#fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.01)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200
        }}
      >
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: '50%', 
            bgcolor: '#e8f5e9', 
            color: '#2e7d32', 
            mb: 2,
            display: 'inline-flex'
          }}
        >
          <CheckCircleIcon sx={{ fontSize: '2rem' }} />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          Priority Inbox Clear!
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 300 }}>
          You have read all important updates regarding placements, results, and events.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box 
        sx={{ 
          mb: 2.5, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <StarIcon sx={{ color: '#eab308' }} />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700, 
              color: '#1e293b', 
              fontFamily: "'Outfit', 'Inter', sans-serif" 
            }}
          >
            Priority Inbox (Top {topN})
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ fontWeight: 600, color: '#64748b' }}>
          Sorted by Type Weight & Recency
        </Typography>
      </Box>

      <Box>
        {priorityNotifications.map((notification) => (
          <NotificationCard 
            key={`priority-${notification.ID || notification.id}`} 
            notification={notification} 
            isPriorityView={true} 
          />
        ))}
      </Box>
    </Box>
  );
};

export default PriorityNotifications;
