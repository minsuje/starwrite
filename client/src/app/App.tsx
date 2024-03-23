import ReactDOM from 'react-dom/client';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { Provider as ReduxProvider } from 'react-redux';
import './App.css';
import GlobalStyles from './GlobalStyles';
import store from './AppStore';

const root = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <GlobalStyles />
      <RouterProvider router={AppRouter} />
    </ReduxProvider>
  </React.StrictMode>,
);
