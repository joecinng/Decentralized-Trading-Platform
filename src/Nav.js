import React from 'react';
import './App.css';

function Nav({ cart }) {
  return (
    <nav className="navbar bg-dark shadow-lg">
      <div className="p-3">
        <a href="#" className="navbar-brand text-white d-block text-dark rounded-5">
          <span className="material-symbols-outlined">
            deployed_code
          </span>
          {' '}BlockMania
        </a>
      </div>
      <div className="d-flex float-start">
        <div className="nav-item p-1">
          <a href="/sell" className="navbar-brand text-white d-block text-dark rounded-5">Trade</a>
        </div>
        <div className="nav-item p-1">
          <a href="/dashboard" className="navbar-brand text-white d-block text-dark rounded-5">History</a>
        </div>
        <div className="nav-item p-1">
          <a href="/dashboard" className="navbar-brand text-white d-block text-dark rounded-5">Browse Assets</a>
        </div>
      </div>
      <div className="float-end d-flex">
        <div className="dropdown nav-item float-end">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="material-symbols-outlined">
              shopping_bag
            </span>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  <img src={item.image} alt={item.name} width="50" />
                  <span className="text-white">{item.name} - {item.current_price} ETH</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="nav-item">
          <a href="#" className="navbar-item d-block text-white rounded-5 btn btn-dark py-3 px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span className="material-symbols-outlined">account_circle</span>
            {' '}Profile
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
