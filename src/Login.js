import React from 'react';
import './css/App.css';
import Logo from './img/Logo.png';
{/* Login page, this is because, once the user logins, pre saved data such as their wallet address and password and balance are recorded so they don't have to connect to Metamask everything they need to make a payment */}
function Login() {
  return (
    <div className="App bg-dark py-5 px-2">
      <header className="rounded App-header  rounded-5 mx-auto col-sm-5">
        <div className="col-sm-8 text-white border-2 mborder-white">          
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          {/* Email address input bar */}
          <input 
            type="text" 
            placeholder="Email Address" 
            className="form-control p-3 bg-dark text-center my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
          {/* Password to login to our database */}
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control text-center bg-dark p-3 my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
          <button class="my-4 btn btn-secondary btn-block col-sm-9 mx-auto d-block p-3 rounded-pill"><b>LOGIN</b></button>
        </div>
       {/* Gives them an option to register instead */}
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
