import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useCart } from './CartContext';
import Nav from './Nav';

function Activity() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [cryptoType] = useState('eth'); // Default value set to 'ethereum'
  const { cart } = useCart();
  const blockcypherToken = '317b022b37cf41118924ca48d8627365';

  useEffect(() => {
    const addresses = {
      'eth': '0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae'
    };
    axios.get(`https://api.blockcypher.com/v1/${cryptoType}/main/addrs/${addresses[cryptoType]}/full?token=${blockcypherToken}`)
      .then(response => {
        setTransactionHistory(response.data.txs);
      })
      .catch(error => {
        console.error(`Error occurred while fetching ${cryptoType} transaction history:`, error);
      });
  }, [cryptoType]);

  return (
    <>
    <Nav count={cart.length} cart={cart} />
    <div className="App">
      <div className="bg-dark text-white px-2">
        <div className="col-12 text-start col-sm-12 mx-auto px-5 rounded-5">
          <h2 className="py-5">Previous Transactions</h2>
            <table className="table w-100 table-dark border-0">
              <thead>
                <tr className="text-muted">
                <th className="border-0">Product</th>
                <th className="border-0"></th>
                  <th className="border-0">Invoice</th>
                  <th className="border-0">Value</th>
                  <th className="border-0">Timestamp</th>
                  <th className="border-0">To Address</th>
                  <th className="border-0">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((tx, index) => (
                  <tr className="border-0" key={index}>
                    <td className="py-3 border-0"><img src="https://htmlcolorcodes.com/assets/images/colors/blue-green-color-solid-background-1920x1080.png" class="rounded-5" width="50px" height="50px" alt='pic'/></td>
                    <td className="py-3 border-0">Example Product Name</td>
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
    </>
  );
}

export default Activity;
