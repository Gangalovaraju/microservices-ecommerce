import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.items.find(i => i.skuCode === product.skuCode);
      if (existing) {
        existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter(i => i.skuCode !== action.payload);
    },
    updateQty(state, action) {
      const { skuCode, qty } = action.payload;
      const item = state.items.find(i => i.skuCode === skuCode);
      if (item) {
        if (qty <= 0) state.items = state.items.filter(i => i.skuCode !== skuCode);
        else item.qty = qty;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems      = state => state.cart.items;
export const selectCartCount      = state => state.cart.items.reduce((s, i) => s + i.qty, 0);
export const selectCartTotal      = state =>
  state.cart.items.reduce((s, i) => s + i.price * i.qty, 0);

export default cartSlice.reducer;
