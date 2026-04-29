import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import ordersReducer from './slices/ordersSlice';
import productsReducer from './slices/productsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    cart:     cartReducer,
    orders:   ordersReducer,
    products: productsReducer,
    ui:       uiReducer,
  },
});
