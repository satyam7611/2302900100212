import React from 'react';
import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Toolbar, 
  Divider, 
  Box, 
  Typography, 
  Avatar,
  Chip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import { useNotifications } from '../hooks/useNotifications';

const drawerWidth = 260;

const Sidebar = ({ mobileOpen, onDrawerToggle }) => {
  const { filterType, setFilterType, stats } = useNotifications();

  const navigationItems = [
    { text: 'All Feed', filter: 'All', icon: <DashboardIcon />, count: stats.total },
    { text: 'Placements', filter: 'Placement', icon: <CampaignIcon />, count: stats.placements, color: 'error' },
    { text: 'Results', filter: 'Result', icon: <SchoolIcon />, count: stats.results, color: 'primary' },
    { text: 'Events', filter: 'Event', icon: <EventIcon />, count: stats.events, color: 'success' },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Toolbar /> {/* Spaces content below the header */}
      
      {/* Student Profile Widget */}
      <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <Avatar 
          sx={{ 
            width: 70, 
            height: 70, 
            mb: 1.5, 
            bgcolor: '#1e3c72',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          ST
        </Avatar>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
          Student Portal
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.8rem' }}>
          ID: CS-2026
        </Typography>
        <Chip 
          label="Active Student" 
          color="success" 
          size="small" 
          sx={{ fontWeight: 600, fontSize: '0.75rem', height: 22 }} 
        />
      </Box>
      
      <Divider />

      {/* Navigation List */}
      <Box sx={{ px: 2, py: 2, flexGrow: 1 }}>
        <Typography 
          variant="overline" 
          sx={{ px: 1, fontWeight: 700, color: '#64748b', display: 'block', mb: 1 }}
        >
          NOTIFICATION CATEGORIES
        </Typography>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={filterType === item.filter}
                onClick={() => {
                  setFilterType(item.filter);
                  if (mobileOpen) onDrawerToggle();
                }}
                sx={{
                  borderRadius: '8px',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(30, 60, 114, 0.08)',
                    color: '#1e3c72',
                    fontWeight: 'bold',
                    '& .MuiListItemIcon-root': {
                      color: '#1e3c72',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(30, 60, 114, 0.12)',
                    }
                  },
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.02)',
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: '#64748b' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.9rem',
                      fontWeight: filterType === item.filter ? 700 : 500
                    }
                  }}
                />
                {item.count > 0 && (
                  <Chip
                    label={item.count}
                    size="small"
                    color={item.color || 'default'}
                    variant={filterType === item.filter ? 'filled' : 'outlined'}
                    sx={{ 
                      height: 18, 
                      fontSize: '0.7rem', 
                      fontWeight: 600,
                      minWidth: 20
                    }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      {/* Footer / System Meta */}
      <Box sx={{ p: 2, textAlign: 'center', bgcolor: '#f1f5f9' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#64748b' }}>
          <InfoIcon sx={{ fontSize: '0.9rem' }} />
          <Typography variant="caption" sx={{ fontWeight: 500 }}>
            Real-time Refreshed (30s)
          </Typography>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      {/* Mobile Drawer (Temporary) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Drawer (Permanent) */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth, 
            borderRight: '1px solid #e2e8f0',
            boxShadow: '4px 0 10px rgba(0,0,0,0.02)'
          },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
