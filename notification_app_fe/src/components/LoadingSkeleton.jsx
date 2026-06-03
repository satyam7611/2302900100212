import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const LoadingSkeleton = ({ count = 3 }) => {
  const skeletonCards = Array.from(new Array(count));

  return (
    <Box>
      {skeletonCards.map((_, index) => (
        <Card 
          key={index} 
          elevation={0}
          sx={{ 
            mb: 2, 
            borderRadius: '12px', 
            border: '1px solid #e2e8f0', 
            borderLeft: '6px solid #cbd5e1',
            bgcolor: '#ffffff'
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {/* Simulated category chip */}
                <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: '12px' }} />
                {/* Simulated new tag */}
                <Skeleton variant="rounded" width={50} height={20} sx={{ borderRadius: '10px' }} />
              </Box>
              
              {/* Simulated message body (two lines) */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Skeleton variant="text" width="95%" height={20} />
                <Skeleton variant="text" width="60%" height={20} />
              </Box>

              {/* Simulated timestamp */}
              <Skeleton variant="text" width="30%" height={15} />
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default LoadingSkeleton;
