// src/pages/ProductList.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const searchQueries = queryParams.get('search') || "";

  const [viewMode, setViewMode] = useState('grid');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- NEW STATES FOR PRICE FILTER ---
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const fetchFilteredProducts = (isFilter = false) => {
    setLoading(true);
    let url = 'http://localhost:5000/api/products';
    
    // Agar search bar use ho raha hai
    if (searchQueries && !isFilter) {
      url = `http://localhost:5000/api/products/search?q=${searchQueries}`;
    } 
    // Agar price filter use ho raha hai
    else if (minPrice || maxPrice) {
      url = `http://localhost:5000/api/products?min=${minPrice}&max=${maxPrice}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFilteredProducts();
  }, [searchQueries]);

  return (
    <div className="pl-container">
      <nav className="pl-breadcrumb">
        Home &gt; Clothings &gt; Men's wear &gt; {searchQueries ? `Search: ${searchQueries}` : 'All Items'}
      </nav>

      <div className="pl-main-layout">
        <aside className="pl-sidebar">
          {/* Category Section remains same */}
          <div className="pl-filter-group">
            <div className="filter-header"><h4>Category</h4><span>⌄</span></div>
            <ul>
              <li>Mobile accessory</li>
              <li>Electronics</li>
              <li className="blue-text">See all</li>
            </ul>
          </div>

          {/* --- PRICE RANGE SECTION (NOW WORKING) --- */}
          <div className="pl-filter-group border-top">
            <div className="filter-header"><h4>Price range</h4><span>⌄</span></div>
            <div className="price-inputs">
              <div className="price-input-col">
                <label>Min</label>
                <input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
              </div>
              <div className="price-input-col">
                <label>Max</label>
                <input type="number" placeholder="9999" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
              </div>
            </div>
            <button className="btn-apply" onClick={() => fetchFilteredProducts(true)}>Apply</button>
          </div>
        </aside>

        <main className="pl-content">
          <div className="pl-top-bar">
            <div className="pl-items-count">
              Found <strong>{products.length}</strong> items
            </div>
            <div className="pl-controls">
              <div className="pl-view-toggle">
                <button className={viewMode === 'grid' ? 'active' : ''} onClick={() => setViewMode('grid')}>⊞</button>
                <button className={viewMode === 'list' ? 'active' : ''} onClick={() => setViewMode('list')}>☰</button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="pl-loading">Loading items...</div>
          ) : (
            <div className={viewMode === 'grid' ? 'pl-grid' : 'pl-list'}>
              {products.map(item => (
                <div key={item._id} className="pl-card" onClick={() => navigate(`/detail/${item._id}`)}>
                  <div className="pl-card-img">{item.image}</div>
                  <div className="pl-card-body">
                    <div className="pl-price-box">
                      <span className="current-price">${item.price.toFixed(2)}</span>
                    </div>
                    <h4 className="pl-item-name">{item.name}</h4>
                    {viewMode === 'list' && <p className="pl-item-desc">{item.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductList;