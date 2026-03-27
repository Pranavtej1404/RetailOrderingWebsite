import React from 'react';
import ProductTable from '../components/admin/ProductTable';
import { products } from '../data/mockData';
import '../components/admin/Admin.css';

const Admin = () => {
  return (
    <div className="container admin-container">
      <div className="admin-header">
        <h1>Inventory Management</h1>
        <button className="btn-primary">
          <i className="fas fa-plus"></i> Add New Product
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon"><i className="fas fa-box"></i></div>
          <div className="stat-info">
            <h3>{products.length}</h3>
            <p>Total Products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background: 'rgba(76, 209, 55, 0.1)', color: '#4cd137'}}><i className="fas fa-shopping-bag"></i></div>
          <div className="stat-info">
            <h3>12</h3>
            <p>Active Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{background: 'rgba(156, 136, 255, 0.1)', color: '#9c88ff'}}><i className="fas fa-users"></i></div>
          <div className="stat-info">
            <h3>156</h3>
            <p>Total Users</p>
          </div>
        </div>
      </div>

      <ProductTable products={products} />
    </div>
  );
};

export default Admin;
