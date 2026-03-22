// src/components/ProductCard.jsx
import React from 'react';

// Hum 'product' prop receive kar rahe hain
const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
        {/* Agar database se image URL aaye toh <img> tag use karenge, abhi emoji use kar rahe hain */}
        {product.image} 
      </div>
      <div className="product-details">
        <h4>${product.price.toFixed(2)}</h4>
        <p>{product.name}</p>
      </div>
    </div>
  );
};

export default ProductCard;