// src/pages/Cart.jsx
import React, { useState } from 'react';
import './Cart.css';

const Cart = () => {
  // State for Cart Items (Dynamic Data)
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "T-shirts with multiple colors, for men and lady", price: 78.99, qty: 1, img: "👕", size: "medium", color: "blue", seller: "Artel Market" },
    { id: 2, name: "Solid Backpack blue jeans large size", price: 39.00, qty: 1, img: "🎒", size: "medium", color: "blue", seller: "Best factory LLC" },
    { id: 3, name: "Water boiler black for kitchen, 1200 Watt", price: 170.50, qty: 1, img: "☕", size: "medium", color: "black", seller: "Artel Market" }
  ]);

  // State for Saved Items
  const [savedItems, setSavedItems] = useState([
    { id: 4, name: "GoPro HERO6 4K Action Camera - Black", price: 99.50, img: "📷" },
    { id: 5, name: "Smartwatch silver color modern", price: 99.50, img: "⌚" },
    { id: 6, name: "Apple iPhone 12 Pro Max", price: 99.50, img: "📱" },
    { id: 7, name: "Macbook Pro 16 inch", price: 99.50, img: "💻" }
  ]);

  // Function to change quantity (+ or -)
  const updateQty = (id, amount) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQty = item.qty + amount;
        return { ...item, qty: newQty > 0 ? newQty : 1 }; // Prevents going below 1
      }
      return item;
    }));
  };

  // Function to remove an item completely
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Function to move item from Cart to 'Saved for Later'
  const saveForLater = (item) => {
    removeItem(item.id); // Remove from cart
    setSavedItems([...savedItems, { id: item.id, name: item.name, price: item.price, img: item.img }]); // Add to saved
  };

  // Function to move item from 'Saved for Later' back to Cart
  const moveToCart = (item) => {
    setSavedItems(savedItems.filter(saved => saved.id !== item.id)); // Remove from saved
    setCartItems([...cartItems, { ...item, qty: 1, size: "Default", color: "Default", seller: "Various" }]); // Add to cart
  };

  // Function to clear entire cart
  const clearAll = () => {
    setCartItems([]);
  };

  // Calculations for Order Summary
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const discount = subtotal > 200 ? 60 : 0; // $60 discount if subtotal > $200
  const tax = subtotal * 0.05; // 5% tax assumption
  const finalTotal = subtotal - discount + tax;

  return (
    <div className="cart-page-container">
      <h2 className="cart-page-title">My cart ({cartItems.length})</h2>

      <div className="cart-layout">
        
        {/* LEFT COLUMN: Cart Items */}
        <div className="cart-items-section">
          <div className="cart-items-list">
            
            {cartItems.length === 0 ? (
              <div className="empty-cart-msg">Your cart is empty.</div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-img">{item.img}</div>
                  
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="item-specs">Size: {item.size}, Color: {item.color}</p>
                    <p className="item-seller">Seller: {item.seller}</p>
                    
                    <div className="cart-item-actions">
                      <button onClick={() => removeItem(item.id)} className="btn-text-red">Remove</button>
                      <button onClick={() => saveForLater(item)} className="btn-text-blue">Save for later</button>
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    <div className="qty-selector">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <input type="text" value={item.qty} readOnly />
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Bottom Actions */}
            <div className="cart-bottom-actions">
              <button className="btn-primary-blue-outline">← Back to shop</button>
              <button onClick={clearAll} className="btn-white-outline text-red">Remove all</button>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="trust-badges">
            <div className="badge-item">🔒 <div><strong>Secure payment</strong><br/>Have you ever finally just</div></div>
            <div className="badge-item">💬 <div><strong>Customer support</strong><br/>Have you ever finally just</div></div>
            <div className="badge-item">🚚 <div><strong>Free delivery</strong><br/>Have you ever finally just</div></div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <aside className="cart-summary-section">
          
          <div className="coupon-box">
            <p className="coupon-title">Have a coupon?</p>
            <div className="coupon-input-group">
              <input type="text" placeholder="Add coupon" />
              <button className="btn-apply text-blue">Apply</button>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row text-red">
              <span>Discount:</span>
              <span>- ${discount.toFixed(2)}</span>
            </div>
            <div className="summary-row text-green">
              <span>Tax:</span>
              <span>+ ${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="summary-row total-row">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            <button className="btn-checkout">Checkout ({cartItems.length} items)</button>
            
            <div className="payment-icons">
              💳 💲 🏦 🪙
            </div>
          </div>

        </aside>
      </div>

      {/* SAVED FOR LATER SECTION */}
      <section className="cart-saved-section">
        <h3>Saved for later</h3>
        <div className="saved-items-grid">
          {savedItems.map(item => (
            <div key={item.id} className="saved-item-card">
              <div className="saved-img">{item.img}</div>
              <p className="saved-price">${item.price.toFixed(2)}</p>
              <p className="saved-name">{item.name}</p>
              <button onClick={() => moveToCart(item)} className="btn-move-to-cart">
                🛒 Move to cart
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Cart;