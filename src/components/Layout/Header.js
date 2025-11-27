import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo" onClick={closeMenu}>
            <img src="/assets/logo/placeholder.png" alt="PrintBox3D Logo" className="logo-image" onError={(e) => {e.target.style.display='none'}} />
            <span className="logo-text">PrintBox</span>
            <span className="logo-accent">3D</span>
          </Link>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <li>
              <Link to="/shop" className={isActive('/shop')} onClick={closeMenu}>
                Shop
              </Link>
            </li>
            <li>
              <Link to="/custom-order" className={isActive('/custom-order')} onClick={closeMenu}>
                Custom Order
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about')} onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={isActive('/contact')} onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>

          <div className="nav-actions">
            {isAuthenticated ? (
              <div className="user-menu-container">
                <button 
                  className="user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-label="User menu"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="user-name">{user?.first_name || user?.email}</span>
                </button>
                
                {showUserMenu && (
                  <div className="user-dropdown">
                    <Link to="/profile" onClick={() => setShowUserMenu(false)}>
                      My Profile
                    </Link>
                    <Link to="/orders" onClick={() => setShowUserMenu(false)}>
                      My Orders
                    </Link>
                    <button onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="login-btn">
                Sign In
              </Link>
            )}

            <Link to="/cart" className="cart-btn" aria-label="Shopping cart">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
