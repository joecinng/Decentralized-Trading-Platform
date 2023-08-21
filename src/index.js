import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './Login';
import Register from './Register';
import Activity from './Activity';
import Checkout from './Checkout';
import Explore from './Explore';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import the CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <CartProvider> {/* Wrap your app with the CartProvider */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Explore />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/checkout/" element={<Checkout />} />
          {/* Add as many Route components as needed for different pages */}
        </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
