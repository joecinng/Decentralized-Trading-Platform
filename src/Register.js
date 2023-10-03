/* Team 47: BlockMania 
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

/* eslint-disable no-lone-blocks */
import { useState , React } from 'react';
import './css/App.css';
import Logo from './img/Logo-black.png'

{/* Login page, this is because, once the user signs up*/}

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  function Check() {
    if (passwordConfirm != password) {
      setErrorMessage("Password does not match");
    } else {
      setErrorMessage("");
    }
  }  
   // Redirect if already logged in
   if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = "/";
}
const handleRegister = async () => {
  try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username: email, password })
      });
      const data = await response.json();
      if (data.status === "success") {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userID', data.user_id);
          window.location.href = "/";
      } else {
          setErrorMessage(data.message);
      }
  } catch (error) {
      setErrorMessage('Error registering in. Please try again.');
  }
};
  return (
    <div className="App bg-dark d-flex justify-content-center align-items-center vh-100">
      <header className="App-header rounded-5 mx-auto col-sm-5 shadow py-5 bg-light">
        <div className="col-sm-8 text-center text-dark">
          <img src={Logo} alt='logo' className="pb-3 img-fluid logo"/>
          <input 
                           type="text" 
                           placeholder="Email Address" 
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="form-control p-3 bg-light text-center my-2 text-dark input-form"
                       />
                 <input 
    type="password" 
    placeholder="Password" 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onInput={Check}
    className="form-control p-3 bg-light text-center my-2 text-dark input-form"
/>
<input 
    type="password" 
    placeholder="Confirm Password" 
    value={passwordConfirm}
    onChange={(e) => setConfirmPassword(e.target.value)}
    onInput={Check}
    className="form-control p-3 bg-light text-center my-2 text-dark input-form"
/>

          {errorMessage && <div id="validation">{errorMessage}</div>}

          <button onClick ={handleRegister} className="mt-4 btn btn-dark fs-5 fw-bold btn-block col-lg-10 col-8 mx-auto d-block p-3 rounded-5 w-100" ><b>Sign Up</b></button>
        </div>
        <span className='text-dark d-block text-center mt-3'>
          Have an account already?{' '}
          <a className="text-dark text-decoration-underline" href="/login" rel="noopener noreferrer">Log In</a>
        </span>
      </header>
    </div>  
  );
}

/*
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
*/

export default Register;
