import React from 'react';
import './App.css';
import Logo from './img/Logo.png';
import { useCart } from './CartContext';

function Nav({ cart, count }) {
    const { removeFromCart ,totalPrice} = useCart();
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

              <div className="dropdown-menu dropdown-menu-right bg-dark shadow text-white position-absolute end-0  px-4" style={{  width: '500px'}}>
                {cart.length > 0 ? (
                  <ul className="list-unstyled m-2 " >
                    {cart.map(item => (
                      <li key={item.id} className=" p-4 mb-2 rounded d-flex justify-content-between  ">
                        <div class="position-relative d-flex align-items-center">
                          <div>
                            <img src={item.image} className="rounded-5 mr-5" style={{ height: '50px', width: '50px', objectFit: 'cover' }} alt={item.name} />
                          </div>
                          <div>
                            <span className="mx-4 ">{item.name} #0000</span>
                            <span className="mx-4 text-danger d-block">{item.current_price} ETH</span>
                          </div>
    <a
        onClick={() => removeFromCart(item.id)} 
        className="btn-sm text-end  text-danger m-3"
        style={{ zIndex: 10 }}>
        <span class="material-symbols-outlined">remove</span>
    </a>
</div>

                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="p-2">Your cart is empty!</p>
                )}
                {cart.length > 0 && (
                  <div className="p-2">
                    <div class=" text-white p-4 my-3"> Checkout Total : {totalPrice} ETH</div>
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
