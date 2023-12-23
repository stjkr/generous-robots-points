import React from 'react';
import createRoot from 'react-dom';

import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import App from './App';

createRoot.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

