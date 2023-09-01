import React from 'react';
import './css/App.css';
import EthIcon from './img/ETH-icon.png'

function Checkout() {
    {/* This is the checkout page. Totals and shows a summary of the items in the cart and bought*/}
    return (
        <div className="App d-flex justify-content-center align-items-center vh-100 mx-auto">
            <div className="container-fluid col-sm-12 bg-dark">
                <div className="row">
                    <div class="col-sm-5 bg-light shadow px-5 py-4 rounded-5 mx-auto">
                        <h4 className="text-center my-4 fw-bold">Checkout</h4>
                        <hr></hr>
                        <div class="d-flex align-items-top my-4">
                            <img src="https://source.unsplash.com/random/art" class="rounded-2 checkout-img me-3" alt="item-img"></img>
                            <div class="flex-grow-1">
                                <p class="mb-0 text-start fw-bold small"><b>Color Waltz #2345</b></p>
                                <p class="text-start small col-sm-11">The serenity of winter captured in art.</p>
                            </div>
                            <div>
                                <p class="mb-0 fw-bold">2.7 ETH</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-top mb-4">
                            <img src="https://source.unsplash.com/random/art?2" class="rounded-2 checkout-img me-3" alt="item-img"></img>
                            <div class="flex-grow-1">
                                <p class="mb-0 text-start fw-bold small"><b>Gaia Watts #2345</b></p>
                                <p class="text-start small col-sm-11">The serenity of electricity captured in art.</p>
                            </div>
                            <div>
                                <p class="mb-0 fw-bold">2.4 ETH</p>
                            </div>
                        </div>

                        <div class="d-flex align-items-top my-4 border border-secondary rounded-2 px-3 pt-3">
                            <img src={EthIcon} class="rounded-2 checkout-eth-icon me-3" alt="eth-img"></img>
                            <div class="flex-grow-1">
                                <h5 class="mb-0 text-start fw-bold">52.34 ETH</h5>
                                <p class="text-start small col-sm-11">a942c893...a948ce28</p>
                            </div>
                            <div>
                                <span className="success-status text-decoration-none d-flex align-items-center justify-content-center rounded fw-bold p-1 small">
                                    Connected
                                </span>
                            </div>
                        </div>

                        <div class="d-flex align-items-top my-4">
                            <div class="flex-grow-1">
                                <h5 class="mb-0 text-start fw-bold">Total:</h5>
                            </div>
                            <div>
                                <h5 class="mb-0 fw-bold">5.1 ETH</h5>
                            </div>
                        </div>
                        <a href="/confirmation" class="btn btn-dark w-100 rounded-5 p-3 fw-bold">Checkout</a>
                    </div>
                </div>
            </div>
        </div>
    );}

export default Checkout;
