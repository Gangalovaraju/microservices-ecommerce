import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectNotification, clearNotification } from '../../store/slices/uiSlice';
import './Toast.css';

export default function Toast() {
  const dispatch     = useDispatch();
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => dispatch(clearNotification()), 4000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (!notification) return null;

  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };

  return (
    <div className={`toast toast--${notification.type}`} role="alert">
      <span className="toast__icon">{icons[notification.type] || 'ℹ️'}</span>
      <span className="toast__message">{notification.message}</span>
      <button className="toast__close" onClick={() => dispatch(clearNotification())}>✕</button>
    </div>
  );
}
