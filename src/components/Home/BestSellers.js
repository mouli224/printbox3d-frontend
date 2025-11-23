import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';
import { productAPI } from '../../services/api';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        // Try to fetch best sellers, fallback to featured if not available
        let data;
        try {
          data = await productAPI.getBestSellers();
        } catch {
          data = await productAPI.getFeatured();
        }
        setProducts(data || []);
      } catch (err) {
        console.error('Failed to fetch featured products:', err);
        // Fallback to empty array
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="best-sellers">
        <div className="container">
          <div className="section-header">
            <h2>Popular Prints</h2>
            <p>Loading products...</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className="best-sellers">
      <div className="container">
        <div className="section-header">
          <h2>Popular Prints</h2>
          <p>Our best-selling 3D printed items</p>
        </div>

        <div className="products-grid">
          {products.length > 0 ? (
            products.map((product) => (
              <Link to={`/product/${product.slug}`} key={product.id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-badge">{product.category_name || product.category?.name}</div>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">₹{product.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No products available at the moment.</p>
          )}
        </div>

        <div className="view-all-container">
          <Link to="/shop" className="view-all-btn">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
