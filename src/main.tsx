import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress Firestore connection warnings and errors once and for all
const originalWarn = console.warn;
const originalError = console.error;

console.warn = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('@firebase/firestore')) {
    return;
  }
  originalWarn(...args);
};

console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && args[0].includes('@firebase/firestore')) {
    return;
  }
  originalError(...args);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
