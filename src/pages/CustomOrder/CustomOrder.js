import React, { useState } from 'react';
import './CustomOrder.css';

const exampleProjects = [
  {
    id: 1,
    title: 'Custom Trophy',
    image: '/assets/custom/custom_trophy.jpg'
  },
  {
    id: 2,
    title: 'Personalized Gift',
    image: '/assets/custom/personlalized_gifts.jpg'
  },
  {
    id: 3,
    title: 'Prototype Model',
    image: '/assets/custom/prototype_model.jpg'
  },
  {
    id: 4,
    title: 'Architectural Model',
    image: '/assets/custom/architectural_model.jpg'
  }
];

const CustomOrder = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    material: 'PLA',
    color: '',
    description: '',
    budget: '',
    quantity: '1',
    file: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      file: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Custom order submitted:', formData);
    alert('Thank you for your custom order request! We will contact you shortly.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      material: 'PLA',
      color: '',
      description: '',
      budget: '',
      quantity: '1',
      file: null
    });
  };

  return (
    <div className="custom-order-page">
      <div className="custom-order-hero">
        <div className="container">
          <h1>Design Your Custom 3D Print</h1>
          <p>Transform your ideas into reality. Share your vision and we'll bring it to life.</p>
        </div>
      </div>

      <div className="container">
        <div className="custom-order-layout">
          <div className="order-form-section">
            <h2>Submit Your Custom Request</h2>
            <p className="form-intro">Fill out the form below with your project details. Upload your design file if you have one, or describe your idea and we'll help you create it.</p>

            <form onSubmit={handleSubmit} className="custom-order-form">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
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

              <div className="form-row">
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
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="material">Material Preference</label>
                  <select
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                  >
                    <option value="PLA">PLA (Standard)</option>
                    <option value="ABS">ABS (Durable)</option>
                    <option value="PETG">PETG (Strong & Flexible)</option>
                    <option value="TPU">TPU (Flexible)</option>
                    <option value="Other">Other (Specify in description)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="color">Preferred Color</label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="e.g., White, Black, Custom"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Project Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Describe your project in detail. Include dimensions, purpose, specific requirements, etc."
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="budget">Budget Range (₹)</label>
                  <input
                    type="text"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="e.g., 1000-2000"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    min="1"
                    placeholder="1"
                  />
                </div>
              </div>

              <div className="form-group file-upload-group">
                <label htmlFor="file">Upload Design File (Optional)</label>
                <p className="file-upload-hint">Accepted formats: STL, OBJ, 3MF, STEP, or images/sketches</p>
                <div className="file-upload-wrapper">
                  <input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFileChange}
                    accept=".stl,.obj,.3mf,.step,.stp,.jpg,.jpeg,.png,.pdf"
                  />
                  <label htmlFor="file" className="file-upload-label">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/>
                      <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span>{formData.file ? formData.file.name : 'Choose file or drag & drop'}</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn">
                Submit Custom Order Request
              </button>
            </form>
          </div>

          <div className="order-info-section">
            <div className="info-card">
              <h3>How It Works</h3>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Submit Your Idea</h4>
                    <p>Fill out the form with your project details and upload any reference files.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>We Review & Quote</h4>
                    <p>Our team reviews your request and provides a detailed quote within 24-48 hours.</p>
                  </div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>We Print & Ship</h4>
                    <p>Once approved, we print your custom design and ship it directly to you.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>What You Can Create</h3>
              <ul className="creation-list">
                <li>Personalized gifts and trophies</li>
                <li>Prototypes and functional parts</li>
                <li>Architectural models</li>
                <li>Replacement parts</li>
                <li>Custom decorative items</li>
                <li>Unique accessories</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="examples-section">
          <h2>Past Custom Projects</h2>
          <p className="examples-subtitle">Get inspired by some of our recent custom prints</p>
          <div className="examples-grid">
            {exampleProjects.map((project) => (
              <div key={project.id} className="example-card">
                <img src={project.image} alt={project.title} />
                <h4>{project.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomOrder;
