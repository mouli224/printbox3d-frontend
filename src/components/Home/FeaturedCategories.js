import React from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';

const categories = [
  {
    id: 1,
    name: 'Home Decor',
    description: 'Unique decorative pieces for your living space',
    image: '/assets/products/decorative_vase.jpg',
    link: '/shop?category=home-decor'
  },
  {
    id: 2,
    name: 'Gadgets & Accessories',
    description: 'Functional prints for everyday use',
    image: '/assets/products/desk_organizer.jpg',
    link: '/shop?category=gadgets'
  },
  {
    id: 3,
    name: 'Custom Orders',
    description: 'Bring your ideas to life with bespoke prints',
    image: '/assets/products/geometric_planter.jpg',
    link: '/custom-order'
  }
];

const FeaturedCategories = () => {
  return (
    <section className="featured-categories">
      <div className="container">
        <div className="section-header">
          <h2>Explore Our Collections</h2>
          <p>Discover quality 3D printed items across various categories</p>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
                <div className="category-overlay"></div>
              </div>
              <div className="category-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <span className="category-link-text">
                  View All
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
