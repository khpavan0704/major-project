import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { I18nProvider } from './i18n/I18nContext';
import { AppProvider } from './store/AppContext';
import { RouterProvider } from './router/Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <I18nProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </I18nProvider>
    </RouterProvider>
  </StrictMode>
);
