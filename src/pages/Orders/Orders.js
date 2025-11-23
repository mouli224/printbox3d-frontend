import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Orders.css';

const Orders = () => {
  const { user } = useAuth();

  return (
    <div className="orders-page">
      <div className="container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p className="orders-subtitle">Track and manage your purchases</p>
        </div>

        <div className="orders-content">
          <div className="empty-orders">
            <div className="empty-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
            </div>
            <h2>No Orders Yet</h2>
            <p>Hi {user?.first_name || user?.username}! You haven't placed any orders yet. Start exploring our amazing 3D printed products!</p>
            
            <div className="empty-actions">
              <Link to="/shop" className="btn-primary">
                Start Shopping
              </Link>
              <Link to="/custom-order" className="btn-secondary">
                Create Custom Order
              </Link>
            </div>

            <div className="order-features">
              <div className="feature-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <h3>Track Orders</h3>
                <p>Real-time tracking of your deliveries</p>
              </div>
              <div className="feature-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <h3>Order History</h3>
                <p>View all your past purchases</p>
              </div>
              <div className="feature-item">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <h3>Notifications</h3>
                <p>Get updates on order status</p>
              </div>
            </div>
          </div>

          {/* Future: This section will display actual orders */}
          {/* <div className="orders-list">
            <div className="order-card">
              Order items will appear here
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Orders;
