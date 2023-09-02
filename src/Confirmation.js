/* eslint-disable no-lone-blocks */
import React from 'react';
import './css/App.css';
import Success from './img/success.png'

function Confirmation() {

    {/* This is the confirmation page. Totals and shows a summary of the items in the cart and bought*/}
    return (
        <div className="App w-100 d-flex justify-content-center align-items-center vh-100">
            <div className="container-fluid col-sm-12 mx-auto">
                <div className="row h-100 d-flex align-items-center">
                    <div className="col-sm-4 bg-light shadow mx-auto px-5 py-5 rounded-5">
                        <div class="align-items-center text-center">
                            <img src={Success} alt='success icon' class="confirm-success" />
                        </div>
                        <h4 class="text-center fw-bold mb-3">Success</h4>
                        <h5 class="text-center fw-bold mb-4">Thank you for your purchase!</h5>
                        <a href="/" class="w-100 text-decoration-none d-flex align-items-center justify-content-center rounded-5 fw-bold p-3 bg-dark text-white">
                            <span>Continue shopping</span>
                            <span class="material-symbols-outlined mx-2 fs-5">shopping_cart</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );}

export default Confirmation;