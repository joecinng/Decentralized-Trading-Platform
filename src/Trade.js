import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function Trade() {
  const [cryptoData, setCryptoData] = useState([]);
  const [ethTransactionHistory, setEthTransactionHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,ripple,dogecoin,cardano,polkadot,uniswap,chainlink,binancecoin,stellar')
      .then(response => {
        setCryptoData('[{"id":"bitcoin","symbol":"btc","name":"ArtWork Maniac","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":3},{"id":"bitcoin","symbol":"btc","name":"Dania Maniac","image":"https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579","current_price":3}]');
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
    <div className="App w-100 " style={{height: '100vh'}}>
        <div class="">
      <div className="container-fluid col-sm-12 mx-auto bg-dark rounded-5  text-white">
        <div className="row h-100 pt-5 col-sm-12 mx-auto">


  <div class="col-sm-6"><img src="https://th.bing.com/th/id/OIP._uqECX1oZFenV1Jzjh0-hwHaEj?pid=ImgDet&rs=1" class=" rounded-5 bg-light my-3 w-100" /></div>
  <div class="col-sm-6 text-start py-4">        <div class="bg-light text-dark p-4 w-100 rounded-5 ">Please note that you can only pay using our Ethereum</div>
  <h1 class="mt-3">NFT Token ArtWork</h1>
  <h3 class="text-muted">2.33 ETH<small> paid to 0x3453..567</small></h3>

  <a href="" class="mt-4 btn btn-secondary btn col-sm-5">Buy</a>
  </div>
      </div>
      </div>
      </div>

    </div>
  );
}

export default Trade;
