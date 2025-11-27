import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetail.css';
import { productAPI } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { getImageUrl, getProductImages } from '../../utils/imageUtils';

const ProductDetail = () => {
  const { id: slug } = useParams(); // The URL parameter is actually a slug
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [productImages, setProductImages] = useState([]);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch product from backend using slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getBySlug(slug);
        setProduct(data);
        
        // Get all product images
        const images = getProductImages(data.slug);
        setProductImages(images);
        setSelectedImage(0);
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock_quantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product.is_available) {
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product.is_available) {
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart(product, quantity);
      navigate('/cart');
    } catch (error) {
      console.error('Failed to proceed:', error);
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: 'red' }}>{error || 'Product not found'}</p>
            <Link to="/shop" style={{ marginTop: '20px', display: 'inline-block' }}>
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
              <img 
                src={productImages[selectedImage]} 
                alt={`${product.name} - Image ${selectedImage + 1}`}
                onError={(e) => {
                  e.target.src = '/assets/products/phone-stand/phone-stand.jpg';
                }}
              />
            </div>
            {productImages.length > 1 && (
              <div className="image-thumbnails">
                {productImages.map((img, index) => (
                  <div
                    key={index}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} thumbnail ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="product-info-section">
            <span className="product-category">{product.category?.name || product.category_name}</span>
            <h1 className="product-title">{product.name}</h1>
            <p className="product-price">₹{product.price}</p>

            <div className="product-specs">
              <div className="spec-item">
                <span className="spec-label">Material:</span>
                <span className="spec-value">{product.material?.name || product.material_name}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{product.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Dimensions:</span>
                <span className="spec-value">{product.dimensions}</span>
              </div>
              {product.weight && (
                <div className="spec-item">
                  <span className="spec-label">Weight:</span>
                  <span className="spec-value">{product.weight}g</span>
                </div>
              )}
              <div className="spec-item">
                <span className="spec-label">Stock:</span>
                <span className="spec-value">
                  {product.is_available 
                    ? `${product.stock_quantity} available` 
                    : 'Out of stock'}
                </span>
              </div>
            </div>

            <div className="quantity-selector">
              <label>Quantity:</label>
              <div className="quantity-controls">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || !product.is_available}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock_quantity || !product.is_available}
                >
                  +
                </button>
              </div>
            </div>

            <div className="product-actions">
              <button 
                className="add-to-cart-btn" 
                onClick={handleAddToCart}
                disabled={addingToCart || !product.is_available}
              >
                {addingToCart ? 'Added! ✓' : product.is_available ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button 
                className="buy-now-btn"
                onClick={handleBuyNow}
                disabled={addingToCart || !product.is_available}
              >
                {product.is_available ? 'Buy Now' : 'Out of Stock'}
              </button>
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
                  <li><strong>Material:</strong> {product.material?.name || product.material_name} (Premium Grade)</li>
                  {product.material?.description && (
                    <li><strong>Material Info:</strong> {product.material.description}</li>
                  )}
                  {product.material?.properties && (
                    <li><strong>Properties:</strong> {product.material.properties}</li>
                  )}
                  <li><strong>Color:</strong> {product.color}</li>
                  <li><strong>Dimensions:</strong> {product.dimensions}</li>
                  {product.weight && (
                    <li><strong>Weight:</strong> {product.weight}g</li>
                  )}
                  <li><strong>Stock Quantity:</strong> {product.stock_quantity}</li>
                  <li><strong>Availability:</strong> {product.is_available ? 'In Stock' : 'Out of Stock'}</li>
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
