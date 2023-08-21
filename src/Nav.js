import React from 'react';
import './App.css';

function  Nav({ cart, count }) {
  return (
    <nav className="navbar bg-dark shadow-lg">
      <div className="p-3">
        <a href="#" className="navbar-brand text-white rounded-5">
          <span className="material-symbols-outlined">
            deployed_code
          </span> BlockMania
        </a>
      </div>

      <div className="d-flex">
        <div className="nav-item p-2">
          <a href="/se" className="navbar-brand text-white rounded-5">Trade</a>
        </div>
        <div className="nav-item p-2">
          <a href="/dashboard" className="navbar-brand text-white rounded-5">History</a>
        </div>
        <div className="nav-item p-2">
          <a href="/browse" className="navbar-brand text-white rounded-5">Browse Assets</a>
        </div>
      </div>

      <div className="d-flex">
      <div className="dropdown w-100 nav-item p-3">
  <button className="btn text-white" type="button" id="dropdownMenuButton" aria-haspopup="true" aria-expanded="false">
    <span className="d-block  material-symbols-outlined">
      shopping_bag
    </span>
   <span class="pt-2"> My Cart <span class="badge bg-warning text-dark">{count}</span></span>
  </button>
  <div className="dropdown-menu " aria-labelledby="dropdownMenuButton">
    <ul className="list-unstyled">
      {cart.map(item => (
        <li key={item.id} className="p-3 shadow row">
<div class="col-6">
          <img src={item.image} className="rounded-5 mx-1" alt={item.name} width="50" />
          </div>
          <div class="col-6">
          <span className="text-dark  fw-bold">{item.name}</span>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

        <div className="nav-item">
          <a href="#" className="navbar-item text-white rounded-5 btn btn-dark py-3 px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span className="material-symbols-outlined">account_circle</span> Profile
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
