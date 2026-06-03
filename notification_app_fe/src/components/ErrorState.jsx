import React from 'react';
import { Paper, Typography, Button, Box } from '@mui/material';
import { Error as ErrorIcon, Replay as ReplayIcon, WifiOff as WifiOffIcon, LockOpen as LockOpenIcon } from '@mui/icons-material';

const ErrorState = ({ message, onRetry }) => {
  const isNetworkError = message && message.toLowerCase().includes('network');
  const isAuthError = message && message.toLowerCase().includes('unauthorized');

  const getIcon = () => {
    if (isNetworkError) {
      return <WifiOffIcon sx={{ fontSize: '3.5rem', color: '#ef4444', mb: 2 }} />;
    }
    if (isAuthError) {
      return <LockOpenIcon sx={{ fontSize: '3.5rem', color: '#eab308', mb: 2 }} />;
    }
    return <ErrorIcon sx={{ fontSize: '3.5rem', color: '#ef4444', mb: 2 }} />;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 5,
        textAlign: 'center',
        border: '1px solid #fee2e2',
        borderRadius: '16px',
        bgcolor: '#fef2f2',
        maxWidth: 500,
        mx: 'auto',
        my: 4,
        boxShadow: '0 4px 15px rgba(239, 68, 68, 0.05)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {getIcon()}
        
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#991b1b', mb: 1 }}>
          {isAuthError ? 'Authentication Required' : 'Connection Error'}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
          {message || 'An unexpected error occurred while fetching notifications.'}
        </Typography>

        <Button
          variant="contained"
          color="error"
          startIcon={<ReplayIcon />}
          onClick={onRetry}
          sx={{
            borderRadius: '20px',
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            py: 1,
            boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)',
            bgcolor: '#dc2626',
            '&:hover': {
              bgcolor: '#b91c1c',
            }
          }}
        >
          Retry Connection
        </Button>
      </Box>
    </Paper>
  );
};

export default ErrorState;
