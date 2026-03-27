import React, { useEffect, useState } from 'react';
import CartItemCard from '../components/cart/CartItemCard';
import CartSummary from '../components/cart/CartSummary';
import EmptyCartState from '../components/cart/EmptyCartState';
import { getCart, deleteCartItem, updateCartItem } from '../services/cartService';
import '../components/cart/Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const cartId = localStorage.getItem('cartId');

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart(cartId);
      setCartItems(data.items || []);
      if (data.cartId) {
        localStorage.setItem('cartId', data.cartId);
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id, cartId);
      fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleUpdateQuantity = async (id, newQty) => {
    try {
      await updateCartItem(id, { quantity: newQty }, cartId);
      fetchCart();
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (loading) return <div className="container py-5 text-center"><h1>Loading Cart...</h1></div>;

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
