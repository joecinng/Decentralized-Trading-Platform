import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

import './App.css';



   

function Search() {
    const [assets, setAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedAsset, setSelectedAsset] = useState(null);
    const blockcypherToken = '317b022b37cf41118924ca48d8627365';
    const [cart, setCart] = useState([]);
  

    useEffect(() => {

  
                setAssets([{"id":"bitcoin","symbol":"btc","desc":"Artwork by Stefan with a depiction of how sexy Stefan is....","name":"ArtWork Maniac","image":"https://th.bing.com/th/id/OIP.eupcce_RCFpqH2fsWKrLBAHaE7?pid=ImgDet&rs=1","current_price":3},{"id":"bitcoin","symbol":"btc","name":"Dania Maniac","desc":"Artwork by Stefan with a depiction of how sexy Stefan is....","image":"https://th.bing.com/th/id/OIP.p86bUO9ND1fxwX57R806PQHaHa?pid=ImgDet&w=900&h=900&rs=1","current_price":3}]);
            
    }, []);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value === '') {
            setFilteredAssets(assets);
        } else {
            const filtered = assets.filter(asset => asset.name.toLowerCase().includes(value.toLowerCase()));
            setFilteredAssets(filtered);
        }
    };
function addToCart (asset)  {
    // Check if the asset is already in the cart
    if (!cart.some(item => item.id === asset.id)) {
      setCart(prevCart => [...prevCart, asset]);
    } else {
      console.log("Item already in cart.");
    }
}



    return (
        <>
        <Nav cart={cart} />
        <div className="App " style={{ height: '100vh' }}>
            <div className="container-fluid bg-dark text-white">
  
                <div className="row ">
                    <div className="">
                        <div className="row ">
                            <div className=" row text-start mx-auto text-white fw-bold p-4">
                         
                                <div className=" mx-auto  m-3 p-5 rounded-5">
       
                                <div class="col-sm-6  text-center"> <input 
                                    type="text" 
                                    className="form-control   mx-auto text-white bg-dark p-3  mb-4" 
                                    placeholder="Search what to buy..." 
                                    value={search} 
                                    onChange={handleSearchChange}
                                /></div>
                                <div class="w-100 my-2">
                                    <a href="" class="btn btn-secondary">Music</a>        <a href="" class="btn btn-secondary mx-1">Fantom</a>
                                    <a href="" class="btn btn-secondary mx-1">Art</a>
                                    <a href="" class="btn btn-secondary mx-1">Token</a>
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

export default Search;
