import React from 'react';
import CartItemCard from '../components/cart/CartItemCard';
import CartSummary from '../components/cart/CartSummary';
import EmptyCartState from '../components/cart/EmptyCartState';
import { mockCartItems } from '../data/mockData';
import '../components/cart/Cart.css';

const Cart = () => {
  const cartItems = mockCartItems;
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-page-wrapper">
      <div className="container cart-layout">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-items-section">
              <div className="cart-header">
                <h1>Shopping Cart <span>({cartItems.length} items)</span></h1>
              </div>
              <div className="cart-items-list">
                {cartItems.map(item => (
                  <CartItemCard key={item.id} item={item} />
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
