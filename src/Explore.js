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
  const [temp, setTemp] = useState([
    {
      "id": "1",
      "symbol": "btc",
      "desc": "Artwork by John Doe.",
      "name": "ArtWork Maniac",
      "image": "https://source.unsplash.com/random/art?1",
      "current_price": 3
    },
    {
      "id": "2",
      "symbol": "btc",
      "desc": "Artwork by John Doe.",
      "name": "Dania Maniac",
      "image": "https://source.unsplash.com/random/art?2",
      "current_price": 3
    },
    {
      "id": "3",
      "symbol": "btc",
      "desc": "Abstract art showcasing the beauty of nature.",
      "name": "Nature's Abstract",
      "image": "https://source.unsplash.com/random/art?3",
      "current_price": 4
    },
    {
      "id": "4",
      "symbol": "btc",
      "desc": "Artwork focusing on geometric patterns.",
      "name": "Geometric Magic",
      "image": "https://source.unsplash.com/random/art?4",
      "current_price": 5
    },
    {
      "id": "5",
      "symbol": "btc",
      "desc": "Art inspired by the wonders of the universe.",
      "name": "Galactic Dreams",
      "image": "https://source.unsplash.com/random/art?5",
      "current_price": 6
    },
    {
      "id": "6",
      "symbol": "btc",
      "desc": "Art that mirrors the complexity of human emotions.",
      "name": "Emotion Spectrum",
      "image": "https://source.unsplash.com/random/art?6",
      "current_price": 3.5
    },
    {
      "id": "7",
      "symbol": "btc",
      "desc": "An artistic representation of time's relentless march.",
      "name": "Eternal Clock",
      "image": "https://source.unsplash.com/random/art?7",
      "current_price": 7
    },
    {
      "id": "8",
      "symbol": "btc",
      "desc": "A colorful depiction of summer's joy.",
      "name": "Summer Palette",
      "image": "https://source.unsplash.com/random/art?8",
      "current_price": 4.5
    },
    {
      "id": "9",
      "symbol": "btc",
      "desc": "The dance of colors on a canvas.",
      "name": "Color Waltz",
      "image": "https://source.unsplash.com/random/art?9",
      "current_price": 5.5
    },
    {
      "id": "10",
      "symbol": "btc",
      "desc": "The serenity of winter captured in art.",
      "name": "Winter Calm",
      "image": "https://source.unsplash.com/random/art?10",
      "current_price": 4
    }
  ]);
    
  const [filteredAssets, setFilteredAssets] = useState([
    {
      "id": "1",
      "symbol": "btc",
      "desc": "Artwork by John Doe.",
      "name": "ArtWork Maniac",
      "image": "https://source.unsplash.com/random/art?1",
      "current_price": 3
    },
    {
      "id": "2",
      "symbol": "btc",
      "desc": "Artwork by John Doe.",
      "name": "Dania Maniac",
      "image": "https://source.unsplash.com/random/art?2",
      "current_price": 3
    },
    {
      "id": "3",
      "symbol": "btc",
      "desc": "Abstract art showcasing the beauty of nature.",
      "name": "Nature's Abstract",
      "image": "https://source.unsplash.com/random/art?3",
      "current_price": 4
    },
    {
      "id": "4",
      "symbol": "btc",
      "desc": "Artwork focusing on geometric patterns.",
      "name": "Geometric Magic",
      "image": "https://source.unsplash.com/random/art?4",
      "current_price": 5
    },
    {
      "id": "5",
      "symbol": "btc",
      "desc": "Art inspired by the wonders of the universe.",
      "name": "Galactic Dreams",
      "image": "https://source.unsplash.com/random/art?5",
      "current_price": 6
    },
    {
      "id": "6",
      "symbol": "btc",
      "desc": "Art that mirrors the complexity of human emotions.",
      "name": "Emotion Spectrum",
      "image": "https://source.unsplash.com/random/art?6",
      "current_price": 3.5
    },
    {
      "id": "7",
      "symbol": "btc",
      "desc": "An artistic representation of time's relentless march.",
      "name": "Eternal Clock",
      "image": "https://source.unsplash.com/random/art?7",
      "current_price": 7
    },
    {
      "id": "8",
      "symbol": "btc",
      "desc": "A colorful depiction of summer's joy.",
      "name": "Summer Palette",
      "image": "https://source.unsplash.com/random/art?8",
      "current_price": 4.5
    },
    {
      "id": "9",
      "symbol": "btc",
      "desc": "The dance of colors on a canvas.",
      "name": "Color Waltz",
      "image": "https://source.unsplash.com/random/art?9",
      "current_price": 5.5
    },
    {
      "id": "10",
      "symbol": "btc",
      "desc": "The serenity of winter captured in art.",
      "name": "Winter Calm",
      "image": "https://source.unsplash.com/random/art?10",
      "current_price": 4
    }
  ]);

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
      <div className="row text-start mx-auto text-white fw-bold p-4 pt-5 mt-5 rounded-5">
        <div class="w-100 row my-2">
          <div class="col-lg-7 ">
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
              <img class="w-100 image-block card-img" src={asset.image} alt="item" style={{ width: '100%', height: '35vh' }} />
              <div className="card-body px-0 mx-0">
                <span className="card-title w-50 h-50">{asset.name} #0000</span>
                  <span className="card-text"><h4>{asset.current_price} ETH</h4></span>
                </div>
                {/*Adds items to the cart list*/}
                <button className="btn btn-secondary rounded btn-block" onClick={() => addToCart(asset)}>Add to Cart</button>
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
