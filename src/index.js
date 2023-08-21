import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Register';
import Dashboard from './Dashboard';
import Trade from './Trade';
import Search from './Search';
import Nav from './Nav';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import the CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <CartProvider> {/* Wrap your app with the CartProvider */}
        <Routes>
          <Route path="/login" element={<App />} />
          <Route path="/activity" element={<Dashboard />} />
          <Route path="/checkout/" element={<Trade />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Search />} />
          {/* Add as many Route components as needed for different pages */}
        </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
