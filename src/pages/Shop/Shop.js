import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';
import { productAPI } from '../../services/api';
import { getImageUrl } from '../../utils/imageUtils';

// Lazy loading image component
const LazyImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    let observer;
    
    if (imgRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.disconnect();
            }
          });
        },
        {
          rootMargin: '50px',
        }
      );
      observer.observe(imgRef.current);
    }

    return () => {
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
  }, [src]);

  return (
    <div ref={imgRef} className={className} style={{ position: 'relative', backgroundColor: '#f0f0f0' }}>
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          style={{
            opacity: imageLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onLoad={() => setImageLoaded(true)}
        />
      )}
      {!imageLoaded && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          animation: 'pulse 1.5s ease-in-out infinite'
        }}>
          <span style={{ color: '#999', fontSize: '0.9rem' }}>Loading...</span>
        </div>
      )}
    </div>
  );
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getAll({
          category: selectedCategory,
          material: selectedMaterial,
          sort: sortBy
        });
        setAllProducts(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
        // Fallback to empty array if backend is not available
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, selectedMaterial, sortBy]);

  // Products are already filtered and sorted by the backend
  const products = allProducts;

  if (loading) {
    return (
      <div className="shop-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shop-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p style={{ color: 'red' }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <div className="shop-header">
        <div className="container">
          <h1>Shop Our Collection</h1>
          <p>Explore our range of precision 3D printed products</p>
        </div>
      </div>

      <div className="container">
        <div className="shop-layout">
          <aside className="shop-sidebar">
            <div className="filter-section">
              <h3>Category</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>All Products</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value="home-decor"
                    checked={selectedCategory === 'home-decor'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>Home Decor</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value="gadgets"
                    checked={selectedCategory === 'gadgets'}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  />
                  <span>Gadgets & Accessories</span>
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h3>Material</h3>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="material"
                    value="all"
                    checked={selectedMaterial === 'all'}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />
                  <span>All Materials</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="material"
                    value="PLA"
                    checked={selectedMaterial === 'PLA'}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />
                  <span>PLA</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="material"
                    value="ABS"
                    checked={selectedMaterial === 'ABS'}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />
                  <span>ABS</span>
                </label>
                <label className="filter-option">
                  <input
                    type="radio"
                    name="material"
                    value="PETG"
                    checked={selectedMaterial === 'PETG'}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                  />
                  <span>PETG</span>
                </label>
              </div>
            </div>
          </aside>

          <div className="shop-main">
            <div className="shop-controls">
              <p className="results-count">{products.length} Products</p>
              <div className="sort-control">
                <label htmlFor="sort">Sort by:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="products-grid">
              {products.map((product) => (
                <Link to={`/product/${product.slug}`} key={product.id} className="product-card">
                  <div className="product-image">
                    <LazyImage src={getImageUrl(product.image, product.name, product.slug)} alt={product.name} />
                    <div className="product-overlay">
                      <span className="view-details">View Details</span>
                    </div>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-price">₹{product.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
