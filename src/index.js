// src/index.js - Completely simplified
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// Remove reportWebVitals entirely

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Remove reportWebVitals call