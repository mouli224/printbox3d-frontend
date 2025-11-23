import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <div className="profile-avatar">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <h1>My Profile</h1>
          <p className="profile-subtitle">Welcome back, {user?.first_name || user?.username || 'User'}!</p>
        </div>

        <div className="profile-content">
          <div className="profile-card">
            <h2>Account Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <label>Full Name</label>
                <p>{user?.first_name || user?.last_name 
                  ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim() 
                  : 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Email Address</label>
                <p>{user?.email || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Username</label>
                <p>{user?.username || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Phone Number</label>
                <p>{user?.phone || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Address</label>
                <p>{user?.address || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>City</label>
                <p>{user?.city || 'Not provided'}</p>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-secondary">Edit Profile</button>
              <button className="btn-secondary">Change Password</button>
            </div>
          </div>

          <div className="quick-links">
            <h3>Quick Links</h3>
            <Link to="/orders" className="quick-link-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
              </svg>
              <div>
                <h4>My Orders</h4>
                <p>View your order history</p>
              </div>
            </Link>
            <Link to="/cart" className="quick-link-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <div>
                <h4>Shopping Cart</h4>
                <p>View items in your cart</p>
              </div>
            </Link>
            <Link to="/shop" className="quick-link-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
              <div>
                <h4>Continue Shopping</h4>
                <p>Browse our products</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
