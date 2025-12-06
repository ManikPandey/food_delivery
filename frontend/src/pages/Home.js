import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaClock, FaSearch } from 'react-icons/fa';

function Home({ addToCart }) {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedRestId, setExpandedRestId] = useState(null);

  const categories = ["All", "Italian", "Indian", "Chinese", "Desserts", "American"];

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    axios.get(`${apiUrl}/restaurants`)
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredRestaurants = restaurants.filter(res => {
    const matchesSearch = res.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || res.cuisine === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero">
        <h1 style={{fontSize: '3rem', marginBottom: '10px'}}>Craving something?</h1>
        <p style={{fontSize: '1.2rem', opacity: 0.9}}>Order from your favorite restaurants near you.</p>
        
        <div style={{position: 'relative', width: '50%'}}>
           <FaSearch style={{position: 'absolute', top: '23px', left: '15px', color: '#888'}} />
           <input 
             className="search-bar" 
             style={{paddingLeft: '40px', width: '100%'}} // adjust padding for icon
             placeholder="Search for restaurant, cuisine or a dish" 
             onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="container">
        {/* Category Filters */}
        <div className="category-filter">
          {categories.map(cat => (
            <div 
              key={cat} 
              className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>

        <h2 style={{marginTop: '30px', borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
           {filteredRestaurants.length} Restaurants found
        </h2>

        <div className="restaurant-grid">
          {filteredRestaurants.map(res => (
            <div key={res._id} className="res-card">
              <div style={{position: 'relative'}}>
                <img src={res.imageUrl} alt={res.name} className="res-img" />
                <div style={{
                  position: 'absolute', bottom: '10px', right: '10px', 
                  background: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem'
                }}>
                  {res.deliveryTime}
                </div>
              </div>
              
              <div className="res-details">
                <div className="res-header">
                  <h3>{res.name}</h3>
                  <span className="rating"><FaStar /> {res.rating}</span>
                </div>
                <p style={{color: '#666', fontSize: '0.9rem'}}>{res.cuisine}</p>
                
                <button 
                  onClick={() => setExpandedRestId(expandedRestId === res._id ? null : res._id)}
                  style={{width: '100%', padding: '10px', marginTop: '15px', border:'1px solid #fc8019', color:'#fc8019', background:'white', borderRadius:'4px', cursor:'pointer'}}
                >
                  {expandedRestId === res._id ? 'Close Menu' : 'View Menu'}
                </button>

                {expandedRestId === res._id && (
                  <div style={{marginTop: '15px', borderTop: '1px solid #eee'}}>
                    {res.menu.map(item => (
                      <div key={item._id} className="menu-item">
                        <div style={{width: '70%'}}>
                          <strong>{item.name}</strong>
                          <div style={{fontSize: '0.8rem', color: '#888'}}>{item.description}</div>
                          <div style={{marginTop:'5px'}}>${item.price}</div>
                        </div>
                        <button className="add-btn" onClick={() => addToCart(item)}>ADD +</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;