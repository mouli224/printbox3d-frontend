import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetail.css';

const productData = {
  1: { id: 1, name: 'Geometric Planter', price: 899, category: 'Home Decor', material: 'PLA', color: 'White', dimensions: '12cm x 12cm x 10cm', description: 'A modern geometric planter perfect for succulents and small plants. Made with premium PLA material for durability and aesthetic appeal.', image: '/assets/products/geometric_planter.jpg' },
  2: { id: 2, name: 'Phone Stand Pro', price: 599, category: 'Gadgets', material: 'ABS', color: 'Black', dimensions: '8cm x 7cm x 10cm', description: 'Ergonomic phone stand designed for optimal viewing angles. Sturdy ABS construction ensures stability for all phone sizes.', image: '/assets/products/phone_stand.jpg' },
  3: { id: 3, name: 'Modern Wall Art', price: 1299, category: 'Home Decor', material: 'PLA', color: 'Multiple', dimensions: '30cm x 30cm x 2cm', description: 'Contemporary geometric wall art piece that adds a modern touch to any space. Lightweight and easy to mount.', image: '/assets/products/modern_wall_art.jpg' }
};

const ProductDetail = () => {
  const { id } = useParams();
  const product = productData[id] || productData[1];
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="product-detail-page">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/shop">Shop</Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-image-section">
            <div className="main-image">
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className="product-info-section">
            <span className="product-category">{product.category}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₹{product.price}</p>

            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{product.material}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{product.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">{product.dimensions}</span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button onClick={() => handleQuantityChange(-1)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>+</button>
              </div>
            </div>

            <div className="product-actions">
              <button className="add-to-cart-btn">Add to Cart</button>
              <button className="buy-now-btn">Buy Now</button>
            </div>

            <div className="product-features">
              <div className="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>High Quality Materials</span>
              </div>
              <div className="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <span>Fast Shipping</span>
              </div>
              <div className="feature">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
                <span>Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>

        <div className="product-tabs">
          <div className="tabs-header">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="tabs-content">
            {activeTab === 'description' && (
              <div className="tab-panel">
                <p>{product.description}</p>
                <p>All our products are 3D printed with precision and care, ensuring the highest quality finish. Each item is inspected before shipping to guarantee your satisfaction.</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="tab-panel">
                <ul className="specs-list">
                  <li><strong>Material:</strong> {product.material} (Premium Grade)</li>
                  <li><strong>Color:</strong> {product.color}</li>
                  <li><strong>Dimensions:</strong> {product.dimensions}</li>
                  <li><strong>Weight:</strong> Approximately 150g</li>
                  <li><strong>Layer Height:</strong> 0.2mm for smooth finish</li>
                  <li><strong>Infill:</strong> 20% for optimal strength</li>
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="tab-panel">
                <h4>Shipping Information</h4>
                <p>We ship across India using reliable courier services. Orders are typically processed within 2-3 business days and delivered within 5-7 business days.</p>
                <h4>Returns & Refunds</h4>
                <p>We accept returns within 7 days of delivery if the product is damaged or defective. Please contact our customer support for assistance with returns.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
