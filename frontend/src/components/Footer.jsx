// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <h3>Subscribe on our newsletter</h3>
        <p>Get daily news on upcoming offers from many suppliers all over the world</p>
        <div className="news-input-box">
          <div className="input-with-icon">
            <span className="mail-icon">✉️</span>
            <input type="email" placeholder="Email" />
          </div>
          <button className="subscribe-btn">Subscribe</button>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="footer-container">
          <div className="footer-brand">
            <h2 className="f-logo">🛍️ Brand</h2>
            <p>Best information about the company gies here but now lorem ipsum is</p>
            <div className="f-socials">
              <span>f</span> <span>t</span> <span>in</span> <span>ig</span> <span>yt</span>
            </div>
          </div>
          
          <div className="f-links-grid">
            <div className="f-col"><h4>About</h4><p>About Us</p><p>Find store</p></div>
            <div className="f-col"><h4>Partnership</h4><p>About Us</p><p>Find store</p></div>
            <div className="f-col"><h4>Information</h4><p>Help Center</p><p>Refund</p></div>
            <div className="f-col"><h4>For users</h4><p>Login</p><p>Register</p></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container bottom-flex">
          <p>© 2026 Ecommerce.</p>
          <p>🇺🇸 English ⌄</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 