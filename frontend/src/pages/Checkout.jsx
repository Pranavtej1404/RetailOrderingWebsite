import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/cartService';
import { placeOrder } from '../services/orderService';
import CartSummary from '../components/cart/CartSummary';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCart, setFetchingCart] = useState(true);
  const [error, setError] = useState('');

  const cartId = localStorage.getItem('cartId');
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const data = await getCart(cartId);
        setCartItems(data.items || []);
      } catch (err) {
        console.error('Error fetching cart for checkout:', err);
      } finally {
        setFetchingCart(false);
      }
    };
    fetchCartItems();
  }, [cartId]);

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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      const payload = {
        deliveryAddress: `${formData.address}, ${formData.city}, ${formData.zipCode}`
      };

      const response = await placeOrder(payload, cartId);
      navigate('/order-confirmation', { state: { orderId: response.id || response.orderId } });
    } catch (err) {
      console.error('Order placement error:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingCart) return <div className="container py-5 text-center"><h1>Loading Checkout...</h1></div>;

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
          {error && <div className="error-message mb-3" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          <div className="payment-options">
            <div className="payment-card active">
              <i className="fas fa-truck"></i>
              <div className="info">
                <h4>Cash on Delivery</h4>
                <p>Pay when you receive your order</p>
              </div>
              <i className="fas fa-check-circle ms-auto" style={{ color: 'var(--primary)' }}></i>
            </div>
            <div className="payment-card" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
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
        <CartSummary subtotal={subtotal} showCheckoutButton={false} />
        <button type="submit" form="checkout-form" className="btn-primary place-order-btn" disabled={loading}>
          {loading ? 'Processing...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
