import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartTotals } = useCart();
  const { itemsCount } = getCartTotals();

  return (
    <nav className="navbar glass">
      <div className="container nav-container">
        <Link to="/" className="logo">
          Retail<span>Order</span>
        </Link>
        
        <div className={`nav-links-wrapper ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/menu" onClick={() => setIsMenuOpen(false)}>Menu</Link></li>
            <li><Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link></li>
          </ul>
          <div className="nav-actions">
            <Link to="/cart" className="cart-btn" onClick={() => setIsMenuOpen(false)}>
              <i className="fas fa-shopping-cart"></i>
              <span className="cart-count">{itemsCount}</span>
            </Link>
            <Link to="/login" className="login-btn btn-primary" onClick={() => setIsMenuOpen(false)}>Login</Link>
          </div>
        </div>

        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
