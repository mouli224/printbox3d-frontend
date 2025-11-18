import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container">
          <div className="about-hero-content">
            <h1>About PrintBox3D</h1>
            <p>Bringing ideas to life through precision 3D printing technology</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="about-story">
          <div className="story-image">
            <img src="/assets/about/about.png" alt="PrintBox3D Workspace" />
          </div>
          <div className="story-content">
            <h2>Our Story</h2>
            <p>
              PrintBox3D was born from a passion for innovation and a belief that everyone should have access 
              to high-quality 3D printing. What started as a small workshop has grown into a trusted destination 
              for custom 3D printed creations across India.
            </p>
            <p>
              We combine cutting-edge 3D printing technology with meticulous craftsmanship to deliver products 
              that exceed expectations. Every item we create is a testament to our commitment to quality, 
              precision, and customer satisfaction.
            </p>
            <p>
              Whether you're looking for unique home decor, functional gadgets, or custom designs that bring 
              your vision to life, PrintBox3D is your partner in turning ideas into tangible reality.
            </p>
          </div>
        </div>

        <div className="how-it-works">
          <h2>How It Works</h2>
          <p className="section-subtitle">From concept to creation in three simple steps</p>

          <div className="process-steps">
            <div className="process-step">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
              <div className="process-content">
                <h3>1. Choose or Upload</h3>
                <p>
                  Browse our collection of products or upload your own design. You can also share your idea 
                  and our team will help you create it from scratch.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div className="process-content">
                <h3>2. We Print</h3>
                <p>
                  Our state-of-the-art 3D printers bring your design to life using premium materials. 
                  Each print is carefully monitored to ensure perfect quality.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="process-icon">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              </div>
              <div className="process-content">
                <h3>3. We Ship</h3>
                <p>
                  Your item is carefully packaged and shipped directly to your door. We ensure fast 
                  and secure delivery across India.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="why-choose">
          <h2>Why Choose PrintBox3D</h2>
          <div className="reasons-grid">
            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h3>Premium Quality</h3>
              <p>We use only high-grade materials and maintain strict quality control on every print.</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>Customer Focused</h3>
              <p>Your satisfaction is our priority. We work closely with you to ensure perfect results.</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <h3>Fast Turnaround</h3>
              <p>Quick processing and shipping means you get your custom prints sooner.</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
              <h3>Custom Solutions</h3>
              <p>From simple modifications to completely custom designs, we can handle any project.</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h3>Competitive Pricing</h3>
              <p>Quality doesn't have to be expensive. We offer fair, transparent pricing.</p>
            </div>

            <div className="reason-card">
              <div className="reason-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <h3>Expert Support</h3>
              <p>Our knowledgeable team is always ready to help with technical questions and advice.</p>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Ready to Start Your Project?</h2>
          <p>Let's turn your ideas into reality with precision 3D printing</p>
          <div className="cta-buttons">
            <a href="/shop" className="cta-btn primary">
              Browse Products
            </a>
            <a href="/custom-order" className="cta-btn secondary">
              Request Custom Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
