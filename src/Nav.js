/* eslint-disable no-lone-blocks */
import React from 'react';
import './css/App.css';
import Logo from './img/Logo.png';
import { useCart } from './CartContext';

 {/* This is to make sure the cart feature is present so you can view, count and show the users address and balance on the cart component */}
 {/* This is reused for almost every page and so all these parameters must be passed  */}
function Nav({ cart, count, address, balance }) {
    const { removeFromCart, totalPrice } = useCart();

    return (
        <nav className="navbar position-fixed navbar-expand-sm bg-dark shadow-lg w-100 nav-order">
            <a href="/" className="navbar-brand text-white px-3">
                <img src={Logo} alt='logo' height={75} width={100} />
            </a>
            <button className="navbar-toggler d-block d-sm-none m-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            {/*Navigation links for the other parts of the webpage */}
            <div className="collapse navbar-collapse mx-3  justify-content-between" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item p-3">
                        <h4><a href="/" className="nav-link text-white">Explore</a></h4>
                    </li>
                    <li className="nav-item p-3">
                        <h4><a href="/activity" className="nav-link text-white">Activity</a></h4>
                    </li>
                    <li className="nav-item p-3">
                        <h4><a href="/wallet" className="nav-link text-white">Wallet</a></h4>
                    </li>
                </ul>
                {/* Dropdown for the shopping cart where it shows the added cart items */}
                <div className="d-flex"> 
                    <div className="dropdown nav-item p-3 mx-3">
                        <button className="btn text-white position-relative"  aria-haspopup="true" aria-expanded="false">
                            <span className="material-symbols-outlined fs-3">shopping_bag</span>
                            <span className="badge bg-danger text-white position-absolute top-0 end-0">{count}</span>
                        </button>

                        <div className="dropdown-menu  bg-dark shadow text-white position-fixed top-0  p-4" style={{ right: '100px' }}>
                            <h5 className='d-inline'>Cart</h5>
                            <span className="badge bg-danger text-white top-0 end-0 d-inline mx-2" style={{ marginRight: '-2px' }}>{count}</span>
                            
                            {/* Check if cart is not empty */}

                            {cart.length > 0 ? (
                                <ul className="list-unstyled m-2">
                                    {cart.map(item => (
                                        <li key={item.id} className="position-relative py-4 mb-2 w-100 rounded d-flex justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="rounded-5 mr-5" style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                                                </div>
                                                <div>
                                                    <span className="mx-4 text-white">{item.name}</span>
                                                    <span className="mx-4 d-block fs-5">{item.current_price} ETH</span>
                                                </div>
                                                <div className="position-absolute" style={{ right: 0 }}>
                                                     {/* This functions removes the items from the cart list and this induces a state change where the whole DOM will be rerendered*/}
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
                             {/* Make sure the cart is still working*/}
                            {cart.length > 0 && (
                                <div className="p-2">
                                    <a href="/checkout" className="btn btn-success rounded w-100 fs-5">Buy for {totalPrice} ETH</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="nav-item">
                        <div className="profile ">
                            <a className="navbar-item text-white rounded-5 btn py-4 px-3 ">
                                <span className="material-symbols-outlined fs-3 ">account_circle</span>
                            </a>
                            <div className="dropdown-profile shadow  end-0 position-absolute p-4 text-white bg-dark">
                                <h4>Hello Stefan Ralph</h4>
                                <p className="my-4">
                                    <h5>Wallet Address <span className="float-end"><span className="material-symbols-outlined">content_copy</span></span></h5>
                                    {address}
                                </p>
                                <h5>Wallet Balance</h5>
                                <h6 className="fw-bold text-decoration-none text-primary">⟠ {balance}ETH</h6>
                                <a href="/logout" className="btn w-100 rounded-0 p-4 btn-danger mt-3">Logout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
