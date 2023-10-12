/* Team 47: BlockMania
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

import React, { useState, useEffect } from 'react';
import './css/App.css';
import { useCart } from './CartContext';
import Web3 from 'web3';
import { showNotification } from './Notifications';

    function Checkout() {
        const abi = [{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256[]","name":"_transactionIds","type":"uint256[]"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"addTransaction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"}],"name":"getBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_transactionId","type":"uint256"}],"name":"getTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"address","name":"","type":"address"},{"internalType":"uint256[]","name":"","type":"uint256[]"},{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getTransactionsCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transactionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"totalPrice","type":"uint256"}],"stateMutability":"view","type":"function"}];
        const contractAddress = "0x6bAA795c29E06F9BCaA12dab47082715275D3eCD";
        const { cart, totalPrice } = useCart();
        const [accounts, setAccounts] = useState([]);
        const [isConnected, setIsConnected] = useState(false);
        const web3 = new Web3(window.ethereum);

        useEffect(() => {
            // Function to connect to MetaMask
            const connectWallet = async () => {
                if (window.ethereum) {
                    try {
                        const accountArray = await window.ethereum.request({ method: 'eth_requestAccounts' });
                        setAccounts(accountArray);
                        setIsConnected(accountArray && accountArray.length > 0);
                        console.log("account" + accountArray);
                    } catch (error) {
                        console.error('Error connecting to MetaMask:', error);
                        setIsConnected(false);
                    }
                } else {
                    console.log('MetaMask not detected');

                    setIsConnected(false);
                }
            };
            connectWallet();
        }, []);

        const handleCheckout = async () => {
            const receiver = '0x6d47F9C92abA87334AE51fd358B7b035B6543d8c';
          
            if (isConnected) {
              
                const accountBalanceWei = await web3.eth.getBalance(accounts[0]);

                const accountBalanceEther = web3.utils.fromWei(accountBalanceWei, 'ether');

                if (totalPrice > accountBalanceEther) {
                    showNotification('Error', 'Insufficient funds in your wallet', 'danger');
                    return;
                }
            
              const endpoint = `http://127.0.0.1:8000/checkout/?user_id=${localStorage.getItem('userID')}&total_price=${totalPrice.toFixed(2)}`;
              try {
                const response = await fetch(endpoint, {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(cart),
                });
          
                if (response.ok) {
                  const data = await response.json();
                  if (data.status === "success") {
                    // Interaction with your contract
                    const contract = new web3.eth.Contract(abi, contractAddress);
          
                    try {

                        const transactionIds = [1, 2]; // Replace with the transaction IDs you want to associate with this transaction
                        const price = web3.utils.toWei(totalPrice.toString(), 'ether'); // Replace with the total price in Ether

                        // Prepare the transaction object
                        const transactionObject = {
                            from: accounts[0],
                            to: contractAddress,
                            value: price,
                            gas: 1000000
                        };
                        // Call the addTransaction function
                        const receipt = await contract.methods.addTransaction(accounts[0], transactionIds, price)
                            .send(transactionObject)
                            .on('transactionHash', function (hash) {
                                console.log('Transaction Hash: ' + hash);
                            })
                            .on('confirmation', function (confirmationNumber, receipt) {
                                console.log('Confirmation Number: ' + confirmationNumber);
                                if (confirmationNumber === 2) {
                                    console.log('Transaction confirmed.');
                                }
                            })
                            .on('error', function (error) {
                                console.error('Transaction Error: ' + error);
                            });
                    
                        console.log('Transaction was successful:', receipt);
                    
                    } catch (error) {
                        console.error('Error executing the transaction:', error);
                    }
                    
                    localStorage.removeItem('cart');
                    window.location.href="/confirmation"
                  } else {
                    // Handle server-side checkout failure
                    console.error('Checkout failed:', data.message);
                    window.location.href="/activity"
                  }
                } else {
                  const jsonResponse = await response.json();
                  console.error('Checkout failed:', jsonResponse);
                }
              } catch (error) {
                console.error('An error occurred:', error);
              }
            }
          };
          

        return (
            <>
                <div className="App w-100">
                    <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5">
                        <div className="row bg-dark h-100 col-sm-12 mx-auto">
                            <div className="col-sm-5 bg-light shadow mx-auto p-5 m-5 rounded-5">
                                <h2 className="text-center fw-bold mb-4">Checkout</h2>
                                <hr />
    
                                {cart.length > 0 ? (
                                    <ul className="list-unstyled m-2">
                                        {cart.map(item => (
                                            <li key={item.id} className="d-flex align-items-top mb-4">
                                                <img 
                                                    src={item.image_url} 
                                                    className="rounded-2 me-3"
                                                    style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                                                    alt={item.product_name}
                                                />
                                                <div className="flex-grow-1">
                                                    <p className="mb-0 text-start fw-bold small">{item.name}</p>
                                                    <p className="text-start small col-sm-11">{item.description}</p>
                                                </div>
                                                <div>
                                                    <p className="mb-0 fw-bold">{item.current_price} ETH</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="p-2">Your cart is empty...</p>
                                )}
    
                           
    
                                <button onClick={handleCheckout} className="btn btn-dark w-100 rounded-5 p-3 fw-bold">Pay {totalPrice.toFixed(2)} ETH</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
    export default Checkout;
    