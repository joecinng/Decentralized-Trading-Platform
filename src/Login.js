import React from 'react';
import './css/App.css';
import Logo from './img/Logo-black.png';
{/* Login page, this is because, once the user logins, pre saved data such as their wallet address and password and balance are recorded so they don't have to connect to Metamask everything they need to make a payment */}
function Login() {
  return (
    <div className="App bg-dark d-flex justify-content-center align-items-center vh-100">
      <div className="App-header rounded-5 mx-auto col-sm-5 shadow py-5 bg-light">
        <div className="col-sm-8 text-center text-dark">
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input type="text" placeholder="Email Address" className="form-control p-3 bg-light text-center my-2 text-dark input-form"/>
          <input type="password" placeholder="Password" className="form-control p-3 bg-light text-center my-2 text-dark input-form"/>
          <div id="validation"></div>
          <button className="mt-4 btn btn-dark fs-5 fw-bold btn-block col-lg-10 col-8 mx-auto d-block p-2 rounded-5 w-100" disabled><b>LOG IN</b></button>
        </div>
        <span className='text-dark d-block text-center mt-3'>
          Don't have an account?{' '}
          <a className="text-dark text-decoration-underline" href="/register" rel="noopener noreferrer">Sign Up</a>
        </span>
      </div>
    </div>
  );
}

export default Login;
