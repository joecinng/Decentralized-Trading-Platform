import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function Dashboard() {
  const [cryptoData, setCryptoData] = useState([]);
  const [ethTransactionHistory, setEthTransactionHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,ripple,dogecoin,cardano,polkadot,uniswap,chainlink,binancecoin,stellar')
      .then(response => {
        setCryptoData(response.data);
      })
      .catch(error => {
        console.error('Error occurred while fetching crypto data:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.etherscan.io/api?module=account&action=txlist&address=0xc5102fE9359FD9a28f877a67E36B0F050d81a3CC&startblock=0&endblock=99999999&page=1&offset=1000&sort=desc&apikey=UDHJDUD1QYBWIXF8VHGNDN56FX4TZRQVEV')
      .then(response => {
        setEthTransactionHistory(response.data.result);
      })
      .catch(error => {
        console.error('Error occurred while fetching ETH transaction history:', error);
      });
  }, []);

  useEffect(() => {
    axios.get('https://api.etherscan.io/api?module=account&action=balance&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&tag=latest&apikey=UDHJDUD1QYBWIXF8VHGNDN56FX4TZRQVEV')
      .then(response => {
        setBalance(response.data.result / 1e18);
      })
      .catch(error => {
        console.error('Error occurred while fetching balance:', error);
      });
  }, []);

  const handleSendTransaction = (event) => {
    event.preventDefault();
    // You would handle sending the transaction here.
    // If using Metamask or similar, use the ethereum object injected into the window.
    // window.ethereum.request method can be used to interact with the Ethereum blockchain.
    console.log('Sending transaction:', recipient, amount);
  };

  return (
    <div className="App w-100" style={{height: '100vh'}}>
      <div className="container-fluid h-75 ">
        <div className="row h-100 ">
          <div className="col-2  h-100 overflow-auto shadow  text-center bg-white bg-light text-dark p-4">
            {/* This is the sidebar */}
            <h5>Digital assets</h5>
            <input type="text" className="form-control my-3 small" placeholder="Search for the asset.." />
            <div>
              {cryptoData.map(crypto => (
                <p className="text-decoration-none mx-0 list-unstyled p-3 shadow" key={crypto.id}>
                  <img src={crypto.image} alt={crypto.name} className="d-block mx-auto" style={{width: '25px', height: '25px'}}/>
                  {crypto.name}: {crypto.current_price} USD
                </p>
              ))}
            </div>
          </div>
          <div className="col-10 shadow">
            <div className="row h-100">
              <div className="col-12 text-start bg-light p-4">
                {/* This is the top area */}
                <h1 style={{color: 'blue'}}>{balance} ETH </h1>
                <p className="bg-warning col-sm-4 p-3">Your balance is in Ethereum</p>
                <h3>Make a transaction</h3>
                <form onSubmit={handleSendTransaction}>
                  <label class="d-block my-2">
                    Recipient:
                    <input type="text" placeholder="0x343..." class="form-control my-2 col-sm-6" value={recipient} onChange={e => setRecipient(e.target.value)} />
                  </label>
                  <label class="d-block my-2">
                    Amount:
                    <input type="number" placeholder="0.000000001 ETH" class="form-control my-2 col-sm-6" value={amount} onChange={e => setAmount(e.target.value)} />
                  </label>
                  <p class="bg-danger text-white p-4">Note you can not send in any other currency except ETH, if you need a token exchange please visit Binance</p>
                  <input class="btn btn-success" type="submit" value="Send Transaction" />
                  
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row w-100 bg-light shadow h-25 border-4  overflow-auto">
        <div className="text-start col-12 px-3 py-1 text-dark">
          {/* This is the main area */}
          <h3 className="text-start mb-2 ">Transaction History</h3>
          <div className="table-responsive">
            <table className="table table-striped table-light">
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Value</th>
                  <th>Timestamp</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {ethTransactionHistory.map((tx, index) => (
                  <tr key={index}>
                    <td>{tx.hash}</td>
                    <td>{tx.value / 1e18} ETH</td>
                    <td>{new Date(tx.timeStamp * 1000).toLocaleString()}</td>
                    <td>{tx.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
