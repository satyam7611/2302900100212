import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import { useNotifications } from '../hooks/useNotifications';

const StatsCards = () => {
  const { stats } = useNotifications();

  const statItems = [
    {
      title: 'Total Alerts',
      value: stats.total,
      icon: <NotificationsActiveIcon sx={{ color: '#1e3c72', fontSize: '2rem' }} />,
      bg: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
      border: '1px solid #7dd3fc',
    },
    {
      title: 'Unread Alerts',
      value: stats.unread,
      icon: <MarkEmailUnreadIcon sx={{ color: '#c2410c', fontSize: '2rem' }} />,
      bg: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
      border: '1px solid #fdba74',
      badgeColor: 'error',
    },
    {
      title: 'Placements',
      value: stats.placements,
      icon: <CampaignIcon sx={{ color: '#dc2626', fontSize: '2rem' }} />,
      bg: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
      border: '1px solid #fca5a5',
    },
    {
      title: 'Results',
      value: stats.results,
      icon: <SchoolIcon sx={{ color: '#2563eb', fontSize: '2rem' }} />,
      bg: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      border: '1px solid #93c5fd',
    },
    {
      title: 'Events',
      value: stats.events,
      icon: <EventIcon sx={{ color: '#16a34a', fontSize: '2rem' }} />,
      bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
      border: '1px solid #86efac',
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statItems.map((item, index) => (
        <Grid xs={12} sm={6} md={2.4} key={index}>
          <Card 
            elevation={0}
            sx={{ 
              background: item.bg,
              border: item.border,
              borderRadius: '16px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              }
            }}
          >
            <CardContent sx={{ p: '20px !important' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography 
                    variant="subtitle2" 
                    color="text.secondary" 
                    sx={{ fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', tracking: 0.5 }}
                  >
                    {item.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{ 
                      fontWeight: 800, 
                      color: '#1e293b', 
                      mt: 0.5,
                      fontFamily: "'Outfit', 'Inter', sans-serif" 
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
                <Paper 
                  elevation={0} 
                  sx={{ 
                    p: 1, 
                    borderRadius: '12px', 
                    bgcolor: 'rgba(255, 255, 255, 0.6)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}
                >
                  {item.icon}
                </Paper>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
