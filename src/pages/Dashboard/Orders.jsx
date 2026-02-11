import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from './DashboardLayout';
import Button from '../../components/Button/Button';
import './Orders.css';

const Orders = () => {
  const { orders } = useAuth();
  const [filter, setFilter] = useState('all');

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'processing': return '#ffc107';
      case 'shipped': return '#2196f3';
      case 'delivered': return '#4caf50';
      case 'cancelled': return '#ff4444';
      default: return '#757575';
    }
  };

  return (
    <DashboardLayout active="orders">
      <div className="orders">
        <header className="orders__header">
          <div className="header__content">
            <h1 className="orders__title">My Orders</h1>
            <p className="orders__subtitle">Track and manage your orders</p>
          </div>
          
          <div className="header__actions">
            <Button 
              variant="primary"
              onClick={() => window.location.href = '/products'}
            >
              Order Again
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="orders-filters">
          <div className="filters-list">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                className={`filter-btn ${filter === option.value ? 'active' : ''}`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          
          <div className="search-box">
            <input
              type="text"
              placeholder="Search orders..."
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="empty-orders">
              <div className="empty-icon">📦</div>
              <h3>No orders found</h3>
              <p>You haven't placed any orders yet</p>
              <Button 
                variant="primary"
                onClick={() => window.location.href = '/products'}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3 className="order-id">Order #{order.id}</h3>
                    <span className="order-date">Placed on {order.date}</span>
                  </div>
                  
                  <div className="order-status">
                    <span 
                      className="status-badge"
                      style={{ 
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status)
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="order-items">
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="item-info">
                        <span className="item-name">{item.name}</span>
                        <span className="item-quantity">× {item.quantity}</span>
                      </div>
                      <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="order-footer">
                  <div className="order-total">
                    <span>Total:</span>
                    <span className="total-amount">${order.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="order-actions">
                    <Button variant="secondary" size="small">
                      View Details
                    </Button>
                    <Button variant="primary" size="small">
                      Reorder
                    </Button>
                    <Button variant="secondary" size="small">
                      Track Order
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;