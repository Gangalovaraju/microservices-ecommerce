import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLastOrder, clearLastOrder } from '../store/slices/ordersSlice';
import '../App.css';
import './ConfirmationPage.css';

const STATUS_CONFIG = {
  CONFIRMED:      { icon: '✅', label: 'Confirmed',      color: 'success' },
  PAYMENT_FAILED: { icon: '❌', label: 'Payment Failed', color: 'error'   },
  PENDING:        { icon: '⏳', label: 'Pending',         color: 'warning' },
};

export default function ConfirmationPage() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const lastOrder  = useSelector(selectLastOrder);

  if (!lastOrder) return (
    <div className="page">
      <div className="empty-state">
        <div className="empty-state__icon">📦</div>
        <div className="empty-state__title">No recent order found</div>
        <div className="empty-state__desc">Head back to the shop to place an order.</div>
        <button className="btn btn--primary" onClick={() => navigate('/')}>Shop Now</button>
      </div>
    </div>
  );

  const cfg = STATUS_CONFIG[lastOrder.status] || { icon: '📦', label: lastOrder.status, color: 'info' };

  return (
    <div className="page">
      <div className="confirm-card fade-in">

        {/* Header */}
        <div className={`confirm-card__header confirm-card__header--${cfg.color}`}>
          <div className="confirm-card__icon">{cfg.icon}</div>
          <h1 className="confirm-card__title">Order {cfg.label}!</h1>
          <p className="confirm-card__subtitle">
            {lastOrder.status === 'CONFIRMED'
              ? 'Your payment was processed and order is confirmed.'
              : 'There was an issue with your payment. Please try again.'}
          </p>
        </div>

        {/* Details */}
        <div className="confirm-card__body">
          <div className="confirm-detail-grid">
            <div className="confirm-detail">
              <span className="confirm-detail__label">Order Number</span>
              <span className="confirm-detail__value confirm-detail__value--mono">{lastOrder.orderNumber}</span>
            </div>
            <div className="confirm-detail">
              <span className="confirm-detail__label">Email</span>
              <span className="confirm-detail__value">{lastOrder.customerEmail}</span>
            </div>
            <div className="confirm-detail">
              <span className="confirm-detail__label">Payment</span>
              <span className="confirm-detail__value">{lastOrder.paymentMethod}</span>
            </div>
            {lastOrder.paymentId && (
              <div className="confirm-detail">
                <span className="confirm-detail__label">Payment ID</span>
                <span className="confirm-detail__value confirm-detail__value--mono">{lastOrder.paymentId}</span>
              </div>
            )}
          </div>

          {/* Items */}
          <div className="confirm-items">
            <h3 className="confirm-items__title">Items Ordered</h3>
            {lastOrder.items?.map(item => (
              <div key={item.id || item.skuCode} className="confirm-item">
                <div className="confirm-item__left">
                  <span className="confirm-item__name">{item.productName}</span>
                  <span className="confirm-item__sku">SKU: {item.skuCode} · Qty: {item.quantity}</span>
                </div>
                <span className="confirm-item__subtotal">
                  ${Number(item.subtotal || item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="confirm-total">
            <span>Total Paid</span>
            <span className="confirm-total__amount">${Number(lastOrder.totalAmount).toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="confirm-card__footer">
          <button
            className="btn btn--ghost"
            onClick={() => { dispatch(clearLastOrder()); navigate('/orders'); }}
          >
            View My Orders
          </button>
          <button
            className="btn btn--primary"
            onClick={() => { dispatch(clearLastOrder()); navigate('/'); }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
