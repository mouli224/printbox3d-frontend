import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import api from '../../services/api';
import { getImageUrl } from '../../utils/imageUtils';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_state: '',
    shipping_pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const existingScript = document.getElementById('razorpay-checkout');
      
      if (existingScript) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.id = 'razorpay-checkout';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate cart
      if (!cartItems || cartItems.length === 0) {
        alert('Your cart is empty!');
        navigate('/shop');
        return;
      }

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order
      const orderData = {
        ...formData,
        items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        }))
      };

      const response = await api.post('/orders/create/', orderData);
      const {
        order_id,
        razorpay_order_id,
        razorpay_key_id,
        amount,
        currency,
        customer_name,
        customer_email,
        customer_phone
      } = response.data;

      // Razorpay options
      const options = {
        key: razorpay_key_id,
        amount: amount,
        currency: currency,
        name: 'PrintBox3D',
        description: `Order #${order_id}`,
        order_id: razorpay_order_id,
        handler: async (response) => {
          try {
            // Verify payment
            const verifyResponse = await api.post('/orders/verify-payment/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              order_id: order_id
            });

            // Clear cart
            clearCart();

            // Redirect to success page
            navigate(`/order-success/${order_id}`);
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support with Order ID: ' + order_id);
            setLoading(false);
          }
        },
        prefill: {
          name: customer_name,
          email: customer_email,
          contact: customer_phone
        },
        theme: {
          color: '#3399cc'
        },
        modal: {
          ondismiss: async () => {
            // Payment cancelled
            try {
              await api.post('/orders/payment-failed/', {
                order_id: order_id,
                error_description: 'Payment cancelled by user'
              });
            } catch (err) {
              console.error('Failed to record payment cancellation:', err);
            }
            alert('Payment cancelled');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      
      razorpay.on('payment.failed', async (response) => {
        // Payment failed
        try {
          await api.post('/orders/payment-failed/', {
            order_id: order_id,
            error_description: response.error.description
          });
        } catch (err) {
          console.error('Failed to record payment failure:', err);
        }
        alert(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

      razorpay.open();
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error.response?.data?.error || 'Failed to create order. Please try again.';
      alert(errorMessage);
      setLoading(false);
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="checkout-container">
        <div className="container">
          <div className="empty-checkout">
            <h2>Your cart is empty</h2>
            <p>Add some products to checkout</p>
            <button onClick={() => navigate('/shop')} className="btn-primary">
              Go to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container">
        <h1 className="checkout-title">Checkout</h1>
        
        <div className="checkout-layout">
          <div className="checkout-form-section">
            <form onSubmit={handlePayment}>
              <div className="form-section">
                <h2>Customer Details</h2>
                <div className="form-group">
                  <label htmlFor="customer_name">Full Name *</label>
                  <input
                    type="text"
                    id="customer_name"
                    name="customer_name"
                    placeholder="Enter your full name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer_email">Email Address *</label>
                  <input
                    type="email"
                    id="customer_email"
                    name="customer_email"
                    placeholder="your.email@example.com"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="customer_phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="customer_phone"
                    name="customer_phone"
                    placeholder="10-digit mobile number"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Shipping Address</h2>
                <div className="form-group">
                  <label htmlFor="shipping_address">Street Address *</label>
                  <textarea
                    id="shipping_address"
                    name="shipping_address"
                    placeholder="House/Flat No, Building Name, Street"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="shipping_city">City *</label>
                    <input
                      type="text"
                      id="shipping_city"
                      name="shipping_city"
                      placeholder="City"
                      value={formData.shipping_city}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="shipping_state">State *</label>
                    <input
                      type="text"
                      id="shipping_state"
                      name="shipping_state"
                      placeholder="State"
                      value={formData.shipping_state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="shipping_pincode">Pincode *</label>
                  <input
                    type="text"
                    id="shipping_pincode"
                    name="shipping_pincode"
                    placeholder="6-digit pincode"
                    value={formData.shipping_pincode}
                    onChange={handleChange}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-checkout" disabled={loading}>
                {loading ? 'Processing...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>

          <div className="checkout-summary">
            <h2>Order Summary</h2>
            
            <div className="order-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={getImageUrl(item.product.image, item.product.name, item.product.frontend_image)} alt={item.product.name} />
                  <div className="summary-item-details">
                    <p className="summary-item-name">{item.product.name}</p>
                    <p className="summary-item-qty">Qty: {item.quantity}</p>
                  </div>
                  <div className="summary-item-price">
                    ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <div className="payment-info">
              <p>🔒 Secure payment powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
