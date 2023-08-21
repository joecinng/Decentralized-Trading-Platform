import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App  bg-dark ">
      <header className="rounded App-header  rounded-5  mx-auto col-sm-6 bg-dark my-3">
  
        <div class="col-sm-6  text-white border-2 border-white bg-dark " >
        <h3 class="mt-1 text-bold" >Connect Wallet</h3>
        
          <input 
            type="text" 
            placeholder="Wallet ID" 
            class="form-control p-3 bg-dark text-center  my-3 mx-auto"
            style={{width: '80%'}}
          />
          <input 
            type="password" 
            placeholder="Wallet Password" 
            class="form-control text-center bg-dark p-3 my-3  mx-auto"
            style={{width: '80%'}}
          />
          <button class="m-3 btn btn-secondary btn-block col-sm-9 mx-auto d-block">Login</button>
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
