import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useCart } from './CartContext';
import './App.css';

function Checkout() {
  const { cart } = useCart();
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState('0');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchAccountDetails = async () => {
      if (window.ethereum) {
        try {
          const accountArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
          setAccounts(accountArray);
          setIsConnected(accountArray && accountArray.length > 0);

          if (accountArray.length > 0) {
            const accountBalance = await window.ethereum.request({ method: 'eth_getBalance', params: [accountArray[0]] });
            setBalance(accountBalance);
            console.log(accountBalance);
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
      <Nav count={cart.length} cart={cart} address={accounts[0]} balance={balance} />
      <div className="App w-100 " style={{ height: '100vh' }}>
        <div className="">
          <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5">
            <div className="row bg-dark h-100 pt-5 col-sm-12 mx-auto">
              <div className="col-sm-4 bg-light shadow mx-auto p-5 m-5 rounded-5">
                <h2 className="text-center mt-4 mb-4">Connect Wallet</h2>
                <p className="fw-bold">Connect your wallet by installing metamask on your browser and they'll do the rest for you</p>
                <div className="d-flex align-items-top mb-4">
                  <a href="#" className={`btn ${isConnected ? 'btn-success' : 'btn-primary'} rounded-3 w-100 p-4`} onClick={connectWallet} id="Connect">
                    {isConnected ? 'Connected' : 'Connect via MetaMask'}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
