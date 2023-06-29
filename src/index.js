import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider, CssBaseline } from '@mui/material';

import { theme } from './theme';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
