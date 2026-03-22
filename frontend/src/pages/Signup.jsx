import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      if (data.user) navigate('/login');
    });
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <input type="text" placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Sign Up</button>
        <p onClick={() => navigate('/login')}>Already have an account? Login</p>
      </form>
    </div>
  );
};

export default Signup;