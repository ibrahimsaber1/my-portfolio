// src/reportWebVitals.js - Updated to handle missing web-vitals
const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      });
    } catch (error) {
      console.warn('web-vitals package not available, skipping performance metrics reporting');
    }
  }
};

// Use export as a variable since there might be issues with default exports
export { reportWebVitals };