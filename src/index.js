import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Home from './Home';
import Register from './Register';
import Dashboard from './Dashboard';
import Trade from './Trade';
import Search from './Search';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/login" element={<App />} />
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Search />} />
        <Route path="/checkout/" element={<Trade />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add as many Route components as needed for different pages */}
      </Routes>
    </Router>
  </React.StrictMode>
);

