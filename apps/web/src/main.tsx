import React from 'react';
import ReactDOM from 'react-dom/client';
import App  from './App';
import { initializeTokenSystem } from "@paysecure-design/tokens";

// Initialize the token system
initializeTokenSystem().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
 