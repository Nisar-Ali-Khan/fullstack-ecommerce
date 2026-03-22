// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 

// Pages
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import MyCart from './pages/MyCart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        
        {/* Main Content Area */}
        <div className="content-area" style={{ minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/detail/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<MyCart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </div>

        <Footer /> 
      </div>
    </Router>
  );
}

export default App;