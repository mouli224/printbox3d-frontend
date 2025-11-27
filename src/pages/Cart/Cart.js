import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { getImageUrl } from '../../utils/imageUtils';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="9" cy="21" r="1"/>
              <circle cx="20" cy="21" r="1"/>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart to get started!</p>
            <Link to="/shop" className="btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="cart-title">Shopping Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={getImageUrl(item.product.image, item.product.name, item.product.frontend_image)} alt={item.product.name} />
                </div>
                
                <div className="cart-item-details">
                  <Link to={`/product/${item.product.slug}`} className="cart-item-name">
                    {item.product.name}
                  </Link>
                  <p className="cart-item-category">{item.product.category_name}</p>
                  <p className="cart-item-price">₹{item.product.price}</p>
                </div>

                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={loading || item.quantity <= 1}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-display">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    disabled={loading}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  ₹{(parseFloat(item.product.price) * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  disabled={loading}
                  className="cart-item-remove"
                  aria-label="Remove item"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row summary-total">
              <span>Total</span>
              <span>₹{getCartTotal().toFixed(2)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              className="btn-checkout"
              disabled={loading}
            >
              {isAuthenticated ? 'Proceed to Checkout' : 'Sign In to Checkout'}
            </button>

            <Link to="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
