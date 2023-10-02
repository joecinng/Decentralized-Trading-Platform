import React from 'react';
import './App.css';
import { useCart } from './CartContext';

function Checkout() {
    const { cart, totalPrice } = useCart();


    return (
        <>
            <div className="App w-100">
                <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5">
                    <div className="row bg-dark h-100 col-sm-12 mx-auto">
                        <div className="col-sm-4 bg-light shadow mx-auto p-5 m-5 rounded-5">
                            <h2 className="text-center fw-bold mb-4">Checkout</h2>
                            <hr />

                            {cart.length > 0 ? (
                                <ul className="list-unstyled m-2">
                                    {cart.map(item => (
                                        <li key={item.id} className="d-flex align-items-top mb-4">
                                            <img 
                                                src={item.image_url} 
                                                className="rounded-2 me-3"
                                                style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                                alt={item.product_name}
                                            />
                                            <div className="flex-grow-1">
                                                <p className="mb-0 text-start fw-bold small">{item.product_name}</p>
                                                <p className="text-start small col-sm-11">{item.description}</p>
                                            </div>
                                            <div>
                                                <p className="mb-0 fw-bold">{item.current_price} ETH</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="p-2">Your cart is empty...</p>
                            )}

                            <a href="/wallet" className="w-100 text-decoration-none d-block rounded-5 fw-bold p-3 mb-4 bg-success text-white">
                                Connected with wallet <span className="material-symbols-outlined">verified</span>
                            </a>

                            <a href="" className="btn btn-dark w-100 rounded-5 p-3 fw-bold">Pay {totalPrice.toFixed(2)} ETH</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
