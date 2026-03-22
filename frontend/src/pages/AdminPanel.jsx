import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [products, setProducts] = useState([]);
  const [stats, setStats] = useState({ products: 0, users: 0, cart: 0 });
  const [formData, setFormData] = useState({ name: '', price: '', category: '', image: '', description: '' });

  // SECURITY CHECK
  useEffect(() => {
    if (!user || user.email !== 'ali@admin.com') {
      alert("Access Denied! Admins only.");
      navigate('/');
    } else {
      loadData();
    }
  }, []);

  const loadData = () => {
    // Get Products
    fetch('http://localhost:5000/api/products').then(res => res.json()).then(setProducts);
    // Get Stats
    fetch('http://localhost:5000/api/admin/stats').then(res => res.json()).then(setStats);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(() => {
      alert("Added!");
      setFormData({ name: '', price: '', category: '', image: '', description: '' });
      loadData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' }).then(() => loadData());
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user?.name}</p>
      </header>

      {/* STATS CARDS */}
      <div className="stats-grid">
        <div className="stat-card"><h3>📦 {stats.products}</h3><p>Total Products</p></div>
        <div className="stat-card"><h3>👥 {stats.users}</h3><p>Registered Users</p></div>
        <div className="stat-card"><h3>🛒 {stats.cart}</h3><p>Items in Carts</p></div>
      </div>

      <div className="admin-main-grid">
        {/* ADD PRODUCT FORM */}
        <section className="admin-card">
          <h2>Add New Item</h2>
          <form onSubmit={handleAdd} className="admin-form">
            <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
            <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <input type="text" placeholder="Category" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} required />
            <input type="text" placeholder="Image Emoji/Link" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} required />
            <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
            <button type="submit" className="save-btn">Save Product</button>
          </form>
        </section>

        {/* PRODUCT LIST TABLE */}
        <section className="admin-card">
          <h2>Product Inventory</h2>
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr><th>Img</th><th>Name</th><th>Price</th><th>Action</th></tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p._id}>
                    <td>{p.image}</td>
                    <td>{p.name}</td>
                    <td>${p.price}</td>
                    <td><button onClick={() => handleDelete(p._id)} className="del-btn">🗑️</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;