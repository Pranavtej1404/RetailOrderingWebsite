import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { placeOrder } from '../services/orderService';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { state, dispatch } = useAppContext();
  const { cart } = state;
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address) {
      setError('Delivery address is required.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const payload = { 
        address,
        // Passing items explicitly in case the backend requires it since AppContext might not be synced
        items: cart.map(item => ({ productId: item.id, quantity: item.quantity }))
      };
      
      await placeOrder(payload);
      
      // Attempt to clear cart locally if we had a CLEAR_CART action, 
      // but if not, we can just navigate away. Let's try sending it.
      dispatch({ type: 'CLEAR_CART' });
      
      navigate('/orders');
    } catch (err) {
      console.error('Checkout error:', err);
      setError('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
      </div>
    );
  }

  return (
    <div className="container mt-5 checkout-page">
      <h1>Checkout</h1>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '.5rem' }}>Delivery Address:</label>
            <textarea 
              rows="4"
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.8rem' }}
              placeholder="123 Main St, Bangalore"
            />
          </div>
          
          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Processing...' : 'Place Order'}
          </button>
        </form>
        
        <div style={{ flex: 1, padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h3>Order Summary</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map(item => (
              <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <hr />
          <h4>Total: ₹{subtotal}</h4>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
