import React, { useState } from 'react';
import './Contact.css';
import { contactAPI } from '../../services/api';

const faqs = [
  {
    id: 1,
    question: 'What materials do you use for 3D printing?',
    answer: 'We primarily use PLA, ABS, PETG, and TPU materials. PLA is our standard eco-friendly option, while ABS offers greater durability. PETG provides strength and flexibility, and TPU is perfect for flexible prints. We can also source specialty materials upon request.'
  },
  {
    id: 2,
    question: 'How long does it take to complete a custom order?',
    answer: 'Standard custom orders typically take 3-5 business days for printing, plus 2-3 days for quality checks and shipping. Complex designs may require additional time. Rush orders are available upon request for an additional fee.'
  },
  {
    id: 3,
    question: 'Do you ship internationally?',
    answer: 'Currently, we ship within India to all major cities and towns. We are working on expanding our international shipping capabilities. For international orders, please contact us directly to discuss options.'
  },
  {
    id: 4,
    question: 'Can I request changes to an existing design?',
    answer: 'Yes! Many of our products can be customized with different colors, sizes, or minor modifications. Contact us with your requirements and we\'ll let you know what\'s possible.'
  },
  {
    id: 5,
    question: 'What file formats do you accept for custom prints?',
    answer: 'We accept STL, OBJ, 3MF, STEP, and STP files. If you have a design in another format or just sketches/images, send them to us and our team will help convert them to a printable format.'
  },
  {
    id: 6,
    question: 'What is your return and refund policy?',
    answer: 'We accept returns within 7 days of delivery for damaged or defective items. Custom orders are generally non-returnable unless there\'s a manufacturing defect. Please inspect your order upon delivery and contact us immediately if there are any issues.'
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setSubmitting(true);
      setSubmitStatus(null);
      
      await contactAPI.submit(formData);
      
      setSubmitStatus({ type: 'success', message: 'Thank you for contacting us! We will respond within 24 hours.' });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again later.' });
      console.error('Error submitting contact form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>Have questions? We're here to help!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-layout">
          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <p className="form-description">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What is this regarding?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              {submitStatus && (
                <div style={{ 
                  padding: '10px', 
                  marginBottom: '15px', 
                  borderRadius: '4px',
                  backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                  color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                  border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {submitStatus.message}
                </div>
              )}

              <button type="submit" className="submit-btn" disabled={submitting}>
                {submitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          <div className="contact-info-section">
            <div className="info-card">
              <h3>Contact Information</h3>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>info@printbox3d.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h4>Phone</h4>
                  <p>+91 7385748899</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Bangalore, India</p>
                  <p>India</p>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Business Hours</h3>
              <div className="hours-list">
                <div className="hours-item">
                  <span>Monday - Friday</span>
                  <span>10:00 AM - 7:00 PM</span>
                </div>
                <div className="hours-item">
                  <span>Saturday - Sunday</span>
                  <span>10:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Follow Us</h3>
              <div className="social-links">
                <a href="https://facebook.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </a>
                <a href="https://instagram.com" className="social-link" target="_blank" rel="noopener noreferrer">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <p className="faq-subtitle">Find answers to common questions about our services</p>

          <div className="faq-accordion">
            {faqs.map((faq) => (
              <div key={faq.id} className={`faq-item ${activeAccordion === faq.id ? 'active' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => toggleAccordion(faq.id)}
                >
                  <span>{faq.question}</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="faq-icon"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
