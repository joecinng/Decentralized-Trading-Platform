import React from 'react';
import './App.css';
import Logo from './img/Logo.png';
import { useCart } from './CartContext';

function Nav({ cart, count }) {
    const { removeFromCart} = useCart();
    return (
      <nav className="navbar navbar-expand-lg bg-dark shadow-lg w-100">
        <a href="/" className="navbar-brand text-white px-4">
          <img src={Logo} height={62} width={80} alt='logo'/>
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item p-2">
              <h5><a href="/" className="nav-link text-white">Explore</a></h5>
            </li>
            <li className="nav-item p-2">
              <h5><a href="/activity" className="nav-link text-white">Activity</a></h5>
            </li>
            <li className="nav-item p-2">
              <h5><a href="/activity" className="nav-link text-white">Wallet</a></h5>
            </li>
          </ul>
  
          <div className="d-flex px-5"> 
            <div className="dropdown nav-item p-3 mx-3">
              <button className="btn text-white position-relative" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="material-symbols-outlined fs-2">shopping_bag</span>
                <span className="badge bg-warning text-dark position-absolute top-0 end-0" style={{ marginRight: '-2px' }}>{count}</span>
              </button>

              <div className="dropdown-menu dropdown-menu-right px-4" aria-labelledby="dropdownMenuButton">
                {cart.length > 0 ? (
                  <ul className="list-unstyled m-2">
                    {cart.map(item => (
                      <li key={item.id} className="shadow p-2 mb-2 rounded d-flex justify-content-between align-items-center">
                        <div class="position-relative">
                          <img src={item.image} className="rounded-5 mr-2" style={{ height: '50px', width: '50px', objectFit: 'cover' }} alt={item.name} />
                          <span className="text-dark fw-bold">{item.name}</span>
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="btn btn-sm position-absolute top-0 end-0 text-danger m-3"
                            style={{ zIndex: 10, transform: 'translate(50%, -50%)', backgroundColor: 'rgba(255,255,255,0.6)' }}>
                              <span class="material-symbols-outlined">remove</span>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-2">Your cart is empty!</p>
                )}
                {cart.length > 0 && (
                  <div className="p-2">
                    <a href="/checkout" className="btn btn-success rounded-0 w-100">Checkout</a>
                  </div>
                )}
              </div>
            </div>

            <div className="nav-item">
              <a href="#" className="navbar-item text-white rounded-5 btn btn-dark py-4 px-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                <span className="material-symbols-outlined fs-2">account_circle</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    );
}

export default Nav;
