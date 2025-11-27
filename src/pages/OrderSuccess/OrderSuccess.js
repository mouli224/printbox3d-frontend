import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageUtils';
import './OrderSuccess.css';

const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`/orders/${orderId}/`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (loading) {
    return (
      <div className="order-success-container">
        <div className="container">
          <div className="loading-spinner">
            <div className="spinner"></div>
            <p>Loading order details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="order-success-container">
        <div className="container">
          <div className="error-message">
            <div className="error-icon">⚠️</div>
            <h2>Order Not Found</h2>
            <p>{error || 'Unable to find order details'}</p>
            <button onClick={() => navigate('/shop')} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success-container">
      <div className="container">
        <div className="success-card">
          <div className="success-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#10b981" opacity="0.2"/>
              <path d="M9 12l2 2 4-4" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          
          <h1>Payment Successful!</h1>
          <p className="success-message">
            Thank you for your order. We've received your payment and your order is being processed.
          </p>

          <div className="order-id-badge">
            Order ID: <strong>{order.order_id}</strong>
          </div>

          <div className="order-details-card">
            <h2>Order Details</h2>
            
            <div className="detail-row">
              <span className="detail-label">Status:</span>
              <span className="status-badge status-paid">{order.status}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Total Amount:</span>
              <span className="detail-value">₹{parseFloat(order.total_amount).toFixed(2)}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Payment Status:</span>
              <span className="status-badge status-captured">{order.payment_status}</span>
            </div>

            <div className="divider"></div>

            <h3>Items Ordered</h3>
            <div className="order-items-list">
              {order.items.map((item) => (
                <div key={item.id} className="order-item">
                  <img src={getImageUrl(item.product_image, item.product_name)} alt={item.product_name} />
                  <div className="order-item-details">
                    <p className="item-name">{item.product_name}</p>
                    <p className="item-qty">Quantity: {item.quantity}</p>
                    <p className="item-price">₹{parseFloat(item.product_price).toFixed(2)} each</p>
                  </div>
                  <div className="item-total">
                    ₹{parseFloat(item.subtotal).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="divider"></div>

            <h3>Shipping Address</h3>
            <div className="shipping-address">
              <p><strong>{order.customer_name}</strong></p>
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_pincode}</p>
              <p>Phone: {order.customer_phone}</p>
              <p>Email: {order.customer_email}</p>
            </div>
          </div>

          <div className="next-steps">
            <h3>What's Next?</h3>
            <ul>
              <li>📧 You'll receive an order confirmation email shortly</li>
              <li>📦 We'll start processing your order immediately</li>
              <li>🚚 You'll receive tracking information once shipped</li>
              <li>📞 Contact us if you have any questions</li>
            </ul>
          </div>

          <div className="action-buttons">
            <button onClick={() => navigate('/shop')} className="btn-primary">
              Continue Shopping
            </button>
            <button onClick={() => navigate('/')} className="btn-secondary">
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
