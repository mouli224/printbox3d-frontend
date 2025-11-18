import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSnippet.css';

const AboutSnippet = () => {
  return (
    <section className="about-snippet">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About PrintBox3D</h2>
            <p>
              At PrintBox3D, we transform your ideas into tangible reality through precision 3D printing. 
              Whether you're looking for unique home decor, functional gadgets, or custom-designed pieces, 
              we deliver exceptional quality with every print.
            </p>
            <p>
              Our commitment to craftsmanship, attention to detail, and fast shipping ensures that you 
              receive products that exceed expectations. From concept to creation, we're with you every 
              step of the way.
            </p>
            <Link to="/about" className="learn-more-btn">
              Learn More About Us
            </Link>
          </div>
          <div className="about-features">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h4>Premium Quality</h4>
              <p>High-grade materials and precision printing</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h4>Custom Designs</h4>
              <p>Bring your unique ideas to life</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <h4>Fast Shipping</h4>
              <p>Quick delivery across India</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
