import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  IconButton, 
  Tooltip,
  Paper
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CampaignIcon from '@mui/icons-material/Campaign';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import { TYPE_COLORS, NOTIFICATION_TYPES } from '../constants/notificationTypes';
import { formatRelativeTime, formatAbsoluteTime } from '../utils/dateFormatter';
import { useNotifications } from '../hooks/useNotifications';

const NotificationCard = ({ notification, isPriorityView = false }) => {
  const { readIds, markAsRead } = useNotifications();
  
  const id = notification.ID || notification.id;
  const type = notification.Type || notification.type;
  const message = notification.Message || notification.message;
  const timestamp = notification.Timestamp || notification.timestamp;
  const priorityScore = notification.priorityScore;

  const isRead = readIds.includes(id);
  const colors = TYPE_COLORS[type] || { main: '#64748b', light: '#f1f5f9', text: '#475569' };

  // Icon selector based on type
  const getTypeIcon = () => {
    switch (type) {
      case NOTIFICATION_TYPES.PLACEMENT:
        return <CampaignIcon sx={{ color: colors.main }} />;
      case NOTIFICATION_TYPES.RESULT:
        return <SchoolIcon sx={{ color: colors.main }} />;
      case NOTIFICATION_TYPES.EVENT:
        return <EventNoteIcon sx={{ color: colors.main }} />;
      default:
        return <EventNoteIcon sx={{ color: colors.main }} />;
    }
  };

  return (
    <Card 
      elevation={0}
      sx={{ 
        position: 'relative',
        mb: 2,
        borderRadius: '12px',
        border: '1px solid',
        borderColor: isRead ? '#e2e8f0' : colors.main,
        borderLeft: `6px solid ${colors.main}`,
        backgroundColor: isRead ? '#ffffff' : `${colors.light}33`, // 33 is ~20% opacity hex
        transition: 'transform 0.15s ease, box-shadow 0.15s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.05)',
        }
      }}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1 }}>
          
          {/* Main Info */}
          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
              <Chip 
                icon={getTypeIcon()}
                label={type} 
                size="small" 
                sx={{ 
                  bgcolor: colors.light, 
                  color: colors.text, 
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  border: `1px solid ${colors.main}33`
                }}
              />
              
              {!isRead && (
                <Chip 
                  label="New" 
                  size="small" 
                  color="warning"
                  icon={<FiberNewIcon />}
                  sx={{ 
                    height: 20,
                    fontSize: '0.7rem', 
                    fontWeight: 800,
                    '& .MuiChip-icon': { fontSize: '1rem' }
                  }}
                />
              )}

              {isPriorityView && priorityScore !== undefined && (
                <Chip
                  label={`Priority Score: ${priorityScore}`}
                  size="small"
                  variant="outlined"
                  icon={<SpeedIcon sx={{ fontSize: '0.85rem' }} />}
                  sx={{ 
                    height: 20,
                    fontSize: '0.7rem', 
                    fontWeight: 600,
                    borderColor: 'divider',
                    color: 'text.secondary'
                  }}
                />
              )}
            </Box>

            <Typography 
              variant="body1" 
              sx={{ 
                fontWeight: isRead ? 500 : 700, 
                color: '#1e293b', 
                mb: 1.5,
                lineHeight: 1.5,
                fontSize: '0.95rem'
              }}
            >
              {message}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
              <AccessTimeIcon sx={{ fontSize: '0.85rem' }} />
              <Tooltip title={formatAbsoluteTime(timestamp)}>
                <Typography variant="caption" sx={{ fontWeight: 500 }}>
                  {formatRelativeTime(timestamp)}
                </Typography>
              </Tooltip>
            </Box>
          </Box>

          {/* Action button */}
          {!isRead && (
            <Tooltip title="Mark as Read">
              <IconButton 
                size="small" 
                onClick={() => markAsRead(id)}
                sx={{
                  border: '1px solid',
                  borderColor: '#cbd5e1',
                  color: '#64748b',
                  '&:hover': {
                    bgcolor: colors.light,
                    color: colors.main,
                    borderColor: colors.main,
                  }
                }}
              >
                <DoneIcon sx={{ fontSize: '1rem' }} />
              </IconButton>
            </Tooltip>
          )}

        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
