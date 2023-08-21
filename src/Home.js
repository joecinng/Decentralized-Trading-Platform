import React from 'react';
import './App.css';
import Logo from './img/Logo.png';

function Home() {
  return (
    <div className="App">
      <div className="rounded mt-5 h-100  bg-dark text-white mx-auto col-sm-7 p-2">
        <div class="row align-items-center align-middle mt-5 w-100">
          <div class="col-sm-6 mt-1">
            <img src={Logo} height={63} width={80} alt='logo'/>
            <h3 class="mt-1 text-bold text-center" >Welcome to BlockMania</h3>
            <p class="fw-bold small text-center">Created by Group 47</p>
          </div>
          <div class="col-sm-6 mt-1">
            <a href="/login" class="my-3 p-5  btn btn-secondary btn-block d-block">Connect Wallet</a>
            <a href="/login" class="my-3 btn p-5  btn-light  btn-block d-block">Create Wallet</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
