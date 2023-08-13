import React from 'react';
import './App.css';

function Register() {
  return (
    <div className="App">
      <header className="col-sm-4 my-2 rounded shadow mx-auto App-header bg-white text-dark p-2">
        <h3 className="mt-4 text-bold">BlockMania</h3>
        <p>How about you create a wallet</p>
        <p className="p-4 alert-success text-dark col-sm-9 small">Note that you will be using the generated Wallet ID once you create a wallet</p>
        <div className="col-sm-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="form-control p-3 text-center  my-3 mx-auto"
            style={{width: '80%'}}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="form-control text-center p-3 my-3 mx-auto"
            style={{width: '80%'}}
            onChange={PasswordStrengthChecker}
          />
          <input 
            type="password" 
            placeholder="Confirm Password" 
            className="form-control text-center p-3 my-3  mx-auto"
            style={{width: '80%'}}
          />
          <div id="validation" className=""></div>
          <button className="my-2 btn btn-success">Register</button>
        </div>
        <a
          className="text-dark my-2 text-decoration-none small "
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
         Did you forget your password?
        </a>
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
