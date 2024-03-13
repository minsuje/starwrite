import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import './App.css';
import GlobalStyles from './GlobalStyles';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={AppRouter} />
  </React.StrictMode>,
);
