import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Badge, 
  IconButton, 
  Button, 
  Box, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { useNotifications } from '../hooks/useNotifications';

const Header = ({ onDrawerToggle }) => {
  const { stats, markAllAsRead } = useNotifications();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        
        <NotificationsIcon sx={{ mr: 1.5, display: { xs: 'none', sm: 'block' } }} />
        
        <Typography 
          variant="h6" 
          noWrap 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 700, 
            letterSpacing: '0.5px',
            fontFamily: "'Outfit', 'Inter', sans-serif"
          }}
        >
          Campus <span style={{ fontWeight: 300 }}>Notifications Portal</span>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Badge 
            badgeContent={stats.unread} 
            color="error" 
            max={99}
            sx={{
              '& .MuiBadge-badge': {
                fontSize: '0.75rem',
                fontWeight: 'bold',
                height: 20,
                minWidth: 20,
              }
            }}
          >
            <IconButton color="inherit" aria-label="unread notifications">
              <NotificationsIcon />
            </IconButton>
          </Badge>

          {stats.unread > 0 && (
            isMobile ? (
              <IconButton 
                color="inherit" 
                onClick={markAllAsRead} 
                title="Mark All as Read"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  }
                }}
              >
                <DoneAllIcon />
              </IconButton>
            ) : (
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<DoneAllIcon />}
                onClick={markAllAsRead}
                sx={{
                  borderRadius: '20px',
                  textTransform: 'none',
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  '&:hover': {
                    borderColor: '#fff',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  }
                }}
              >
                Mark All Read
              </Button>
            )
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
