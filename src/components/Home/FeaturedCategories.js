import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedCategories.css';
import { categoryAPI } from '../../services/api';
import LazyImage from '../common/LazyImage';

const FeaturedCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await categoryAPI.getAll();
        
        // Filter out any existing Custom Orders category from backend
        const regularCategories = data.filter(cat => 
          cat.slug !== 'custom-order' && 
          cat.slug !== 'custom-orders' &&
          !cat.name.toLowerCase().includes('custom order')
        );
        
        // Map category slugs to actual product images
        const categoryImageMap = {
          'home-decor': '/assets/products/decorative-vase/decorative-vase.jpg',
          'accessories': '/assets/products/keychain/octopus-keychain.JPG',
          'gadgets': '/assets/products/phone-stand/phone-stand.jpg',
          'seasonal': '/assets/products/christmas-lamp/christmas-lamp-1.JPG',
          'fitness': '/assets/products/dumbell/dumbell-1.JPG'
        };
        
        // Take first 2 regular categories and add custom order
        const categoriesWithCustom = [
          ...regularCategories.slice(0, 2).map(cat => ({
            id: cat.id,
            name: cat.name,
            description: cat.description || `Explore our ${cat.name.toLowerCase()} collection`,
            image: categoryImageMap[cat.slug] || '/assets/products/phone-stand/phone-stand.jpg',
            link: `/shop?category=${cat.slug}`,
            slug: cat.slug
          })),
          {
            id: 'custom',
            name: 'Custom Orders',
            description: 'Bring your ideas to life with bespoke prints',
            image: '/assets/products/ganesh-idol/ganesh-idol.JPG',
            link: '/custom-order',
            slug: 'custom-order'
          }
        ];
        setCategories(categoriesWithCustom);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        // Fallback to default categories with actual images
        setCategories([
          {
            id: 1,
            name: 'Home Decor',
            description: 'Unique decorative pieces for your living space',
            image: '/assets/products/decorative-vase/decorative-vase.jpg',
            link: '/shop?category=home-decor'
          },
          {
            id: 2,
            name: 'Gadgets & Accessories',
            description: 'Functional prints for everyday use',
            image: '/assets/products/phone-stand/phone-stand.jpg',
            link: '/shop?category=gadgets'
          },
          {
            id: 3,
            name: 'Custom Orders',
            description: 'Bring your ideas to life with bespoke prints',
            image: '/assets/products/ganesh-idol/ganesh-idol.JPG',
            link: '/custom-order'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);
  if (loading) {
    return (
      <section className="featured-categories">
        <div className="container">
          <div className="section-header">
            <h2>Explore Our Collections</h2>
            <p>Loading categories...</p>
          </div>
        </div>
      </section>
    );
  }

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
                <LazyImage src={category.image} alt={category.name} className="category-img" />
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
