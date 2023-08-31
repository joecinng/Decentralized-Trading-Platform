import React from 'react';
import './App.css';
import Success from './img/success.png'

function Confirmation() {

    {/* This is the confirmation page. Totals and shows a summary of the items in the cart and bought*/}
    return (
        <div className="App w-100">
            <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5  ">
                <div className="row bg-dark h-100">
                    <div class="col-sm-4 bg-light shadow mx-auto p-5 m-5 rounded-5">
                        <div class="align-items-center text-center">
                            <img src={Success} alt='success icon' style={{height:'50%', width:'50%'}} />
                        </div>
                        <h2 class="text-center fw-bold mb-4">Success</h2>
                        <h3 class="text-center fw-bold mb-4">Thank you for your purchase!</h3>
                        <a href="/" class="w-100 text-decoration-none d-flex align-items-center justify-content-center rounded-5 fw-bold p-3 bg-success text-white">
                            <span class="fs-5">Continue shopping</span>
                            <span class="material-symbols-outlined mx-2">shopping_cart</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );}

export default Confirmation;