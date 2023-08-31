import React from 'react';
import './css/App.css';

function Checkout() {

     {/* This is the checkout page. Totals and shows a summary of the items in the cart and bought*/}
     return (
        <div className="App w-100">
            <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5  ">
                <div className="row bg-dark h-100">
                    <div class="col-sm-4 bg-light shadow mx-auto p-5 m-5 rounded-5">
                        <h2 class="text-center fw-bold  mb-4">Checkout</h2>
                        <hr></hr>
                        <br></br>
                        <div class="d-flex align-items-top mb-4">
                            <img src="https://source.unsplash.com/random/art" class="rounded-2 me-3" style={{width:'70px', height:'70px', objectFit:'cover'}}></img>
                            <div class="flex-grow-1">
                                <p class="mb-0 text-start fw-bold small">Color Waltz #2345</p>
                                <p class="text-start small col-sm-11">The serenity of winter captured in art.</p>
                            </div>
                            <div>
                                <p class="mb-0 fw-bold">2.7 ETH</p>
                            </div>
                        </div>
                        <div class="d-flex align-items-top mb-4">
                            <img src="https://source.unsplash.com/random/art?2" class="rounded-2 me-3" style={{width:'70px', height:'70px', objectFit:'cover'}}></img>
                            <div class="flex-grow-1">
                                <p class="mb-0 text-start fw-bold small">Gaia Watts #2345</p>
                                <p class="text-start small col-sm-11">The serenity of electricity captured in art.</p>
                            </div>
                            <div>
                                <p class="mb-0 fw-bold">2.4 ETH</p>
                            </div>
                        </div>
                        <a href="/wallet" class="w-100 text-decoration-none d-block rounded-5 fw-bold p-3 mb-4 bg-success text-white">
                            Connected with wallet 
                            <span class="material-symbols-outlined">verified</span>
                        </a>
                        <a href="/confirmation" class="btn btn-dark w-100 rounded-5 p-3 fw-bold">Pay 5.1 ETH</a>
                    </div>
                </div>
            </div>
        </div>
    );}

export default Checkout;
