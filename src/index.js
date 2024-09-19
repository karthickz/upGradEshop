// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App'; // Ensure this path is correct
//import './index.css'; // Optional: your global styles

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the id in public/index.html
);
