import React from 'react';
import { Link } from 'react-router-dom';
import './BestSellers.css';

const products = [
  {
    id: 1,
    name: 'Geometric Planter',
    price: '₹899',
    image: '/assets/products/geometric_planter.jpg',
    category: 'Home Decor'
  },
  {
    id: 2,
    name: 'Phone Stand Pro',
    price: '₹599',
    image: '/assets/products/phone_stand.jpg',
    category: 'Gadgets'
  },
  {
    id: 3,
    name: 'Modern Wall Art',
    price: '₹1,299',
    image: '/assets/products/modern_wall_art.jpg',
    category: 'Home Decor'
  },
  {
    id: 4,
    name: 'Cable Organizer Set',
    price: '₹449',
    image: '/assets/products/cable_organizer.jpg',
    category: 'Gadgets'
  },
  {
    id: 5,
    name: 'Desk Organizer',
    price: '₹799',
    image: '/assets/products/desk_organizer.jpg',
    category: 'Gadgets'
  },
  {
    id: 6,
    name: 'Decorative Vase',
    price: '₹1,099',
    image: '/assets/products/decorative_vase.jpg',
    category: 'Home Decor'
  }
];

const BestSellers = () => {
  return (
    <section className="best-sellers">
      <div className="container">
        <div className="section-header">
          <h2>Popular Prints</h2>
          <p>Our best-selling 3D printed items</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">{product.category}</div>
              </div>
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">{product.price}</p>
              </div>
            </Link>
          ))}
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
