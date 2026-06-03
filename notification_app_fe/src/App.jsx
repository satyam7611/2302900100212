import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NotificationProvider } from './context/NotificationContext';
import Dashboard from './pages/Dashboard';

// Define a premium Material-UI Theme with Google Fonts
const theme = createTheme({
  palette: {
    primary: {
      main: '#1e3c72', // Sleek Navy Blue
      dark: '#0f172a',
      light: '#3b82f6',
    },
    secondary: {
      main: '#2a5298',
      light: '#f1f5f9',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#475569',
    },
  },
  typography: {
    fontFamily: "'Outfit', 'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h4: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    body1: {
      color: '#334155',
    },
    body2: {
      color: '#64748b',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <Dashboard />
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
