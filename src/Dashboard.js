import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function Dashboard() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [cryptoType, setCryptoType] = useState('eth'); // Default value set to 'ethereum'
 
  const [balance, setBalance] = useState(0);
  const blockcypherToken = '317b022b37cf41118924ca48d8627365';
  const addresses = {
    'eth': '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
  };

  useEffect(() => {
    axios.get(`https://api.blockcypher.com/v1/${cryptoType}/main/addrs/${addresses[cryptoType]}/full?token=${blockcypherToken}`)
      .then(response => {
        setTransactionHistory(response.data.txs);
        setBalance(response.data.balance / (cryptoType === 'eth' ? 1e18 : 1e8)); // Conversion for ETH or BTC-like balances
      })
      .catch(error => {
        console.error(`Error occurred while fetching ${cryptoType} transaction history:`, error);
      });
  }, [cryptoType]);

  const handleCryptoChange = (event) => {
    setCryptoType(event.target.value);
  };

  return (
    
    <div className="App " style={{height: '100vh'}}>
      <select 
    className="form-control border-3 py-3 px-3 mx-5 mt-3 rounded-5 bg-dark text-white float-end" 
    name="cryptocurrency" 
    value={cryptoType}
    onChange={handleCryptoChange}
    style={{width: "auto"}}  // Adjust width to auto to make it button-sized
>
    <option value="eth">View Balance in ETH</option>

    </select>

      <div className="container-fluid h-100 bg-dark text-white">

        <div className="row h-100">
          
          <div className="col-12 shadow">
            <div className="row h-100">
        
       

              
              <div className="col-12 text-start p-4">
                <div className="col-sm-9 mx-auto m-3 p-5 rounded-5">
                  <h1>{balance} {cryptoType.toUpperCase()}</h1>
                  <h5 className="mt-5 py-2">Completed Transactions</h5>
                  <div className="w-100 col-sm-6">
                    <table className="table table-dark border-0">
                      <thead>
                        <tr className="text-muted">
                          <th className="border-0">Transaction ID</th>
                          <th className="border-0">Value</th>
                          <th className="border-0">Timestamp</th>
                          <th className="border-0">To Address</th>
                          <th className="border-0">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionHistory.map((tx, index) => (
                          <tr className="border-0" key={index}>
                            <td className="py-3 border-0">{tx.hash.substring(0, 6) + "..." + tx.hash.substring(tx.hash.length - 4)}</td>
                            <td className="py-3 border-0">{tx.total / (cryptoType === 'eth' ? 1e18 : 1e8)} {cryptoType.toUpperCase()}</td>
                            <td className="py-3 border-0">{new Date(tx.received).toLocaleString()}</td>
                            <td className="py-3 border-0">{tx.outputs[0].addresses[0]}</td>
                            <td className={`py-3 border-0`}>
                              <span className={`p-3 fw-bold ${tx.confirmations > 0 ? 'rounded-3 btn-success bg-success' : 'rounded-3 btn-warning bg-warning'}`}>
                                {tx.confirmations > 0 ? 'Confirmed' : 'Pending'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
