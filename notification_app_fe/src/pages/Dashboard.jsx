import React, { useState } from 'react';
import { 
  Box, 
  CssBaseline, 
  Toolbar, 
  Container, 
  Grid, 
  Typography,
  Snackbar,
  Alert,
  LinearProgress,
  Chip
} from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import StatsCards from '../components/StatsCards';
import FilterBar from '../components/FilterBar';
import PriorityNotifications from '../components/PriorityNotifications';
import NotificationList from '../components/NotificationList';
import PaginationBar from '../components/PaginationBar';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ErrorState from '../components/ErrorState';
import { useNotifications } from '../hooks/useNotifications';

const drawerWidth = 260;

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { 
    loading, 
    polling, 
    error, 
    snackbarMessage, 
    setSnackbarMessage, 
    refreshFeed 
  } = useNotifications();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarMessage(null);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <CssBaseline />
      
      {/* Top Navigation Bar */}
      <Header onDrawerToggle={handleDrawerToggle} />
      
      {/* Side Navigation Bar */}
      <Sidebar mobileOpen={mobileOpen} onDrawerToggle={handleDrawerToggle} />
      
      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Toolbar /> {/* Spaces content below the header */}

        {/* Polling/Progress indicator at the very top of content when loading/refreshing in background */}
        {polling && (
          <Box sx={{ width: '100%', position: 'absolute', top: 64, left: 0, zIndex: 10 }}>
            <LinearProgress color="info" />
          </Box>
        )}

        <Container maxWidth="xl" sx={{ mt: 2, mb: 4, px: { xs: 0 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Welcome Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 800, 
                  color: '#0f172a',
                  fontFamily: "'Outfit', 'Inter', sans-serif",
                  letterSpacing: '-0.5px' 
                }}
              >
                Campus Feed
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Stay up to date with the latest placements, academic results, and campus events.
              </Typography>
            </Box>
            
            {polling && (
              <Chip
                icon={<SyncIcon sx={{ animation: 'spin 2s linear infinite' }} />}
                label="Checking for updates..."
                variant="outlined"
                color="info"
                size="small"
                sx={{ 
                  fontWeight: 600,
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' }
                  }
                }}
              />
            )}
          </Box>

          {/* Stats Section */}
          <StatsCards />

          {/* Filters & Configurations */}
          <FilterBar />

          {/* Feeds Section */}
          {error ? (
            <Box sx={{ my: 'auto' }}>
              <ErrorState message={error} onRetry={refreshFeed} />
            </Box>
          ) : (
            <Grid container spacing={4} sx={{ flexGrow: 1 }}>
              
              {/* Left Column: Priority Feed */}
              <Grid xs={12} lg={5}>
                {loading ? (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1e293b' }}>
                      Loading Priority Alerts...
                    </Typography>
                    <LoadingSkeleton count={2} />
                  </Box>
                ) : (
                  <PriorityNotifications />
                )}
              </Grid>

              {/* Right Column: All Feed (Paginated) */}
              <Grid xs={12} lg={7}>
                {loading ? (
                  <Box>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#1e293b' }}>
                      Loading All Alerts...
                    </Typography>
                    <LoadingSkeleton count={3} />
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <NotificationList />
                    <PaginationBar />
                  </Box>
                )}
              </Grid>

            </Grid>
          )}

        </Container>
      </Box>

      {/* Global Snackbar Alerts */}
      <Snackbar
        open={Boolean(snackbarMessage)}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%', borderRadius: '8px', fontWeight: 600 }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;
