import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Shop.css';

const allProducts = [
  { id: 1, name: 'Geometric Planter', price: 899, category: 'home-decor', material: 'PLA', image: '/assets/products/geometric_planter.jpg' },
  { id: 2, name: 'Phone Stand Pro', price: 599, category: 'gadgets', material: 'ABS', image: '/assets/products/phone_stand.jpg' },
  { id: 3, name: 'Modern Wall Art', price: 1299, category: 'home-decor', material: 'PLA', image: '/assets/products/modern_wall_art.jpg' },
  { id: 4, name: 'Cable Organizer Set', price: 449, category: 'gadgets', material: 'PLA', image: '/assets/products/cable_organizer.jpg' },
  { id: 5, name: 'Desk Organizer', price: 799, category: 'gadgets', material: 'ABS', image: '/assets/products/desk_organizer.jpg' },
  { id: 6, name: 'Decorative Vase', price: 1099, category: 'home-decor', material: 'PLA', image: '/assets/products/decorative_vase.jpg' },
  { id: 7, name: 'Laptop Stand', price: 1499, category: 'gadgets', material: 'ABS', image: '/assets/products/laptop_stand.jpg' },
  { id: 8, name: 'Wall Shelf', price: 1799, category: 'home-decor', material: 'PETG', image: '/assets/products/wall_shelf.jpg' },
  { id: 9, name: 'Headphone Stand', price: 699, category: 'gadgets', material: 'PLA', image: '/assets/products/headphone_stand.jpg' }
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const filterProducts = () => {
    let filtered = [...allProducts];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedMaterial !== 'all') {
      filtered = filtered.filter(p => p.material === selectedMaterial);
    }

    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  };

  const products = filterProducts();

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
                <Link to={`/product/${product.id}`} key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
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
