import React from 'react';
import CartItemCard from '../components/cart/CartItemCard';
import CartSummary from '../components/cart/CartSummary';
import EmptyCartState from '../components/cart/EmptyCartState';
import { useAppContext } from '../context/AppContext';
import '../components/cart/Cart.css';

const Cart = () => {
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  const handleRemove = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const handleUpdateQuantity = (id, newQty) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity: newQty } });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page-wrapper">
      <div className="container cart-layout">
        {cart.length > 0 ? (
          <>
            <div className="cart-items-section">
              <div className="cart-header">
                <h1>Shopping Cart <span>({cart.length} items)</span></h1>
              </div>
              <div className="cart-items-list">
                {cart.map(item => (
                  <CartItemCard 
                    key={item.id} 
                    item={item} 
                    onRemove={handleRemove}
                    onUpdateQuantity={handleUpdateQuantity}
                  />
                ))}
              </div>
            </div>
            
            <aside className="cart-summary-section">
              <CartSummary subtotal={subtotal} />
            </aside>
          </>
        ) : (
          <EmptyCartState />
        )}
      </div>
    </div>
  );
};

export default Cart;
