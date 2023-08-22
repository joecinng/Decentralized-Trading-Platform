import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function Checkout() {

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);


  const handleSendTransaction = (event) => {
    event.preventDefault();
    // You would handle sending the transaction here.
    // If using Metamask or similar, use the ethereum object injected into the window.
    // window.ethereum.request method can be used to interact with the Ethereum blockchain.
    console.log('Sending transaction:', recipient, amount);
  };

  return (
    <div className="App w-100 " style={{height: '100vh'}}>
        <div class="">
      <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5  ">
        <div className="row bg-dark h-100 pt-5 col-sm-12 mx-auto">


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
        Connected with wallet <span class="material-symbols-outlined">
verified
</span>
    </a>

    <a href="" class="btn btn-dark w-100 rounded-5 p-3 fw-bold">Pay 5.1 ETH</a>
</div>

      </div>
      </div>
      </div>

    </div>
  );
}

export default Checkout;
