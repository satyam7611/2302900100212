import React from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel, 
  ToggleButtonGroup, 
  ToggleButton, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import SortIcon from '@mui/icons-material/Sort';
import { useNotifications } from '../hooks/useNotifications';

const FilterBar = () => {
  const { filterType, setFilterType, topN, setTopN } = useNotifications();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTypeTabChange = (event, newValue) => {
    setFilterType(newValue);
  };

  const handleTopNChange = (event, newN) => {
    if (newN !== null) {
      setTopN(newN);
    }
  };

  return (
    <Paper 
      elevation={0}
      sx={{ 
        p: 2, 
        mb: 3, 
        border: '1px solid #e2e8f0', 
        borderRadius: '16px',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'center' },
        justifyContent: 'space-between',
        gap: 2,
        bgcolor: '#fff'
      }}
    >
      {/* Category Tabs */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
        <TuneIcon color="action" sx={{ display: { xs: 'none', sm: 'block' } }} />
        {isMobile ? (
          <FormControl fullWidth size="small">
            <InputLabel id="type-filter-label">Filter Type</InputLabel>
            <Select
              labelId="type-filter-label"
              id="type-filter"
              value={filterType}
              label="Filter Type"
              onChange={(e) => setFilterType(e.target.value)}
              sx={{ borderRadius: '8px' }}
            >
              <MenuItem value="All">All Types</MenuItem>
              <MenuItem value="Placement">Placements Only</MenuItem>
              <MenuItem value="Result">Results Only</MenuItem>
              <MenuItem value="Event">Events Only</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <Tabs 
            value={filterType} 
            onChange={handleTypeTabChange}
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                minWidth: { xs: 80, sm: 100 },
                fontSize: '0.9rem',
              }
            }}
          >
            <Tab value="All" label="All Alerts" />
            <Tab value="Placement" label="Placements" />
            <Tab value="Result" label="Results" />
            <Tab value="Event" label="Events" />
          </Tabs>
        )}
      </Box>

      {/* Top N Select */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'space-between', md: 'flex-end' }, gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SortIcon color="action" />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>
            Priority Inbox Size:
          </Typography>
        </Box>
        <ToggleButtonGroup
          value={topN}
          exclusive
          onChange={handleTopNChange}
          aria-label="top n selector"
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              px: 2,
              py: 0.5,
              fontWeight: 700,
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              color: '#475569',
              '&.Mui-selected': {
                bgcolor: '#1e3c72',
                color: '#fff',
                '&:hover': {
                  bgcolor: '#2a5298',
                }
              }
            }
          }}
        >
          <ToggleButton value={10} aria-label="top 10">Top 10</ToggleButton>
          <ToggleButton value={15} aria-label="top 15">Top 15</ToggleButton>
          <ToggleButton value={20} aria-label="top 20">Top 20</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Paper>
  );
};

export default FilterBar;
