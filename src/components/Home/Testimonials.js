import React, { useState, useEffect } from 'react';
import './Testimonials.css';
import { testimonialAPI } from '../../services/api';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await testimonialAPI.getFeatured();
        setTestimonials(data || []);
      } catch (err) {
        console.error('Failed to fetch testimonials:', err);
        // Fallback to default testimonials
        setTestimonials([
          {
            id: 1,
            name: 'Priya Sharma',
            message: 'The quality of prints from PrintBox3D is exceptional. My custom phone stand turned out perfect!',
            rating: 5
          },
          {
            id: 2,
            name: 'Rahul Mehta',
            message: 'Fast delivery and great customer service. The geometric planter looks amazing in my living room.',
            rating: 5
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);
  if (loading) {
    return (
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null; // Don't show section if no testimonials
  }

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-header">
          <h2>What Our Customers Say</h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {testimonial.image && (
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-avatar"
                  style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '15px' }}
                />
              )}
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.message}"</p>
              <p className="testimonial-author">
                — {testimonial.name}
                {testimonial.company && `, ${testimonial.company}`}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
