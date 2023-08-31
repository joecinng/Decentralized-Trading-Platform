import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import Login from './Login';
import Register from './Register';
import Activity from './Activity';
import Checkout from './Checkout';
import Explore from './Explore';
import Wallet from './Wallet';
import Confirmation from './Confirmation';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './CartContext'; // Import the CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <CartProvider> {/* This is for the cart icon to be added to each of the pages */}
        <Routes>
          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          {/* Register Page route */}
          <Route path="/register" element={<Register />} />
          {/* Explore page which is the home page route where users can search for items to buy and returns all the digital assets available for trading */}
          <Route path="/" element={<Explore />} />
          {/* Connecting your wallet page*/}
          <Route path="/wallet" element={<Wallet />} /> 
          {/* This shows the users the users previous activity and transactions */}
          <Route path="/activity" element={<Activity />} />
          {/* This shows the checkout page where users can confirm payment */}
          <Route path="/checkout/" element={<Checkout />} />
          {/* This shows the confirmation page where users can view whether the payment is successful or not */}
          <Route path="/confirmation/" element={<Confirmation />} />
        </Routes>
      </CartProvider>
    </Router>
  </React.StrictMode>
);
