// backend/seed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected for Seeding'))
  .catch(err => console.log(err));

// Array of sample products matching our frontend UI
const sampleProducts = [
  {
    name: "Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    price: 98.00,
    image: "👕",
    description: "High quality cotton t-shirt for men. Perfect for summer wear.",
    category: "Clothing",
    stock: 150
  },
  {
    name: "GoPro HERO6 4K Action Camera - Black",
    price: 99.50,
    image: "📷",
    description: "Capture your adventures in 4K resolution with this waterproof action camera.",
    category: "Electronics",
    stock: 45
  },
  {
    name: "Apple iPhone 12 Pro Max",
    price: 99.50,
    image: "📱",
    description: "Super Retina XDR display, A14 Bionic chip, and Pro camera system.",
    category: "Electronics",
    stock: 30
  },
  {
    name: "Smartwatch Silver Color Modern",
    price: 32.00,
    image: "⌚",
    description: "Track your fitness and stay connected with this modern smartwatch.",
    category: "Electronics",
    stock: 100
  },
  {
    name: "Blue Jeans Shorts for Men",
    price: 32.00,
    image: "🩳",
    description: "Comfortable and stylish denim shorts for summer.",
    category: "Clothing",
    stock: 80
  },
  {
    name: "Headphones Pro Noise Cancelling",
    price: 32.00,
    image: "🎧",
    description: "Immersive sound with active noise cancellation technology.",
    category: "Electronics",
    stock: 60
  }
];

// Function to insert data into the database
const importData = async () => {
  try {
    // Clear existing data to avoid duplicates
    await Product.deleteMany(); 
    
    // Insert new sample products
    await Product.insertMany(sampleProducts);
    
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Run the function
importData();