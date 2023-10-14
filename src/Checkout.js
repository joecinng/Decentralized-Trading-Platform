/* Team 47: BlockMania
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import './css/App.css';
import { useCart } from './CartContext';
import Web3 from 'web3';
import { showNotification } from './Notifications';

{/* This is checkout page which is used to process the payment and execute smart contract*/}
function Checkout() {
    const abi = [{"inputs":[{"internalType":"address","name":"_userAddress","type":"address"},{"internalType":"uint256[]","name":"_dbAssetId","type":"uint256[]"},{"internalType":"uint256","name":"_totalPrice","type":"uint256"}],"name":"addTransaction","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"getAllTransaction","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"transactionCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"transactions","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"userAddress","type":"address"},{"internalType":"uint256","name":"dbAssetId","type":"uint256"}],"stateMutability":"view","type":"function"}];
    const contractAddress = "0x58Aa61C30fFfC0ee70063eFca151DDc0C5d9cdfb";
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
                } catch (error) {
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
        if (isConnected) {
            
            const accountBalanceWei = await web3.eth.getBalance(accounts[0]);
            const accountBalanceEther = web3.utils.fromWei(accountBalanceWei, 'ether');

            if (totalPrice > accountBalanceEther) {
                showNotification('Error', 'Insufficient funds in your wallet', 'danger');
                return;
            }

            // Interaction with your contract
            const contract = new web3.eth.Contract(abi, contractAddress);
            var transactionStatus = false;
        
            try {
                var assetsId = [];
                for (var item of cart) {
                    assetsId.push(item["id"]);
                }

                const price = web3.utils.toWei(totalPrice.toString(), 'ether'); // Replace with the total price in Ether

                // Prepare the transaction object
                const transactionObject = {
                    from: accounts[0],
                    to: contractAddress,
                    value: price,
                    gas: 1000000
                };

                await contract.methods.addTransaction(accounts[0], assetsId, price)
                    .send(transactionObject)
                    .on('transactionHash', function (hash) {
                        console.log('Transaction Hash: ' + hash);
                    })
                    .on('receipt', (receipt) => {
                        if (receipt.status) {
                            console.log('Transaction successful' + receipt.status);
                            console.log('Transaction was successful:', receipt);
                            transactionStatus = true;
                        } else {
                            console.log('Transaction failed');
                        }
                    })
                    .on('error', function (error) {
                        console.error('Transaction Error: ' + error);
                    });

            } catch (error) {
                console.error('Error executing the transaction:', error);
            }
        
            if (transactionStatus) {
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
                            showNotification("Success", data.message, "success");
                            setTimeout(function() {
                                localStorage.removeItem('cart');
                                window.location.href = "/confirmation";
                            }, 2000);
                            
                        } else {
                            showNotification("Checkout error", data.message, "danger");
                        }
                    } else {
                    const jsonResponse = await response.json();
                    console.error('Checkout failed:', jsonResponse);
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        } else {
            showNotification("Error", "Wallet is not connected, please connect your wallet", "danger");
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
    