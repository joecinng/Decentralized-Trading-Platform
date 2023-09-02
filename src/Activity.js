/* Team 47: BlockMania 
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/App.css';
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
    <div className="App container-fluid bg-dark text-white px-2">
      <div className="w-100 mt-2 mx-1 row text-start text-white fw-bold px-lg-4 rounded-5 d-flex justify-content-center">
        <div class="col-lg-12 pt-3">
          <h4 className="pt-5 pb-4 mt-5">Previous Transactions</h4>
          <div class="table-responsive borderless">
            <table className="table mx-100 table-dark">
              <thead class="text-center">
                <tr>
                  <th className="bg-secondary border-corner-left py-3" colspan="3">Product</th>
                  <th className="bg-secondary py-3">Invoice ID</th>
                  <th className="bg-secondary py-3">To Address</th>
                  <th className="bg-secondary py-3">Amount</th>
                  <th className="bg-secondary py-3">Date</th>
                  <th className="bg-secondary border-corner-right py-3">Status</th>
                </tr>
              </thead>
              <tbody class="w-100 text-center">
                <tr><td></td></tr>
                {transactionHistory.map((tx, index) => (
                  <tr className="border-0" key={index}>
                    <td className="py-3 border-0"><img src="https://source.unsplash.com/random/art?random" class="rounded-3" width="50px" height="50px" alt='pic'/></td>
                    <td className="py-4 border-0" colspan="2">Example Product Name</td>
                    <td className="py-4 border-0">{tx.hash.substring(0, 6) + "..." + tx.hash.substring(tx.hash.length - 9)}</td>
                    <td className="py-4 border-0">{tx.outputs[0].addresses[0].substring(0, 6) + "..." + tx.outputs[0].addresses[0].substring(tx.outputs[0].addresses[0].length - 9)}</td>
                    <td className="py-4 border-0">{(tx.total / (cryptoType === 'eth' ? 1e18 : 1e8)).toFixed(4)} {cryptoType.toUpperCase()}</td>                      
                    <td className="py-4 border-0">{new Date(tx.received).toLocaleString()}</td>
                    <td className={`py-4 border-0`}>
                      <span className={`text-decoration-none d-flex align-items-center justify-content-center rounded fw-bold p-1 small ${tx.confirmations > 0 ? 'success-status': ''}`}>
                        {tx.confirmations > 0 ? 'Success' : 'Pending'}
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
    </>
  );
}

export default Activity;
