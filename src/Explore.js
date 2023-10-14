/* Team 47: BlockMania 
    Stefan Ralph Kumarasinghe (103804645)
    Joe Cin NG (102765534)
    Miran Abeyewardene (103824193) */

/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import { useCart } from './CartContext';
import './css/App.css';

{/* This is explore page where the user can browse the assets and apply filters.*/}
{/* It uses the read items API to retrieve the items based on the type.*/}
function Explore() {
  const [temp, setTemp] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState("");
  const { cart, addToCart } = useCart();

  async function Category(id) {
    setActiveCategory(id);
    try {
      let response = await fetch('http://127.0.0.1:8000/items/?type=' + id);
      let data = await response.json();
      if(data.status === "error") {
        setTemp(null);
      } else {
        setTemp(data);
        setFilteredAssets(data);
      }
    } catch (error) {
      console.error("Error fetching the data: ", error);
    }
  }

  useEffect(() => {
    async function fetchData(id = 'All') {
      try {
        let response = await fetch('http://127.0.0.1:8000/items/?type=' + id);
        let data = await response.json();
        setTemp(data);
        setFilteredAssets(data);
      } catch (error) {
        console.error("Error fetching the data: ", error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value); 
    const filtered = filteredAssets.filter(asset => asset.name.toLowerCase().includes(value.toLowerCase()));
    setTemp(filtered);
  };

  return (
    <>
      <Nav count={cart.length} cart={cart} />
      <div className="App container-fluid bg-dark text-white">
        <div className="row text-start text-white fw-bold px-lg-4 pt-3 mt-5 rounded-5 d-flex justify-content-center">
          <div className="w-100 row my-2">
            <div className="col-lg-7 my-lg-0 my-3">
              <div className="table-responsive my-2">
                <div className="btn-group py-4" role="group" aria-label="Basic example">
                  <button 
                    type="button" 
                    className={`btn ${activeCategory === 'All' ? 'btn-secondary' : ''}`} 
                    onClick={() => Category('All')}
                  >
                    <h6 className="my-1 mx-2 text-white">All</h6>
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${activeCategory === 'Music' ? 'btn-secondary' : ''}`} 
                    onClick={() => Category('Music')}
                  >
                    <h6 className="my-1 mx-2 text-white">Music</h6>
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${activeCategory === 'NFT' ? 'btn-secondary' : ''}`} 
                    onClick={() => Category('NFT')}
                  >
                    <h6 className="my-1 mx-2 text-white">NFT</h6>
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${activeCategory === 'Fantom' ? 'btn-secondary' : ''}`} 
                    onClick={() => Category('Fantom')}
                  >
                    <h6 className="my-1 mx-2 text-white">Fantom</h6>
                  </button>
                  <button 
                    type="button" 
                    className={`btn ${activeCategory === 'Art' ? 'btn-secondary' : ''}`} 
                    onClick={() => Category('Art')}
                  >
                    <h6 className="my-1 mx-2 text-white">Art</h6>
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-5 text-center pt-4">
              <input 
                type="text" 
                className="form-control mx-auto text-white bg-dark p-3 mb-4" 
                placeholder="Search what to buy..." 
                value={search} 
                onInput={handleSearchChange} />
            </div>
          </div>

          <div className="w-100 row align-items-center">
            {temp != null ? (
              temp.map(asset => (
                <div className="col-xl-3">
                  <div key={asset.id} className="p-3 my-3 bg-dark shadow-lg card text-white rounded border border-secondary">
                    <img className="w-100 image-block card-img" src={asset.image_url} alt="item" style={{ width: '100%', height: '35vh' }} />
                    <div className="card-body">
                      <span className="card-title w-50 h-50">{asset.name} #0000</span>
                      <span className="card-text"><h5>{asset.current_price} ETH</h5></span>
                    </div>
                    {
                      // eslint-disable-next-line eqeqeq
                      asset.availability == true ? (
                        <button className="btn btn-secondary rounded btn-block fw-bold" onClick={() => addToCart(asset)}>Add to Cart</button>
                      ) : (
                        <button className="btn btn-secondary rounded btn-block fw-bold" disabled>Not available</button>
                      )
                    }
                  </div>
                </div>
              ))) : (
                <div class="container mx-2 text-lg"><i>No Assets.</i></div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Explore;
