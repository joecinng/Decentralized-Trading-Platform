import React from 'react';
import './App.css';
import Logo from './img/Logo.png';
import { useCart } from './CartContext';

function Nav({ cart, count,address }) {
    const { removeFromCart, totalPrice } = useCart();

    return (
        <nav className="navbar position-fixed navbar-expand-lg bg-dark shadow-lg w-100 nav-order">
            <a href="/" className="navbar-brand text-white px-4">
                <img src={Logo} alt='logo' height={62} width={80} />
            </a>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item p-2"><h5><a href="/" className="nav-link text-white">Explore</a></h5></li>
                    <li className="nav-item p-2"><h5><a href="/activity" className="nav-link text-white">Activity</a></h5></li>
                    <li className="nav-item p-2"><h5><a href="/wallet" className="nav-link text-white">Wallet</a></h5></li>
                </ul>

                <div className="d-flex px-5">
                    <div className="dropdown nav-item p-3 mx-3">
                        <button className="btn text-white position-relative">
                            <span className="material-symbols-outlined fs-2">shopping_bag</span>
                            <span className="badge bg-warning text-dark" style={{ marginRight: '-2px' }}>{count}</span>
                        </button>

                        <div className="dropdown-menu dropdown-menu-right bg-dark shadow text-white position-absolute end-0 px-4" style={{ width: '500px' }}>
                            {cart.length > 0 ? (
                                <ul className="list-unstyled m-2">
                                    {cart.map(item => (
                                        <li key={item.id} className="position-relative p-4 mb-2 rounded d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="rounded-5 mr-5" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <span className="mx-4 text-warning">{item.name}</span>
                                                    <span className="mx-4 text-muted d-block">{item.current_price} ETH</span>
                                                </div>
                                                <div className="position-absolute" style={{ right: 0 }}>
                                                    <a onClick={() => removeFromCart(item.id)} className="text-end text-danger">
                                                        <span className="material-symbols-outlined">delete</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-2">Your cart is empty...</p>
                            )}
                            {cart.length > 0 && (
                                <div className="p-2">
                                    <p className="text-muted p-4 my-3">You pay : {totalPrice} ETH</p>
                                    <a href="/checkout" className="btn btn-success rounded-0 w-100">Checkout</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="nav-item">
                        <div class="profile">
                        <a className=" navbar-item text-white rounded-5 btn py-4 px-3 position-relative">
                            <span className="material-symbols-outlined fs-2">account_circle</span>
                        </a>
                        <div className="dropdown-profile shadow position-absolute p-4  text-white bg-dark" >
                        <h4>Hello Stefan Ralph</h4>
                        <p class="my-4">
                          <h5>Wallet Address <span class="float-end"><span class="material-symbols-outlined">
content_copy
</span></span></h5>
                          {address}
                        </p>
                        <h5>Wallet Balance</h5>

                        <h6 class="fw-bold text-decoration-none text-primary">⟠ 3000ETH</h6>
                        
                        <a href="/logout" class="btn w-100 rounded-0 p-4 btn-danger mt-3">Logout</a>

                
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
