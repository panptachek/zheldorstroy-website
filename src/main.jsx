import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@fontsource/rajdhani/500.css';
import '@fontsource/rajdhani/600.css';
import '../styles/tokens.css';
import '../styles/global.css';
import { isTestMode } from './utils/testMode';

if (typeof document !== 'undefined') {
  document.documentElement.dataset.testMode = isTestMode() ? '1' : '0';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
