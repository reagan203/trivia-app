import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider and createTheme
import App from './App.jsx';

// Define a custom theme with a colorful background
const theme = createTheme({
  palette: {
    background: {
      default: 'linear-gradient(135deg, #ff5252 0%, #ff4081 50%, #e040fb 100%)', // Example gradient colors
    },
  },
});

// Render the app wrapped in ThemeProvider to apply Material-UI theme
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
