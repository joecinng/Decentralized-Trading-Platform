import React from 'react';
import myImage from './block.webp';
import './App.css';

function App() {
  return (
    <div className="App  ">
      <header className="rounded App-header bg-white text-dark mx-auto col-sm-4 shadow m-3 p-2">
        <img src={myImage} alt="logo" />
        <div class="col-sm-6 mt-1">
        <h3 class="mt-1 text-bold" >BlockMania</h3>
        <p>Login in to your Wallet</p>

          <input 
            type="text" 
            placeholder="Wallet ID" 
            class="form-control p-3 text-center  my-3 mx-auto"
            style={{width: '80%'}}
          />
          <input 
            type="password" 
            placeholder="Wallet Password" 
            class="form-control text-center p-3 my-3  mx-auto"
            style={{width: '80%'}}
          />
          <button class="my-2 btn btn-success">Login</button>
        </div>
       
        <a
          class="text-white my-1 text-decoration-none small "
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         Did you forgot your password?
        </a>
      </header>
    </div>
  );
}

export default App;
