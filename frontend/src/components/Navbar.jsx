import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${searchTerm}`);
    } else {
      navigate('/products'); 
    }
  };

  const handleLogout = () => {
    if (window.confirm("Do you want to logout?")) {
      localStorage.removeItem('user');
      navigate('/login');
      window.location.reload();
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-main">
        {/* Brand Logo */}
        <div className="brand-box" onClick={() => navigate('/')} style={{cursor: 'pointer'}}>
          <div className="brand-logo">🛍️</div>
          <h1 className="brand-text">Brand</h1>
        </div>

        {/* SEARCH BAR FORM */}
        <form className="search-box" onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select className="category-select">
            <option>All category</option>
          </select>
          <button type="submit" className="search-btn">Search</button>
        </form>

        {/* Action Icons */}
        <div className="action-icons">
          <div className="action-item" onClick={() => user ? handleLogout() : navigate('/login')} style={{cursor: 'pointer'}}>
            <span className="icon">👤</span>
            <span className="text" style={{fontWeight: user ? 'bold' : 'normal'}}>
              {user ? user.name : "Sign in"}
            </span>
          </div>
          
          <div className="action-item" onClick={() => navigate('/cart')} style={{cursor: 'pointer'}}>
            <span className="icon">🛒</span>
            <span className="text">My cart</span>
          </div>
        </div>
      </div>

      {/* Secondary Menu */}
      <div className="navbar-menu-bottom">
        <div className="menu-links">
          <span className="menu-item">☰ All category</span>
          <span className="menu-item">Hot offers</span>
          <span className="menu-item">Gift boxes</span>
          <span className="menu-item">Projects</span>
        </div>
        <div className="menu-settings">
          <span className="menu-item">English, USD ⌄</span>
          <span className="menu-item">Ship to 🇩🇪 ⌄</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;