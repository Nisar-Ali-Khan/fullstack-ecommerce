// src/components/ProductCard.jsx
import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-image-placeholder">
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