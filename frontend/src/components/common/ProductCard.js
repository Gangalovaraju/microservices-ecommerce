import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { showNotification } from '../../store/slices/uiSlice';
import './ProductCard.css';

const CATEGORY_ICONS = {
  Laptops: '💻', Phones: '📱', Audio: '🎧',
  Tablets: '📲', Wearables: '⌚', Accessories: '🖱️',
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inStock  = product.quantity > 0;

  const handleAdd = () => {
    if (!inStock) return;
    dispatch(addToCart({
      skuCode:     product.skuCode,
      productName: product.productName,
      price:       product.price,
      category:    product.category,
    }));
    dispatch(showNotification({
      type: 'success',
      message: `"${product.productName}" added to cart`,
    }));
  };

  return (
    <article className={`product-card ${!inStock ? 'product-card--oos' : ''}`}>
      {/* Category badge */}
      <div className="product-card__top">
        <span className="product-card__category">
          {CATEGORY_ICONS[product.category] || '📦'} {product.category}
        </span>
        {!inStock && <span className="product-card__oos-badge">Out of Stock</span>}
        {inStock && product.quantity <= 5 && (
          <span className="product-card__low-badge">Only {product.quantity} left</span>
        )}
      </div>

      {/* Product name */}
      <h3 className="product-card__name">{product.productName}</h3>

      {/* Description */}
      {product.description && (
        <p className="product-card__desc">{product.description}</p>
      )}

      {/* Footer */}
      <div className="product-card__footer">
        <div>
          <div className="product-card__price">${Number(product.price).toFixed(2)}</div>
          <div className="product-card__stock">
            {inStock ? `${product.quantity} in stock` : 'Unavailable'}
          </div>
        </div>
        <button
          className="product-card__btn"
          onClick={handleAdd}
          disabled={!inStock}
          aria-label={`Add ${product.productName} to cart`}
        >
          {inStock ? '+ Add' : 'Sold Out'}
        </button>
      </div>
    </article>
  );
}
