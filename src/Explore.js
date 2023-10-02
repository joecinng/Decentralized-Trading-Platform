/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useCart } from './CartContext';
import './App.css';

function Explore() {

  {/*We use States for the variables instead of normal ones since by using states when these values change the DOM is re-rendered. We also 
  store them in a json format to mimic an SQL query as shown below..*/}
  {/* temp stores the visible one where as the filteredAssets have the fixed or permanent json objects almost like a SQL query retrived 
  but the temp stores the filtered ones from the main one when a user searches for a specific asset to buy */}
  const [temp, setTemp] = useState([]);
const [filteredAssets, setFilteredAssets] = useState([]);

useEffect(() => {
  // This function fetches data from the API
  async function fetchData() {
    try {
      let response = await fetch('http://127.0.0.1:8000/items/');
      let data = await response.json();

      setTemp(data);
      setFilteredAssets(data);
    } catch (error) {
      console.error("Error fetching the data: ", error);
    }
  }

  // Invoke the fetchData function
  fetchData();
}, []); // The empty dependency array ensures this useEffect runs only once when the component mounts

  {/* We use states because we want to re render the whole DOM when we setSearch(value) so then the states are updated and dynamically shown */}
  const [search, setSearch] = useState();
  const { cart, addToCart} = useCart();

  {/*Filters data from the main, if empty returns everything from the permanent SQL query but if something is entered then then use the filter member in JS to filter and returned based on what was entered to the temp variable */}
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value === '') {
      setFilteredAssets(filteredAssets);
    } else {
      const filtered = filteredAssets.filter(asset => asset.name.toLowerCase().includes(value.toLowerCase()));
      setTemp(filtered);
    }
  };

  {/* We are including the nav and passing the cart count and the cart items, so we can add items and update it on the nav bar */}
  return (
    <>
    <Nav count={cart.length} cart={cart} />
    <div className="App container-fluid bg-dark text-white">
      <div className="row text-start text-white fw-bold px-lg-4 pt-5 mt-5 rounded-5 d-flex justify-content-center">
        <div class="w-100 row my-2">
          <div class="col-lg-7 my-lg-0 my-3">
            <div class="table-responsive my-2">
              <div class="btn-group" role="group" aria-label="Basic example">
                <button type="button" class="btn btn-secondary"><a href="/" class="text-white"><h5 class="my-1 mx-2">All</h5></a></button>
                <button type="button" class="btn"><a href="/" class="text-white"><h5 class="my-1 mx-2">Music</h5></a></button>
                <button type="button" class="btn"><a href="/" class="text-white"><h5 class="my-1 mx-2">Fantom</h5></a></button>
                <button type="button" class="btn"><a href="/" class="text-white"><h5 class="my-1 mx-2">Art</h5></a></button>
                <button type="button" class="btn"><a href="/" class="text-white"><h5 class="my-1 mx-2">Token</h5></a></button>
              </div>
            </div>
          </div>
          
          {/* We use the onchange events so that whenever the input field changes it value, it automatically invokes the handleSearchChange function */}
          <div class="col-lg-5 text-center">
            <input 
              type="text" 
              className="form-control mx-auto text-white bg-dark p-3 mb-4" 
              placeholder="Search what to buy..." 
              value={search} 
              onChange={handleSearchChange}/>
          </div>
        </div>

        <div class="w-100 row align-items-center">
          {temp.map(asset => (
            <div className="col-xl-3">
            <div key={asset.id} className="p-3 my-3 bg-dark shadow-lg card text-white rounded border border-secondary">
              <img class="w-100 image-block card-img" src={asset.image_url} alt="item" style={{ width: '100%', height: '35vh' }} />
              <div className="card-body">
                <span className="card-title w-50 h-50">{asset.name} #0000</span>
                  <span className="card-text"><h4>{asset.current_price} ETH</h4></span>
                </div>
                {/*Adds items to the cart list*/}
                <button className="btn btn-secondary rounded btn-block fs-5" onClick={() => addToCart(asset)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default Explore;
