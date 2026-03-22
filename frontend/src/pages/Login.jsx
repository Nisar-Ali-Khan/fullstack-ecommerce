// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.user) {
        alert("Login Successful! Welcome " + data.user.name);
        // Save user info in browser (Local Storage)
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/'); // Go to Home
      } else {
        alert(data.message);
      }
    })
    .catch(err => alert("Login Error"));
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <h2>Sign In</h2>
        <input 
          type="email" 
          placeholder="Email address" 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <p onClick={() => navigate('/signup')}>Don't have an account? Register</p>
      </form>
    </div>
  );
};

export default Login;