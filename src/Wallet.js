/* Team 47: BlockMania 
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useCart } from './CartContext';
import './css/App.css';
import Web3 from 'web3';

{/* Checkout page, this is where users view their shopping cart and total amount */}
function Checkout() {
  const { cart } = useCart();
  const [accounts, setAccounts] = useState([]);
  const [message, setMessage] = useState("");
  const [operationSuccess, setOperationSuccess] = useState(false);
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);
  const web3 = new Web3("http://127.0.0.1:7545");

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (window.ethereum) {
        try {
          const accountArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accountArray);
          setIsConnected(accountArray && accountArray.length > 0);

          if (accountArray.length > 0) {
            const accountBalanceWei = await window.ethereum.request({ method: 'eth_getBalance', params: [accountArray[0]] });

            const accountBalanceEther = web3.utils.fromWei(accountBalanceWei, 'ether');

            setBalance(accountBalanceEther);

            // Send account details to backend
            await storeAccountDetails(accountArray[0], accountBalanceEther);
          } 
        } catch (error) {
          console.error('Error:', error);
          setIsConnected(false);
        }
      } else {
        console.log('MetaMask not detected');
        setIsConnected(false);
      }
    };

    const storeAccountDetails = async (address, balance) => {
      try {
        const endpoint = "http://127.0.0.1:8000/connect";  // Corrected endpoint path
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            address: String(address),
            balance: String(balance),
            user: String(localStorage.getItem("userID")) // Remember to provide the user ID if it's required by your endpoint
          })
        });
        const data = await response.json();
        if (response.ok && data.status === "success") {
          setMessage("The balance has been synchronized.");
          setOperationSuccess(true);                       
        } else {
          throw new Error(`Server error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error storing account details:', error);
        setMessage(error.message);
        setOperationSuccess(false);
      }
  };
    fetchAccountDetails();
}, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accountArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccounts(accountArray);
        setIsConnected(accountArray && accountArray.length > 0);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setIsConnected(false);
      }
    } else {
      console.log('MetaMask not detected');
      setIsConnected(false);
    }
  };

  return (
    <>
      <Nav count={cart.length} cart={cart} address={accounts[0]} balance={balance}/>
      <div className="App w-100 d-flex justify-content-center align-items-center vh-100">
        <div className="container-fluid col-sm-12 mx-auto">
          <div className="row h-100 d-flex align-items-center">
            <div className="col-sm-4 bg-light shadow mx-auto px-5 py-3 rounded-5">
              <h4 className="text-center my-4">Connect Wallet</h4>
              <p className="pb-3 fw-bold">Connect your wallet by installing metamask on your browser and they'll do the rest for you</p>
              <div className="mb-3">
                {message && 
                  <div className={`alert ${operationSuccess ? "alert-success" : "alert-danger"}`} role="alert">
                    {message}
                  </div>
                }
                <a href="/wallet" className={`w-100 text-decoration-none d-flex align-items-center justify-content-center rounded-5 fw-bold py-3 bg-dark text-light ${isConnected ? 'disabled' : ''}`} onClick={connectWallet} id="Connect">
                  <span>{isConnected ? 'Connected' : 'Connect via MetaMask'}</span>
                  <span class="material-symbols-outlined mx-2 fs-5">wallet</span>
                </a>
              </div>
            </div>
          </div>   
        </div>
      </div>
    </>
  );
}

export default Checkout;
