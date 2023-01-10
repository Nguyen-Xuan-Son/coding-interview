import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';

import './index.css';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import UploadPage from './pages/upload-file';
import { theme } from './config/theme';
import WithAuth from './utils/hoc/WithAuth';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <WithAuth>
        <UploadPage />
      </WithAuth>
    ),
  },
  {
    path: 'login',
    element: <LoginPage />,
  },
  {
    path: 'register',
    element: <RegisterPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
