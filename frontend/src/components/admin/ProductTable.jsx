import React from 'react';
import './Admin.css';

const ProductTable = ({ products }) => {
  return (
    <div className="table-container fade-in">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>
                <div className="product-cell">
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="product-name-info">
                    <h4>{product.name}</h4>
                  </div>
                </div>
              </td>
              <td style={{textTransform: 'capitalize'}}>{product.category}</td>
              <td>₹{product.price}</td>
              <td>
                <span className={`stock-badge-admin ${product.stock < 10 ? 'low' : 'ok'}`}>
                  {product.stock} units
                </span>
              </td>
              <td>
                <div className="action-btns">
                  <button className="action-btn edit-btn" title="Edit Item">
                    <i className="fas fa-edit"></i>
                  </button>
                  <button className="action-btn delete-btn" title="Delete Item">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
