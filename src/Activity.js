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

  useEffect(() => {
    var userId = 0;
    if (localStorage.getItem('userID') != null) {
      userId = localStorage.getItem('userID');
    }

    axios.get('http://127.0.0.1:8000/transactions/?userId=' + userId)
    .then(response => {
      if (Array.isArray(response.data)) {
        setTransactionHistory(response.data);
      } else {
        console.warn("Unexpected data structure from API");
      }
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
          <h4 className="pt-5 pb-4 mt-4">Previous Transactions</h4>
            <div class="table-responsive borderless">
              {transactionHistory.length != 0 ? (
              <table className="table mx-100 table-dark">
                <thead class="text-center">
                  <tr>
                    <th className="bg-secondary border-corner-left py-3" colspan="2">Product</th>
                    <th className="bg-secondary py-3">Invoice ID</th>
                    <th className="bg-secondary py-3">Amount</th>
                    <th className="bg-secondary py-3">Date</th>
                    <th className="bg-secondary border-corner-right py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="w-100" class="text-center">
                  {transactionHistory.slice().reverse().map((tx) => (
                    <tr className="border-0" key={tx.transaction_id}>
                      <td className="py-3 ms-5 ps-5 border-0">
                        <img src={tx.image_url} className="rounded-5" width="50px" height="50px" alt={tx.name}/>
                      </td>
                      <td className="py-4 pe-5 border-0">{tx.name}</td>
                      <td className="py-4 border-0">
                          {tx.hash.substring(0, 6) + "..." + tx.hash.substring(tx.hash.length - 4)}
                      </td>
                      <td className="py-4 border-0">
                        {tx.current_price} ETH
                      </td>
                      <td className="py-4 border-0">{new Date(tx.received).toLocaleString()}</td>
                      <td className={`py-4 border-0`}>
                        <span className={`py-2 px-3 fw-bold ${
                            tx.status === 'Confirmed' 
                            ? 'rounded-3 btn-success bg-success' 
                            : tx.status === 'Denied'
                            ? 'rounded-3 btn-danger bg-danger'
                            : 'rounded-3 btn-warning bg-warning'
                          }`}>
                          {tx.status === 'Denied' ? 'Insufficient Funds' : tx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div class="container text-lg"><i>No transaction made.</i></div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Activity;
