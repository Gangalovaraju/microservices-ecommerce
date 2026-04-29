import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchOrdersByEmail } from '../store/slices/ordersSlice';
import { selectOrders, selectOrdersLoading, selectOrdersError } from '../store/slices/ordersSlice';
import { selectEmail, setEmail } from '../store/slices/uiSlice';
import '../App.css';
import './OrdersPage.css';

const STATUS_STYLES = {
  CONFIRMED:      { color: '#059669', bg: '#ecfdf5', icon: '✅' },
  PAYMENT_FAILED: { color: '#dc2626', bg: '#fef2f2', icon: '❌' },
  PENDING:        { color: '#d97706', bg: '#fffbeb', icon: '⏳' },
  SHIPPED:        { color: '#2563eb', bg: '#eff6ff', icon: '🚚' },
  DELIVERED:      { color: '#7c3aed', bg: '#f5f3ff', icon: '🎉' },
  CANCELLED:      { color: '#6b7280', bg: '#f9fafb', icon: '🚫' },
};

export default function OrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders   = useSelector(selectOrders);
  const loading  = useSelector(selectOrdersLoading);
  const error    = useSelector(selectOrdersError);
  const email    = useSelector(selectEmail);
  const [localEmail, setLocalEmail] = useState(email || '');
  const [expanded, setExpanded]     = useState(null);

  const handleSearch = () => {
    if (!localEmail) return;
    dispatch(setEmail(localEmail));
    dispatch(fetchOrdersByEmail(localEmail));
  };

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">My Orders</h1>
        <p className="page-subtitle">Track your order history and status</p>
      </div>

      {/* Search bar */}
      <div className="orders-search">
        <input
          className="orders-search__input"
          type="email"
          placeholder="Enter your email to find orders…"
          value={localEmail}
          onChange={e => setLocalEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button
          className="btn btn--primary"
          onClick={handleSearch}
          disabled={loading || !localEmail}
        >
          {loading ? <><span className="btn-spinner" /> Searching…</> : 'Search Orders'}
        </button>
      </div>

      {error && (
        <div className="error-banner">⚠️ {error}</div>
      )}

      {/* Results */}
      {orders.length === 0 && !loading && email && (
        <div className="empty-state">
          <div className="empty-state__icon">📭</div>
          <div className="empty-state__title">No orders found</div>
          <div className="empty-state__desc">No orders found for <strong>{email}</strong>.</div>
          <button className="btn btn--primary" onClick={() => navigate('/')}>Shop Now</button>
        </div>
      )}

      <div className="orders-list">
        {orders.map(order => {
          const st  = STATUS_STYLES[order.status] || STATUS_STYLES.PENDING;
          const exp = expanded === order.orderNumber;
          return (
            <div key={order.orderNumber} className="order-card">
              {/* Header row */}
              <div
                className="order-card__header"
                onClick={() => setExpanded(exp ? null : order.orderNumber)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && setExpanded(exp ? null : order.orderNumber)}
                aria-expanded={exp}
              >
                <div className="order-card__left">
                  <span
                    className="order-card__status"
                    style={{ color: st.color, background: st.bg }}
                  >
                    {st.icon} {order.status.replace('_', ' ')}
                  </span>
                  <div className="order-card__number">{order.orderNumber}</div>
                  <div className="order-card__meta">
                    {order.paymentMethod} · {new Date(order.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="order-card__right">
                  <div className="order-card__total">${Number(order.totalAmount).toFixed(2)}</div>
                  <span className="order-card__toggle">{exp ? '▲' : '▼'}</span>
                </div>
              </div>

              {/* Expanded items */}
              {exp && (
                <div className="order-card__items fade-in">
                  {order.items?.map(item => (
                    <div key={item.id || item.skuCode} className="order-item">
                      <div>
                        <div className="order-item__name">{item.productName}</div>
                        <div className="order-item__sku">SKU: {item.skuCode} · Qty: {item.quantity}</div>
                      </div>
                      <div className="order-item__price">
                        ${Number(item.subtotal || item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {order.paymentId && (
                    <div className="order-card__payment-id">
                      Payment ID: <code>{order.paymentId}</code>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
