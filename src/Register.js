import React from 'react';
import './css/App.css';
import Logo from './img/Logo.png'

function Register() {

  return (
    <div className="App bg-dark py-5 px-2">
      <header className="rounded App-header rounded-5 mx-auto col-sm-5 py-5">
        <div className="col-sm-8 text-white border-2 border-white">          
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input 
            type="text" 
            placeholder="Username" 
            className="form-control p-3 bg-dark text-center my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
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
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="form-control text-center bg-dark p-3 my-3 mx-auto text-white"
            style={{width: '80%', height: '10%'}}
          />
          <div id="validation" className=""></div>
          <button class="my-4 btn btn-secondary btn-block col-sm-9 mx-auto d-block p-3 rounded-pill"><b>SIGN UP</b></button>
        </div>
       
        <span className='text-secondary'>Have an account already?<t>  </t>
          <a
            className="text-white my-1 text-decoration-underline"
            href="/login"
            rel="noopener noreferrer"
          >
            Log In
          </a>
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
