import React from 'react';
import myImage from './block.webp';
import './App.css';

function Home() {
  return (
    <div className="App">
      <header className="rounded App-header bg-white text-dark mx-auto col-sm-4 p-2">
        <img src={myImage} alt="logo" />
        <div class="col-sm-9 mt-1">
        <h3 class="mt-1 text-bold" >Welcome to BlockMania</h3>
        <p class="fw-bold small">Created by Group 47</p>
        <a href="/login" class="m-1 btn btn-success">Login</a><a href="/register" class="btn m-1 btn-warning">Create Wallet</a>
        <a href="" class="m-1 btn btn-primary">Market</a>
        </div>
      </header>
    </div>
  );
}

export default Home;
