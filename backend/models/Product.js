// backend/models/Product.js
const mongoose = require('mongoose');

// Define the product schema based on week 2 requirements
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 10 }
});

module.exports = mongoose.model('Product', productSchema);