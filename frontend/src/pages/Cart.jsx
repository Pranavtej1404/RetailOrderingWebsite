import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, loading, error, getCartTotals, updateQuantity, removeItem } = useCart();
  const { itemsCount, subtotal } = getCartTotals();
  const [updatingItemId, setUpdatingItemId] = useState(null);

  if (loading && (!cart || !cart.items)) {
    return (
      <div className="container mt-5">
        <h2>Loading Cart...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <h2 style={{ color: 'red' }}>{error}</h2>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="container mt-5">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/menu" className="btn-primary">Browse Menu</Link>
      </div>
    );
  }

  const handleUpdateQty = async (itemId, newQty) => {
    if (newQty < 1) return;
    setUpdatingItemId(itemId);
    await updateQuantity(itemId, newQty);
    setUpdatingItemId(null);
  };

  const handleRemove = async (itemId) => {
    setUpdatingItemId(itemId);
    await removeItem(itemId);
    setUpdatingItemId(null);
  };

  return (
    <div className="container mt-5 cart-page">
      <h1>Shopping Cart ({itemsCount} items)</h1>
      
      <div className="cart-items" style={{ marginBottom: '2rem' }}>
        {cart.items.map((item) => {
          const product = item.product || { name: 'Unknown Product', price: item.price || 0 };
          const isUpdating = updatingItemId === item.id;
          return (
            <div key={item.id} className="cart-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid #ccc', opacity: isUpdating ? 0.5 : 1 }}>
              <div className="item-details">
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
              </div>
              
              <div className="item-actions" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleUpdateQty(item.id, item.quantity - 1)} 
                    disabled={item.quantity <= 1 || isUpdating}
                  >-</button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <button 
                    onClick={() => handleUpdateQty(item.id, item.quantity + 1)}
                    disabled={isUpdating}
                  >+</button>
                </div>
                
                <div className="item-total">
                  <p>₹{product.price * item.quantity}</p>
                </div>

                <button 
                  onClick={() => handleRemove(item.id)}
                  style={{ background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}
                  disabled={isUpdating}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cart-summary" style={{ textAlign: 'right' }}>
        <h3>Subtotal: ₹{subtotal}</h3>
        <p>Taxes and delivery calculated at checkout</p>
        <Link to="/checkout">
          <button className="btn-primary" style={{ padding: '0.8rem 2rem', marginTop: '1rem' }}>Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
