import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredProducts,
  selectProductsLoading,
  selectProductsError,
  selectCategories,
  selectSelectedCategory,
  setCategory,
  fetchProducts,
} from '../store/slices/productsSlice';
import ProductCard from '../components/common/ProductCard';
import '../App.css';
import './ShopPage.css';

export default function ShopPage() {
  const dispatch   = useDispatch();
  const products   = useSelector(selectFilteredProducts);
  const loading    = useSelector(selectProductsLoading);
  const error      = useSelector(selectProductsError);
  const categories = useSelector(selectCategories);
  const selected   = useSelector(selectSelectedCategory);

  if (loading) return (
    <div className="page">
      <div className="spinner-wrap"><div className="spinner" /></div>
    </div>
  );

  if (error) return (
    <div className="page">
      <div className="error-banner">
        ⚠️ {error} — Make sure the backend services are running.
        <button className="error-banner__close" onClick={() => dispatch(fetchProducts())}>Retry</button>
      </div>
    </div>
  );

  return (
    <div className="page">

      {/* Hero */}
      <div className="shop-hero">
        <div className="shop-hero__text">
          <h1 className="shop-hero__title">Discover Premium Tech</h1>
          <p className="shop-hero__sub">
            Curated selection of laptops, phones, audio, and more — powered by microservices.
          </p>
        </div>
        <div className="shop-hero__stats">
          <div className="shop-hero__stat">
            <span className="shop-hero__stat-num">{products.length}</span>
            <span className="shop-hero__stat-label">Products</span>
          </div>
          <div className="shop-hero__stat">
            <span className="shop-hero__stat-num">{categories.length - 1}</span>
            <span className="shop-hero__stat-label">Categories</span>
          </div>
        </div>
      </div>

      {/* Category filter tabs */}
      <div className="category-tabs" role="tablist" aria-label="Product categories">
        {categories.map(cat => (
          <button
            key={cat}
            role="tab"
            aria-selected={selected === cat}
            className={`category-tab ${selected === cat ? 'category-tab--active' : ''}`}
            onClick={() => dispatch(setCategory(cat))}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      {products.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__icon">🔍</div>
          <div className="empty-state__title">No products found</div>
          <div className="empty-state__desc">Try selecting a different category.</div>
        </div>
      ) : (
        <div className="product-grid">
          {products.map(p => (
            <ProductCard key={p.skuCode} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
