import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { useCart } from './CartContext';
import Nav from './Nav';

function Activity() {
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [cryptoType] = useState('eth'); // Default value set to 'ethereum'
  const { cart } = useCart();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/transactions/`)
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
    <div className="App container-fluid">
      <div className="bg-dark text-white px-2">
        <div className="text-start  col-sm-12 mx-auto px-2 rounded-5">
          <h2 className="py-5 mt-5">Previous Transactions</h2>
          <div class="table-responsive">
            <table className="table   mx-100 table-dark border-0">
              <thead>
                <tr className="text-muted">
                <th className="border-0">Product</th>
                <th className="border-0"></th>
                  <th className="border-0">Invoice</th>
                  <th className="border-0">Value</th>
                  <th className="border-0">Date</th>
                  <th className="border-0">To Address</th>
                  <th className="border-0">Status</th>
                </tr>
              </thead>
              <tbody className="w-100">
    {transactionHistory.map((tx) => (
        <tr className="border-0" key={tx.transaction_id}>
            <td className="py-3 border-0">
                <img 
                    src={tx.image_url} 
                    className="rounded-5" 
                    width="50px" 
                    height="50px" 
                    alt={tx.product_name} 
                />
            </td>
            <td className="py-3 border-0">{tx.product_name}</td>
            <td className="py-3 border-0">
                {tx.hash.substring(0, 6) + "..." + tx.hash.substring(tx.hash.length - 4)}
            </td>
            <td className="py-3 border-0">
                {tx.total}
            </td>
            <td className="py-3 border-0">{new Date(tx.received).toLocaleString()}</td>
            <td className="py-3 border-0">{tx.output_address}</td>
            <td className={`py-3 border-0`}>
                <span className={`p-3 fw-bold ${
                    tx.status === 'Confirmed' ? 'rounded-3 btn-success bg-success' : 'rounded-3 btn-warning bg-warning'
                }`}>
                    {tx.status}
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
