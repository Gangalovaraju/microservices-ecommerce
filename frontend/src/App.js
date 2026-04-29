import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchProducts } from './store/slices/productsSlice';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Toast from './components/common/Toast';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import OrdersPage from './pages/OrdersPage';
import ConfirmationPage from './pages/ConfirmationPage';
import './App.css';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="app-shell">
        <Navbar />
        <main className="app-main">
          <Toast />
          <Routes>
            <Route path="/"            element={<ShopPage />} />
            <Route path="/cart"        element={<CartPage />} />
            <Route path="/orders"      element={<OrdersPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*"            element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
