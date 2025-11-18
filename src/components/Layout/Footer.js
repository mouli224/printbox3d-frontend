import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter signup
    alert(`Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">
              <img src="/assets/logo/placeholder.png" alt="PrintBox3D Logo" className="footer-logo-image" onError={(e) => {e.target.style.display='none'}} />
              <span className="logo-text">PrintBox</span>
              <span className="logo-accent">3D</span>
            </h3>
            <p className="footer-description">
              Custom 3D printed creations. Where ideas take shape in 3D.
            </p>
            <div className="social-icons">
              <a href="https://www.instagram.com/printbox3d.official/" aria-label="Instagram" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1ZnfWXv5Vk/" aria-label="Facebook" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.threads.com/@printbox3d.official" aria-label="Threads" className="social-icon" target="_blank" rel="noopener noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.186 3.998c-2.464 0-4.489.878-5.674 2.474l1.322 1.054c.905-1.213 2.374-1.835 4.352-1.835 1.488 0 2.694.395 3.396 1.113.589.603.881 1.392.881 2.402v.116c-1.043-.43-2.287-.647-3.693-.647-1.917 0-3.512.412-4.61 1.191-1.152.818-1.736 1.989-1.736 3.48 0 1.415.556 2.563 1.654 3.414 1.098.85 2.534 1.28 4.271 1.28 1.99 0 3.577-.645 4.72-1.92.547-.61.943-1.298 1.182-2.048.195.635.297 1.31.297 2.02v.41h1.737v-.41c0-1.385-.288-2.564-.857-3.509-.546-.908-1.334-1.629-2.345-2.147-.993-.508-2.157-.766-3.468-.766zm-.008 5.355c1.237 0 2.332.184 3.26.548-.006 1.634-.56 2.924-1.651 3.836-.993.83-2.296 1.246-3.87 1.246-1.274 0-2.32-.282-3.108-.838-.755-.533-1.137-1.249-1.137-2.13 0-.898.404-1.594 1.202-2.07.797-.475 1.923-.716 3.349-.716l1.955.124z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/custom-order">Custom Order</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/shipping">Shipping Info</Link></li>
              <li><Link to="/returns">Returns & Refunds</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section newsletter">
            <h4>Newsletter</h4>
            <p>Stay updated with our latest products and offers.</p>
            <form onSubmit={handleNewsletterSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} PrintBox3D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
