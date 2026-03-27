import React, { createContext, useContext, useState, useEffect } from 'react';
import * as cartService from '../services/cartService';

const CartContext = createContext();

const generateCartId = () => {
  return 'cart_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [cartId, setCartId] = useState(() => {
    let id = localStorage.getItem('cartId');
    if (!id) {
      id = generateCartId();
      localStorage.setItem('cartId', id);
    }
    return id;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await cartService.getCart(cartId);
        setCart(data);
      } catch (err) {
        // If the cart is just not found on the backend, it's fine. Set default empty items.
        console.error("Failed to fetch cart", err);
        setCart({ items: [] });
      } finally {
        setLoading(false);
      }
    };
    
    fetchCart();
  }, [cartId]);

  const addToCart = async (product, quantity = 1) => {
    try {
      setLoading(true);
      setError(null);
      const payload = { productId: product.id, quantity };
      const updatedCart = await cartService.addCartItem(payload, cartId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error adding to cart", err);
      setError('Failed to add item to cart.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const payload = { quantity };
      const updatedCart = await cartService.updateCartItem(itemId, payload, cartId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating cart quantity", err);
      setError('Failed to update cart quantity.');
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const updatedCart = await cartService.deleteCartItem(itemId, cartId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error removing cart item", err);
      setError('Failed to remove item from cart.');
    } finally {
      setLoading(false);
    }
  };

  const getCartTotals = () => {
    if (!cart || !cart.items) return { itemsCount: 0, subtotal: 0 };
    const itemsCount = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    // Assuming item object returned has product info nested e.g., item.product.price
    // or item.price if the backend flattens it
    const subtotal = cart.items.reduce((acc, item) => {
      const price = item.product ? item.product.price : (item.price || 0);
      return acc + (item.quantity * price);
    }, 0);
    return { itemsCount, subtotal };
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartId,
      loading,
      error,
      addToCart,
      updateQuantity,
      removeItem,
      getCartTotals
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
