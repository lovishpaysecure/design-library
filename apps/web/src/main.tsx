import React from 'react';
import ReactDOM from 'react-dom/client';
import App  from './App';

// Import world map data for ECharts geographic charts
// Note: Commented out due to Vite resolution issues with echarts-countries-js
// import 'echarts-countries-js/world';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 