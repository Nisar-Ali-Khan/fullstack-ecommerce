const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. MongoDB Connection
const mongoURI = 'mongodb://127.0.0.1:27017/ecommerce_db'; 
mongoose.connect(mongoURI)
  .then(() => console.log("✅ MongoDB Connected & Ready"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// 2. Models
const Product = mongoose.model('Product', new mongoose.Schema({ 
  name: String, 
  price: Number, 
  image: String, 
  category: String, 
  description: String 
}));

const Cart = mongoose.model('Cart', new mongoose.Schema({ 
  productId: String, 
  name: String, 
  price: Number, 
  image: String, 
  quantity: { type: Number, default: 1 } 
}));

const User = mongoose.model('User', new mongoose.Schema({ 
  name: String, 
  email: { type: String, unique: true }, 
  password: { type: String } 
}));

// --- 3. ADMIN STATS ROUTE ---
app.get('/api/admin/stats', async (req, res) => {
  try {
    const pCount = await Product.countDocuments();
    const uCount = await User.countDocuments();
    const cCount = await Cart.countDocuments();
    res.json({ products: pCount, users: uCount, cart: cCount });
  } catch (err) { res.status(500).json({ error: "Stats failed" }); }
});

// --- 4. PRODUCT ROUTES (Search, Filter, All) ---

// Search API (Regex based)
app.get('/api/products/search', async (req, res) => {
  try {
    const { q } = req.query;
    const filtered = await Product.find({ name: { $regex: q, $options: 'i' } });
    res.json(filtered);
  } catch (err) { res.status(500).json({ error: "Search failed" }); }
});

// Get All Products + Price Filters
app.get('/api/products', async (req, res) => {
  try {
    const { min, max } = req.query;
    let query = {};
    if (min || max) {
      query.price = {};
      if (min) query.price.$gte = Number(min);
      if (max) query.price.$lte = Number(max);
    }
    const products = await Product.find(query);
    res.json(products);
  } catch (err) { res.status(500).json({ error: "Fetch failed" }); }
});

// Add New Product (Admin)
app.post('/api/products', async (req, res) => {
  try {
    const newP = new Product(req.body);
    await newP.save();
    res.status(201).json(newP);
  } catch (err) { res.status(500).json({ error: "Add failed" }); }
});

// Delete Product (Admin)
app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product Deleted" });
  } catch (err) { res.status(500).json({ error: "Delete failed" }); }
});

// --- 5. AUTH ROUTES ---
app.post('/api/signup', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json({ message: "User Registered Successfully" });
  } catch (err) { res.status(400).json({ message: "Email already exists" }); }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) res.json({ user }); 
    else res.status(401).json({ message: "Invalid email or password" });
  } catch (err) { res.status(500).json({ error: "Login failed" }); }
});

// --- 6. CART ROUTES ---
app.get('/api/cart', async (req, res) => res.json(await Cart.find()));

app.post('/api/cart', async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;
    let item = await Cart.findOne({ productId });
    if (item) {
      item.quantity += 1;
      await item.save();
    } else {
      item = new Cart({ productId, name, price, image, quantity: 1 });
      await item.save();
    }
    res.json(item);
  } catch (err) { res.status(500).json(err); }
});

app.delete('/api/cart/:id', async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ message: "Removed from cart" });
  } catch (err) { res.status(500).json(err); }
});

app.listen(PORT, () => console.log(`🚀 Backend running on: http://localhost:${PORT}`));