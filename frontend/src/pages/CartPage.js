import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectCartItems, selectCartTotal,
  removeFromCart, updateQty, clearCart,
} from '../store/slices/cartSlice';
import { placeOrder }  from '../store/slices/ordersSlice';
import { selectEmail } from '../store/slices/uiSlice';
import { showNotification } from '../store/slices/uiSlice';
import { selectPlacing, selectOrdersError } from '../store/slices/ordersSlice';
import '../App.css';
import './CartPage.css';

const PAYMENT_METHODS = ['CARD', 'UPI', 'NET_BANKING', 'WALLET'];

export default function CartPage() {
  const dispatch       = useDispatch();
  const navigate       = useNavigate();
  const items          = useSelector(selectCartItems);
  const total          = useSelector(selectCartTotal);
  const email          = useSelector(selectEmail);
  const placing        = useSelector(selectPlacing);
  const orderError     = useSelector(selectOrdersError);
  const [payment, setPayment] = useState('CARD');

  const handleCheckout = async () => {
    if (!email) {
      dispatch(showNotification({ type: 'warning', message: 'Please enter your email in the top bar first.' }));
      return;
    }
    if (items.length === 0) return;

    const payload = {
      customerEmail: email,
      paymentMethod: payment,
      items: items.map(i => ({
        skuCode:     i.skuCode,
        productName: i.productName,
        quantity:    i.qty,
        price:       i.price,
      })),
    };

    const result = await dispatch(placeOrder(payload));
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      dispatch(showNotification({ type: 'success', message: '🎉 Order placed successfully!' }));
      navigate('/confirmation');
    } else {
      dispatch(showNotification({ type: 'error', message: result.payload || 'Order failed. Try again.' }));
    }
  };

  if (items.length === 0) return (
    <div className="page">
      <div className="empty-state">
        <div className="empty-state__icon">🛒</div>
        <div className="empty-state__title">Your cart is empty</div>
        <div className="empty-state__desc">Browse our products and add something you love!</div>
        <button className="btn btn--primary" onClick={() => navigate('/')}>Start Shopping</button>
      </div>
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="cart-layout">

        {/* Items list */}
        <div className="cart-items">
          {items.map(item => (
            <div key={item.skuCode} className="cart-item">
              <div className="cart-item__info">
                <div className="cart-item__name">{item.productName}</div>
                <div className="cart-item__sku">SKU: {item.skuCode}</div>
                <div className="cart-item__unit">${Number(item.price).toFixed(2)} each</div>
              </div>

              <div className="cart-item__controls">
                <div className="qty-control">
                  <button onClick={() => dispatch(updateQty({ skuCode: item.skuCode, qty: item.qty - 1 }))}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => dispatch(updateQty({ skuCode: item.skuCode, qty: item.qty + 1 }))}>+</button>
                </div>
                <div className="cart-item__subtotal">${(item.price * item.qty).toFixed(2)}</div>
                <button
                  className="cart-item__remove"
                  onClick={() => dispatch(removeFromCart(item.skuCode))}
                  aria-label={`Remove ${item.productName}`}
                >✕</button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="cart-summary">
          <h2 className="cart-summary__title">Order Summary</h2>

          <div className="cart-summary__rows">
            {items.map(i => (
              <div key={i.skuCode} className="cart-summary__row">
                <span>{i.productName} × {i.qty}</span>
                <span>${(i.price * i.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="cart-summary__divider" />

          <div className="cart-summary__total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {/* Payment method */}
          <div className="cart-summary__section">
            <label className="cart-summary__label">Payment Method</label>
            <div className="payment-methods">
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m}
                  className={`payment-btn ${payment === m ? 'payment-btn--active' : ''}`}
                  onClick={() => setPayment(m)}
                >
                  {m.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Email notice */}
          {!email && (
            <div className="cart-summary__notice">
              ℹ️ Enter your email in the top bar to place an order.
            </div>
          )}

          {orderError && (
            <div className="cart-summary__error">❌ {orderError}</div>
          )}

          <button
            className="btn btn--primary btn--full"
            onClick={handleCheckout}
            disabled={placing || !email}
          >
            {placing ? <><span className="btn-spinner" /> Processing…</> : `Place Order — $${total.toFixed(2)}`}
          </button>

          <button className="btn btn--ghost btn--full" onClick={() => navigate('/')}>
            ← Continue Shopping
          </button>
        </aside>
      </div>
    </div>
  );
}
