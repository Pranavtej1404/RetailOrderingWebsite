import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import CartSummary from '../components/cart/CartSummary';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { cart } = state;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // In Sprint 3, we just navigate to success page
    navigate('/order-confirmation', { state: { orderId: 'ORD-' + Math.floor(Math.random() * 9000 + 1000) } });
  };

  return (
    <div className="container checkout-container fade-in">
      <div className="checkout-form-section">
        <div className="checkout-section">
          <h2><i className="fas fa-map-marker-alt"></i> Delivery Address</h2>
          <form id="checkout-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Pranav Tej" 
                required 
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email ID</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="pranav@example.com" 
                  required 
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  name="phone" 
                  placeholder="+91 9876543210" 
                  required 
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea 
                name="address" 
                rows="3" 
                placeholder="Street name, Apartment, Landmark" 
                required
                value={formData.address}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input 
                  type="text" 
                  name="city" 
                  placeholder="Hyderabad" 
                  required 
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Zip Code</label>
                <input 
                  type="text" 
                  name="zipCode" 
                  placeholder="500032" 
                  required 
                  value={formData.zipCode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </div>

        <div className="checkout-section">
          <h2><i className="fas fa-credit-card"></i> Payment Method</h2>
          <div className="payment-options">
            <div className="payment-card active">
              <i className="fas fa-truck"></i>
              <div className="info">
                <h4>Cash on Delivery</h4>
                <p>Pay when you receive your order</p>
              </div>
              <i className="fas fa-check-circle ms-auto" style={{color: 'var(--primary)'}}></i>
            </div>
            <div className="payment-card" style={{opacity: 0.5, cursor: 'not-allowed'}}>
              <i className="fas fa-university"></i>
              <div className="info">
                <h4>Online Payment</h4>
                <p>Temporarily unavailable</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="checkout-summary">
        <CartSummary subtotal={subtotal} />
        <button type="submit" form="checkout-form" className="btn-primary place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
