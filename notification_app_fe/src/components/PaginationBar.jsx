import React from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNotifications } from '../hooks/useNotifications';

const PaginationBar = () => {
  const { 
    currentPage, 
    setCurrentPage, 
    notifications, 
    limitPerPage,
    loading 
  } = useNotifications();

  const isFirstPage = currentPage === 1;
  // If the notifications returned in this page are less than the limit per page,
  // we have reached the end of the records, so we disable the "Next" button.
  const isLastPage = !notifications || notifications.length < limitPerPage;

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        gap: 3, 
        mt: 4, 
        mb: 2 
      }}
    >
      <Button
        variant="outlined"
        color="primary"
        onClick={handlePrevPage}
        disabled={isFirstPage || loading}
        startIcon={<NavigateBeforeIcon />}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
        }}
      >
        Previous
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 100, justifyContent: 'center' }}>
        {loading ? (
          <CircularProgress size={20} color="primary" />
        ) : (
          <Typography variant="body1" sx={{ fontWeight: 700, color: '#334155' }}>
            Page {currentPage}
          </Typography>
        )}
      </Box>

      <Button
        variant="outlined"
        color="primary"
        onClick={handleNextPage}
        disabled={isLastPage || loading}
        endIcon={<NavigateNextIcon />}
        sx={{
          borderRadius: '20px',
          textTransform: 'none',
          fontWeight: 600,
          px: 3,
        }}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationBar;
