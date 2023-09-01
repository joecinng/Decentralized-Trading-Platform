import React from 'react';
import './css/App.css';
import Logo from './img/Logo.png';
{/* Login page, this is because, once the user logins, pre saved data such as their wallet address and password and balance are recorded so they don't have to connect to Metamask everything they need to make a payment */}
function Login() {
  return (
    <div className="App bg-dark px-2 py-4">
      <header className="rounded App-header rounded-5 mx-auto col-sm-5 py-5">
        <div className="col-sm-8 text-white border-2 border-white">          
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input type="text" placeholder="Email Address"  className="form-control p-3 bg-dark text-center my-3 mx-auto text-white input-form"/>
          <input type="password" placeholder="Password"  className="form-control p-3 bg-dark text-center my-3 mx-auto text-white input-form"/>
          <div id="validation"></div>
          <button class="my-4 btn btn-light text-dark fs-5 fw-bold btn-block col-lg-10 col-8 mx-auto d-block p-2 rounded-5" disabled><b>LOG IN</b></button>
        </div>
        <span className='text-secondary'>Don't have an account?<t>  </t>
          <a className="text-white my-1 text-decoration-underline" href="/register" rel="noopener noreferrer">Sign Up</a>
        </span>
      </header>
    </div>
  );
}

export default Login;
