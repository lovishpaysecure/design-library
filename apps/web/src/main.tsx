import React from 'react';
import ReactDOM from 'react-dom/client';
import App  from './App';
import { initializeTokenSystem } from "@paysecure-design/tokens";

// Import world map data for ECharts geographic charts
// Note: Commented out due to Vite resolution issues with echarts-countries-js
// import 'echarts-countries-js/world';

// Initialize the token system
initializeTokenSystem().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
 