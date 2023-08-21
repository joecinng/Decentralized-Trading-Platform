import React from 'react';
import './App.css';
import Logo from './img/Logo.png';

function Login() {
  return (
    <div className="App bg-dark py-5">
      <header className="rounded App-header rounded-5 mx-auto col-sm-5">
        <div className="col-sm-8 text-white border-2 border-white">          
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input 
            type="text" 
            placeholder="Email Address" 
            className="form-control p-3 bg-dark text-center my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control text-center bg-dark p-3 my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
          <button class="my-4 btn btn-secondary btn-block col-sm-9 mx-auto d-block p-3 rounded-pill"><b>LOGIN</b></button>
        </div>
       
        <span className='text-secondary'>Don't have an account?<t>  </t>
          <a
            className="text-white my-1 text-decoration-underline"
            href="/register"
            rel="noopener noreferrer"
          >
            Sign Up
          </a>
        </span>
      </header>
    </div>
  );
}

export default Login;
