import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../../store/slices/cartSlice';
import { selectEmail, setEmail } from '../../store/slices/uiSlice';
import './Navbar.css';

export default function Navbar() {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const email     = useSelector(selectEmail);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEmailChange = e => dispatch(setEmail(e.target.value));

  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* Brand */}
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__brand-icon">🛒</span>
          <span className="navbar__brand-name">MicroCommerce</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink to="/"       className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}>
            Shop
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) => 'navbar__link' + (isActive ? ' navbar__link--active' : '')}>
            My Orders
          </NavLink>
        </nav>

        {/* Email input */}
        <input
          className="navbar__email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          aria-label="Customer email"
        />

        {/* Cart button */}
        <button className="navbar__cart" onClick={() => navigate('/cart')} aria-label={`Cart, ${cartCount} items`}>
          <span className="navbar__cart-icon">🛍️</span>
          <span className="navbar__cart-label">Cart</span>
          {cartCount > 0 && (
            <span className="navbar__cart-badge">{cartCount}</span>
          )}
        </button>

        {/* Mobile menu toggle */}
        <button className="navbar__hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="navbar__mobile-menu">
          <NavLink to="/"       onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/orders" onClick={() => setMenuOpen(false)}>My Orders</NavLink>
          <NavLink to="/cart"   onClick={() => setMenuOpen(false)}>Cart ({cartCount})</NavLink>
          <input
            className="navbar__email navbar__email--mobile"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
      )}
    </header>
  );
}
