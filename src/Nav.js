/* eslint-disable no-lone-blocks */
import React from 'react';
import './css/App.css';
import Logo from './img/Logo.png';
import { useCart } from './CartContext';
import EthIcon from './img/ETH-icon.png'

 {/* This is to make sure the cart feature is present so you can view, count and show the users address and balance on the cart component */}
 {/* This is reused for almost every page and so all these parameters must be passed  */}
function Nav({ cart, count, address, balance }) {
    const { removeFromCart, totalPrice } = useCart();

    return (
        <nav className="navbar position-fixed navbar-expand-sm bg-dark shadow-lg w-100 nav-order">
            <a href="/" className="navbar-brand text-white px-3">
                <img src={Logo} alt='logo' class="logo-img"/>
            </a>

            <button className="navbar-toggler d-block d-sm-none m-3 text-center" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="material-symbols-outlined text-white">menu</span>
            </button>

            {/*Navigation links for the other parts of the webpage */}
            <div className="collapse navbar-collapse mx-3 justify-content-between" id="navbarNav">
                <ul className="navbar-nav text-center">
                    <li className="nav-item p-2">
                        <h5><a href="/" className="nav-link text-white">Explore</a></h5>
                    </li>
                    <li className="nav-item p-2">
                        <h5><a href="/activity" className="nav-link text-white">Activity</a></h5>
                    </li>
                    <li className="nav-item p-2">
                        <h5><a href="/wallet" className="nav-link text-white">Wallet</a></h5>
                    </li>
                </ul>
                {/* Dropdown for the shopping cart where it shows the added cart items */}
                <div className="d-flex"> 
                    <div className="dropdown nav-item p-3 mx-3">
                        <button className="btn text-white position-relative text-center"  aria-haspopup="true" aria-expanded="false">
                            <span className="material-symbols-outlined fs-5">shopping_bag</span>
                            <span className="badge bg-danger p-1 text-white position-absolute top-0 end-0">{count}</span>
                        </button>

                        <div className="dropdown-menu shadow end-0 position-fixed p-4 text-white bg-dark">
                            <h5 className='d-inline'>Cart</h5>
                            <span className="badge bg-danger text-white top-0 end-0 d-inline mx-2 cart-count">{count}</span>
                            
                            {/* Check if cart is not empty */}

                            {cart.length > 0 ? (
                                <ul className="list-unstyled m-2">
                                    {cart.map(item => (
                                        <li key={item.id} className="position-relative pt-4 mb-2 w-100 rounded">
                                            <div className="d-flex align-items-center">
                                                <div>
                                                    <img src={item.image} alt={item.name} className="rounded-5 cart-image img-fluid"/>
                                                </div>
                                                <div class="ms-3">
                                                    <span>{item.name}</span>
                                                    <span className="d-block">{item.current_price} ETH</span>
                                                </div>
                                                <div className="position-absolute cart-delete-icon">
                                                     {/* This functions removes the items from the cart list and this induces a state change where the whole DOM will be rerendered*/}
                                                    <span onClick={() => removeFromCart(item.id)} className="text-end text-secondary">
                                                        <span className="material-symbols-outlined fs-5">delete</span>
                                                    </span>
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
                                    <a href="/checkout" className="btn btn-light text-dark rounded-5 w-100 mt-2 p-3 fw-bold">Buy for {totalPrice} ETH</a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="nav-item">
                        <div className="profile">
                            <span className="navbar-item text-white rounded-5 btn py-4 px-3">
                                <span className="material-symbols-outlined fs-5">account_circle</span>
                            </span>
                            <div className="dropdown-profile shadow end-0 position-absolute p-4 text-white bg-dark">
                                <h5>Hello, Stefan Ralph</h5>
                                <p className="my-4">
                                    <p>Wallet Address 
                                        <span className="material-symbols-outlined float-end fs-5 cart-copy-icon">content_copy</span>
                                    </p>
                                    <b>a942c893...a948ce28
                                    {address}</b>
                                </p>
                                <p>Wallet Balance</p>
                                <div className="d-flex align-items-center">
                                    <img src={EthIcon} alt='Eth Icon' className="cart-eth-icon" />
                                    <h6 className="fw-bold text-decoration-none text-white mb-0 ms-2">{balance} ETH</h6>
                                </div>
                                <div className="p-2">
                                    <a href="/login" className="btn btn-danger rounded-5 w-100 p-3 mt-4">Logout</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
