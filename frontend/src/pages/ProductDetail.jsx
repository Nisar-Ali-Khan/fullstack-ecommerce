import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === "undefined") {
      setError("Invalid Product ID");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Product not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const addToCart = () => {
    if (!product) return;
    fetch('http://localhost:5000/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.image
      })
    })
    .then(() => {
      alert("Added to Cart!");
      navigate('/cart');
    });
  };

  if (loading) return <div style={{padding: '100px', textAlign: 'center'}}>Loading...</div>;
  if (error || !product) return <div style={{padding: '100px', textAlign: 'center', color: 'red'}}>Error: {error}</div>;

  return (
    <div className="pd-page-wrapper">
      <div className="pd-breadcrumbs">
        Home &gt; Clothings &gt; Men's wear &gt; {product.category || 'Summer clothing'}
      </div>

      {/* 1. TOP MAIN CARD */}
      <div className="pd-top-card">
        <div className="pd-gallery">
          <div className="pd-main-img"><span style={{fontSize: '8rem'}}>{product.image}</span></div>
          <div className="pd-thumbs">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`pd-thumb ${i === 1 ? 'active' : ''}`}>{product.image}</div>
            ))}
          </div>
        </div>

        <div className="pd-details-box">
          <p className="pd-stock-text">✓ In stock</p>
          <h1 className="pd-title">{product.name}</h1>
          <div className="pd-ratings-row">
            <span className="pd-stars">⭐⭐⭐⭐⭐</span> <span className="pd-score">9.3</span>
            <span className="pd-dot">•</span> <span className="pd-gray-text">32 reviews</span>
            <span className="pd-dot">•</span> <span className="pd-gray-text">154 sold</span>
          </div>
          <div className="pd-price-tiers">
            <div className="pd-tier active-tier"><h3>${(product.price).toFixed(2)}</h3><p>50-100 pcs</p></div>
            <div className="pd-tier"><h3>${(product.price * 0.9).toFixed(2)}</h3><p>100-700 pcs</p></div>
            <div className="pd-tier border-none"><h3>${(product.price * 0.8).toFixed(2)}</h3><p>700+ pcs</p></div>
          </div>
          <div className="pd-specs-list">
             <div className="pd-spec-item"><span>Price:</span> Negotiable</div>
             <div className="pd-spec-item"><span>Type:</span> {product.category}</div>
             <div className="pd-spec-item"><span>Material:</span> Cotton</div>
          </div>
        </div>

        <div className="pd-supplier-box">
          <div className="pd-sup-header">
            <div className="pd-sup-logo">R</div>
            <div><p className="pd-sup-label">Supplier</p><p className="pd-sup-name">Guanjoi Trading LLC</p></div>
          </div>
          <hr className="pd-line"/>
          <ul className="pd-sup-info">
            <li>🇩🇪 Germany, Berlin</li>
            <li>🛡️ Verified Seller</li>
            <li>🌐 Worldwide shipping</li>
          </ul>
          <button className="pd-btn-blue" onClick={addToCart}>Add to Cart</button>
          <button className="pd-btn-white">Seller's profile</button>
          <div className="pd-save-later"><button className="btn-heart">♡ Save for later</button></div>
        </div>
      </div>

      {/* 2. MIDDLE SECTION */}
      <div className="pd-mid-section">
        <div className="pd-tabs-card">
          <div className="pd-tabs-header"><span className="pd-tab active">Description</span><span className="pd-tab">Reviews</span></div>
          <div className="pd-tab-body">
            <p>{product.description}</p>
          </div>
        </div>

        <div className="pd-you-may-like">
          <h4>You may like</h4>
          {[1, 2, 3].map(i => (
            <div key={i} className="pd-yml-item">
              <div className="pd-yml-img">👕</div>
              <div className="pd-yml-info"><p>Men Blazers</p><strong>$7.00</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. RELATED PRODUCTS (As per your image_520e7d.png) */}
      <div className="pd-related-card">
        <h4>Related products</h4>
        <div className="pd-related-grid">
          {[
            { n: "Xiaomi Redmi 8", p: "$32.00", i: "📱" },
            { n: "Smartwatch", p: "$40.00", i: "⌚" },
            { n: "Headphones", p: "$15.00", i: "🎧" },
            { n: "Jeans Shorts", p: "$22.00", i: "🩳" },
            { n: "Electric Kettle", p: "$20.00", i: "☕" },
            { n: "Wallet", p: "$10.00", i: "👛" }
          ].map((item, idx) => (
            <div key={idx} className="pd-rel-item">
              <div className="pd-rel-img">{item.i}</div>
              <p className="pd-rel-name">{item.n}</p>
              <p className="pd-rel-price">{item.p}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. BLUE DISCOUNT BANNER (As per image) */}
      <div className="pd-discount-banner">
        <div className="pd-banner-text">
          <h2>Super discount on more than 100 USD</h2>
          <p>Have you ever finally just write dummy info</p>
        </div>
        <button className="pd-btn-orange">Shop now</button>
      </div>

      {/* 5. FOOTER (As per image)
      <footer className="pd-footer">
        <div className="footer-top">
          <div className="footer-col-brand">
            <h3 className="footer-logo">🛍️ Brand</h3>
            <p>Best information about the company gies here but now lorem ipsum is</p>
            <div className="social-icons"><span>f</span> <span>t</span> <span>in</span> <span>ig</span></div>
          </div>
          <div className="footer-links">
            <div className="f-col"><h4>About</h4><p>About Us</p><p>Find store</p></div>
            <div className="f-col"><h4>Partnership</h4><p>About Us</p><p>Find store</p></div>
            <div className="f-col"><h4>Information</h4><p>Help Center</p><p>Refund</p></div>
            <div className="f-col"><h4>For users</h4><p>Login</p><p>Register</p></div>
            <div className="f-col"><h4>Get app</h4><div className="app-btn">App Store</div><div className="app-btn">Google Play</div></div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2023 Ecommerce.</p>
          <p>🇺🇸 English ⌄</p>
        </div>
      </footer> */}
    </div>
  );
};

export default ProductDetail;