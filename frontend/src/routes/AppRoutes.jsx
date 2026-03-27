import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';

import Home from '../pages/Home';
import Menu from '../pages/Menu';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import Orders from '../pages/Orders';
import Login from '../pages/Login';
import Admin from '../pages/Admin';

import OrderConfirmation from '../pages/OrderConfirmation';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-confirmation" element={<OrderConfirmation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/login" element={<Login />} />
      
      {/* Protected Endpoints */}
      <Route element={<PrivateRoute />}>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
      </Route>

      <Route element={<PrivateRoute requireAdmin />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
