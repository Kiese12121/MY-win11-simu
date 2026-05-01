import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { WindowProvider } from './context/WindowContext';
import ErrorBoundary from './components/ErrorBoundary';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <WindowProvider>
        <App />
      </WindowProvider>
    </ErrorBoundary>
  </StrictMode>,
);
