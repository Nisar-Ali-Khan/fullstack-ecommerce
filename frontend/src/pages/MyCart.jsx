// src/pages/MyCart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCart.css';

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. Function to fetch data from Backend
  const fetchCartData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cart');
      const data = await res.json();
      setCartItems(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch Error:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  // 2. Remove single item
  const removeItem = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${id}`, { method: 'DELETE' });
      fetchCartData(); // Refresh list
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  // 3. Checkout Logic (Clear all and show success)
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");

    // Real world app mein yahan 'Orders' collection mein data jata hai
    alert("🎉 Order Placed Successfully! Thank you for shopping with Brand.");

    // Simple way to clear cart for this session
    for (const item of cartItems) {
      await fetch(`http://localhost:5000/api/cart/${item._id}`, { method: 'DELETE' });
    }
    
    setCartItems([]);
    navigate('/'); // Go back to Home
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (loading) return <div className="cart-msg">Loading your cart...</div>;

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <h2>My cart ({cartItems.length})</h2>
        
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button className="checkout-btn" onClick={() => navigate('/products')} style={{width: '200px', marginTop: '20px'}}>
              Back to Shop
            </button>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left Side: Items List */}
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-card">
                  <div className="cart-img-box">{item.image}</div>
                  <div className="cart-details">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <button onClick={() => removeItem(item._id)} className="remove-btn">Remove</button>
                  </div>
                  <div className="cart-qty-price">
                    <p>Qty: {item.quantity}</p>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Side: Summary Card */}
            <aside className="cart-summary">
              <h3>Summary</h3>
              <div className="summary-details">
                <div className="sum-row"><span>Items ({cartItems.length}):</span> <span>${totalPrice.toFixed(2)}</span></div>
                <div className="sum-row"><span>Shipping:</span> <span style={{color: '#00b517'}}>FREE</span></div>
                <div className="sum-row"><span>Tax:</span> <span>$0.00</span></div>
                <hr />
                <div className="sum-total">
                  <span>Total Amount:</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </div>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
              <div className="payment-methods">
                <span>💳</span> <span>🅿️</span> <span>🏦</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;