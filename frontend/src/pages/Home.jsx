// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // Fetch data from backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(response => response.json())
      .then(data => setRecommendedProducts(data.slice(0, 10))) 
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="home-wrapper">
      
      {/* Container for main content */}
      <div className="home-page-container">
        
        {/* 1. HERO SECTION */}
        <section className="hero-grid">
          <aside className="side-menu">
            <ul>
              <li className="active">Automobiles</li>
              <li>Clothes and wear</li>
              <li>Home interiors</li>
              <li>Computer and tech</li>
              <li>Tools, equipments</li>
              <li>Sports and outdoor</li>
              <li>Animal and pets</li>
              <li>Machinery tools</li>
              <li>More category</li>
            </ul>
          </aside>
          
          <div className="main-hero-banner">
            <div className="banner-content">
              <p className="banner-subtitle">Latest trending</p>
              <h2 className="banner-title">Electronic items</h2>
              <button className="btn-main">Learn more</button>
            </div>
          </div>

          <aside className="user-status">
            <div className="status-card blue-card">
              <div className="user-info">
                <span className="avatar-icon">👤</span>
                <span>Hi, user<br/>let's get started</span>
              </div>
              <button className="btn-primary-sm">Join now</button>
              <button className="btn-white-sm">Log in</button>
            </div>
            <div className="status-card orange-card"><p>Get US $10 off<br/>with a new<br/>supplier</p></div>
            <div className="status-card teal-card"><p>Send quotes with<br/>supplier<br/>preferences</p></div>
          </aside>
        </section>

        {/* 2. DEALS AND OFFERS */}
        <section className="deals-section">
          <div className="deals-timer-box">
            <h3>Deals and offers</h3>
            <p>Hygiene equipments</p>
            <div className="timer-row">
              <div className="time-block"><strong>04</strong><span>Days</span></div>
              <div className="time-block"><strong>13</strong><span>Hour</span></div>
              <div className="time-block"><strong>34</strong><span>Min</span></div>
              <div className="time-block"><strong>56</strong><span>Sec</span></div>
            </div>
          </div>
          <div className="deals-items">
            {[
              { img: "⌚", name: "Smart watches", discount: "-25%" },
              { img: "💻", name: "Laptops", discount: "-15%" },
              { img: "📷", name: "GoPro cameras", discount: "-40%" },
              { img: "🎧", name: "Headphones", discount: "-25%" },
              { img: "📱", name: "Canon cameras", discount: "-25%" }
            ].map((item, index) => (
              <div key={index} className="deal-card">
                <div className="deal-img">{item.img}</div>
                <p className="deal-name">{item.name}</p>
                <span className="deal-badge">{item.discount}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. HOME AND OUTDOOR */}
        <section className="category-block">
          <div className="cat-banner home-banner">
            <div>
              <h3>Home and<br/>outdoor</h3>
              <button className="btn-source">Source now</button>
            </div>
          </div>
          <div className="cat-grid">
            {[
              { name: "Soft chairs", price: "19", img: "🪑" },
              { name: "Sofa & chair", price: "19", img: "🛋️" },
              { name: "Kitchen dishes", price: "19", img: "🍽️" },
              { name: "Smart watches", price: "19", img: "🏺" },
              { name: "Kitchen mixer", price: "100", img: "🍲" },
              { name: "Blenders", price: "39", img: "🥤" },
              { name: "Home appliance", price: "19", img: "📻" },
              { name: "Coffee maker", price: "10", img: "🪴" }
            ].map((item, idx) => (
              <div key={idx} className="cat-item">
                <div className="cat-text">
                  <p>{item.name}</p>
                  <span>From<br/>USD {item.price}</span>
                </div>
                <div className="cat-img">{item.img}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CONSUMER ELECTRONICS */}
        <section className="category-block">
          <div className="cat-banner elec-banner">
            <div>
              <h3>Consumer<br/>electronics and<br/>gadgets</h3>
              <button className="btn-source">Source now</button>
            </div>
          </div>
          <div className="cat-grid">
            {[
              { name: "Smart watches", price: "19", img: "⌚" },
              { name: "Cameras", price: "89", img: "📷" },
              { name: "Headphones", price: "10", img: "🎧" },
              { name: "Smart watches", price: "90", img: "☕" },
              { name: "Gaming set", price: "35", img: "🎮" },
              { name: "Laptops & PC", price: "340", img: "💻" },
              { name: "Smartphones", price: "19", img: "📱" },
              { name: "Electric kettle", price: "240", img: "📻" }
            ].map((item, idx) => (
              <div key={idx} className="cat-item">
                <div className="cat-text">
                  <p>{item.name}</p>
                  <span>From<br/>USD {item.price}</span>
                </div>
                <div className="cat-img">{item.img}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. INQUIRY BANNER */}
        <section className="inquiry-banner">
          <div className="inquiry-text">
            <h2>An easy way to send<br/>requests to all suppliers</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing<br/>elit, sed do eiusmod tempor incididunt.</p>
          </div>
          <div className="inquiry-form">
            <h3>Send quote to suppliers</h3>
            <input type="text" placeholder="What item you need?" className="form-input" />
            <textarea placeholder="Type more details" className="form-textarea"></textarea>
            <div className="form-row">
              <input type="text" placeholder="Quantity" className="form-input half-input" />
              <select className="form-select half-input">
                <option>Pcs</option>
              </select>
            </div>
            <button className="btn-send-inquiry">Send inquiry</button>
          </div>
        </section>

        {/* 6. DYNAMIC RECOMMENDED ITEMS */}
        <section className="rec-section">
          <h3 className="section-title">Recommended items</h3>
          <div className="rec-grid">
            {[
              { img: "👕", price: "$10.30", title: "T-shirts with multiple colors, for men" },
              { img: "🧥", price: "$10.30", title: "Jeans shorts for men blue color" },
              { img: "👔", price: "$12.50", title: "Brown winter coat medium size" },
              { img: "📘", price: "$34.00", title: "Jeans bag for travel for men" },
              { img: "🎒", price: "$99.00", title: "Leather wallet" },
              { img: "🩳", price: "$9.99", title: "Canon camera black, 100x zoom" },
              { img: "🎧", price: "$8.99", title: "Headset for gaming with mic" },
              { img: "⌚", price: "$10.30", title: "Smartwatch silver color modern" },
              { img: "🏺", price: "$10.30", title: "Blue wallet for men leather metarfial" },
              { img: "☕", price: "$80.95", title: "Jeans bag for travel for men" }
            ].map((item, index) => {
               const dbItem = recommendedProducts[index]; 
               return (
                <div key={index} className="rec-card" onClick={() => navigate(`/detail/${dbItem ? dbItem._id : item._id}`)} style={{ cursor: 'pointer' }}>
                  <div className="rec-img-box">{dbItem ? dbItem.image : item.img}</div>
                  <div className="rec-info">
                    <p className="rec-price">{dbItem ? `$${dbItem.price.toFixed(2)}` : item.price}</p>
                    <p className="rec-name">{dbItem ? dbItem.name : item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 7. OUR EXTRA SERVICES */}
        <section className="extra-services">
          <h3 className="section-title">Our extra services</h3>
          <div className="services-grid">
            {[
              { bg: "#2a3d54", icon: "🔍", text: "Source from\nIndustry Hubs" },
              { bg: "#912349", icon: "📦", text: "Customize Your\nProducts" },
              { bg: "#4a789c", icon: "✈️", text: "Fast, reliable shipping\nby ocean or air" },
              { bg: "#4b5d6e", icon: "🛡️", text: "Product monitoring\nand inspection" }
            ].map((srv, i) => (
              <div key={i} className="service-card">
                <div className="service-img" style={{backgroundColor: srv.bg}}></div>
                <div className="service-icon">{srv.icon}</div>
                <div className="service-text">{srv.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* 8. SUPPLIERS BY REGION */}
        <section className="suppliers-region">
          <h3 className="section-title">Suppliers by region</h3>
          <div className="suppliers-grid">
            {[
              { flag: "🇦🇪", name: "Arabic Emirates", url: "shopname.ae" },
              { flag: "🇦🇺", name: "Australia", url: "shopname.ae" },
              { flag: "🇺🇸", name: "United States", url: "shopname.ae" },
              { flag: "🇷🇺", name: "Russia", url: "shopname.ru" },
              { flag: "🇮🇹", name: "Italy", url: "shopname.it" },
              { flag: "🇩🇰", name: "Denmark", url: "denmark.com.dk" },
              { flag: "🇫🇷", name: "France", url: "shopname.com.fr" },
              { flag: "🇦🇪", name: "Arabic Emirates", url: "shopname.ae" },
              { flag: "🇨🇳", name: "China", url: "shopname.ae" },
              { flag: "🇬🇧", name: "Great Britain", url: "shopname.co.uk" }
            ].map((sup, i) => (
              <div key={i} className="supplier-item">
                <span className="sup-flag">{sup.flag}</span>
                <div className="sup-info">
                  <strong>{sup.name}</strong>
                  <span>{sup.url}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div> 
      {/* End of .home-page-container */}

    </div> // End of home-wrapper
  );
};

export default Home;