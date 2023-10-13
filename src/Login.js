/* Team 47: BlockMania 
   Stefan Ralph Kumarasinghe (103804645)
   Joe Cin NG (102765534)
   Miran Abeyewardene (103824193) */
   
import React, { useState } from 'react';
import './css/App.css';
import Logo from './img/Logo-black.png';
import { showNotification } from './Notifications';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Redirect if already logged in
    if (localStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = "/";
    }
    const handleLogin = async () => {
        if (!email || !password) {
            showNotification('Error', 'Please fill in all fields.', 'danger');
            return; // Exit the function early
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/login/', {
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
                showNotification('Success', data.message, 'success');
                setTimeout(function() {
                    window.location.href = '/';
                  }, 2000);
            } else {
                showNotification('Error', data.message, 'danger');
            }
        } catch (error) {
            showNotification('Error','Error logging in. Please try again','danger');
        }
    };
    
    return (
        <div className="App bg-dark d-flex justify-content-center align-items-center vh-100">
            <div className="App-header rounded-5 mx-auto col-sm-5 shadow py-5 bg-light">
                <div className="col-sm-8 text-center text-dark">
                    <img src={Logo} alt='logo' className="pb-3 img-fluid logo" />
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
                        className="form-control p-3 bg-light text-center my-2 text-dark input-form"
                    />
                    <button  
                        onClick={handleLogin}  
                        className="mt-4 btn btn-dark fs-5 fw-bold btn-block col-lg-10 col-8 mx-auto d-block p-3 rounded-5 w-100"
                    >
                        <b>Log In</b>
                    </button>
                </div>
                <span className='text-dark d-block text-center mt-3'>
                    Don't have an account? 
                    <a className="text-dark text-decoration-underline" href="/register" rel="noopener noreferrer">Sign Up</a>
                </span>
            </div>
        </div>
    );
}

export default Login;
