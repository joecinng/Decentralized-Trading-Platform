import React from 'react';
import './css/App.css';
import Logo from './img/Logo-black.png'

function Register() {

  return (
    <div className="App bg-dark d-flex justify-content-center align-items-center vh-100">
      <header className="App-header rounded-5 mx-auto col-sm-5 shadow py-5 bg-light">
        <div className="col-sm-8 text-center text-dark">
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input type="text" placeholder="Username" className="form-control p-3 bg-light text-center my-2 text-dark input-form"/>
          <input type="text" placeholder="Email Address" className="form-control p-3 bg-light text-center my-2 text-dark input-form"/>
          <input type="password" placeholder="Password" className="form-control text-center bg-light p-3 my-2 text-dark input-form"/>
          <div id="validation"></div>
          <button className="mt-4 btn btn-dark fs-5 fw-bold btn-block col-lg-10 col-8 mx-auto d-block p-3 rounded-5 w-100" ><b>Sign Up</b></button>
        </div>
        <span className='text-dark d-block text-center mt-3'>
          Have an account already?{' '}
          <a className="text-dark text-decoration-underline" href="/login" rel="noopener noreferrer">Log In</a>
        </span>
      </header>
    </div>  
  );
}

function PasswordStrengthChecker(event) {
    const password = event.target.value;
    let validation = document.getElementById('validation');
    // Very basic password strength checking
    if (password.length < 8) {
        validation.textContent="Password must be atleast 8 characters"
        validation.className="bg-danger text-center small text-white  rounded mx-auto p-1"
    } else if (!/\d/.test(password)) {
        validation.textContent="Password must contain atleast one digit"
        validation.className="bg-danger text-center small text-white  rounded mx-auto p-1"
    } else if (!/[a-z]/.test(password)) {
        validation.textContent="Bruh, you still need atleast one lowercase character"
        validation.className="bg-danger text-center small text-white  rounded mx-auto p-1"
    } else if (!/[A-Z]/.test(password)) {
        validation.textContent="You need a uppercase character as well";
        validation.className="bg-danger small text-center text-white  rounded mx-auto p-1"
    } else {
        validation.className="bg-success"
        validation.textContent=""
    }
}

export default Register;
