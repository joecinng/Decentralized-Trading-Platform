import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';
import { useCart } from './CartContext';
import './App.css';

function Explore() {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([
        {
          "id": "1",
          "symbol": "btc",
          "desc": "Artwork by Stefan with a depiction of how sexy Stefan is...",
          "name": "ArtWork Maniac",
          "image": "https://source.unsplash.com/random/art?1",
          "current_price": 3
        },
        {
          "id": "2",
          "symbol": "btc",
          "desc": "Artwork by Stefan with a depiction of how sexy Stefan is...",
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
      ]
      );
    const [search, setSearch] = useState();
    const { cart, addToCart} = useCart();
    useEffect(() => {
                setAssets([{"id":"1","symbol":"btc","desc":"Artwork by Stefan with a depiction of how sexy Stefan is....","name":"ArtWork Maniac","image":"https://th.bing.com/th/id/OIP.eupcce_RCFpqH2fsWKrLBAHaE7?pid=ImgDet&rs=1","current_price":3},{"id":"2","symbol":"btc","name":"Dania Maniac","desc":"Artwork by Stefan with a depiction of how sexy Stefan is....","image":"https://th.bing.com/th/id/OIP.p86bUO9ND1fxwX57R806PQHaHa?pid=ImgDet&w=900&h=900&rs=1","current_price":3}]);
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === '') {
            setFilteredAssets(filteredAssets);
        } else {
            const filtered = filteredAssets.filter(asset => asset.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredAssets(filtered);
        }
    };




    return (
        <>
        <Nav count={cart.length} cart={cart} />
        <div className="App " style={{ height: ''}}>
            <div className="container-fluid bg-dark text-white">
  
                <div className="row ">
                    <div className="">
                        <div className="row ">
                            <div className=" row text-start mx-auto text-white fw-bold p-4">
                         
                                <div className=" mx-auto  m-3 p-5 rounded-5">
       
                                
                                <div class="w-100 row my-2">
                                    <div class="col-sm-7">
                                    <a href="" class="btn btn-secondary px-4">All</a> 
                                    <a href="" class="btn text-white ">Music</a>        <a href="" class="btn text-white mx-1">Fantom</a>
                                    <a href="" class="btn text-white mx-1">Art</a>
                                    <a href="" class="btn text-white  mx-1">Token</a>
                                    </div>
                                    <div class="col-sm-5  text-center"> <input 
                                    type="text" 
                                    className="form-control   mx-auto text-white bg-dark p-3  mb-4" 
                                    placeholder="Search what to buy..." 
                                    value={search} 
                                    onChange={handleSearchChange}
                                /></div>
                                </div>
                               <div class="">
                                    <h5 className="mb-4 mt-3">Returned Tokens</h5>
                                    <div  className="row w-100 align-items-center ">
                                        {filteredAssets.map(asset => (
                                           <div className="col-sm-3">
                                           <div 
                                               key={asset.id} 
                                               className="m-1 bg-dark shadow-lg  card text-white" 
                                        
                                           >
                                              
                                                <img class="w-100 image-block card-img "  src={asset.image} />
                                                <div className="card-body">
                                                   <h5 className="card-title my-2 text-muted">{asset.name} #0000</h5>
                                                   <p>{asset.desc}</p>
                                                
                                                   <span className="card-text text-muted">{asset.current_price} ETH</span>
                                               </div>
                                               <button className="btn btn-secondary btn-block" onClick={() => addToCart(asset)}>
                Add to Cart
              </button>
                                           </div>
                                       </div>
                                       
                                        ))}
                                    </div>
                               
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Explore;
