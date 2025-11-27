import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" style={{ backgroundImage: 'url(/assets/hero/hero-background.jpg)' }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">
          Where Ideas Take Shape in 3D
        </h1>
        <p className="hero-subtitle">
          Custom • Precision • Printed for You
        </p>
        <Link to="/shop" className="hero-cta">
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
