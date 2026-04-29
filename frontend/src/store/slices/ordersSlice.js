import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersApi } from '../../api/apiClient';

export const placeOrder = createAsyncThunk(
  'orders/place',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await ordersApi.place(payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Order placement failed');
    }
  }
);

export const fetchOrdersByEmail = createAsyncThunk(
  'orders/fetchByEmail',
  async (email, { rejectWithValue }) => {
    try {
      const res = await ordersApi.getByEmail(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load orders');
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    list: [],
    lastOrder: null,
    loading: false,
    placing: false,
    error: null,
  },
  reducers: {
    clearLastOrder(state) { state.lastOrder = null; },
    clearOrderError(state) { state.error = null; },
  },
  extraReducers: builder => {
    builder
      // Place order
      .addCase(placeOrder.pending,   state => { state.placing = true; state.error = null; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placing   = false;
        state.lastOrder = action.payload;
      })
      .addCase(placeOrder.rejected,  (state, action) => {
        state.placing = false;
        state.error   = action.payload;
      })
      // Fetch orders
      .addCase(fetchOrdersByEmail.pending,   state => { state.loading = true; state.error = null; })
      .addCase(fetchOrdersByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.list    = action.payload;
      })
      .addCase(fetchOrdersByEmail.rejected,  (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { clearLastOrder, clearOrderError } = ordersSlice.actions;

export const selectOrders    = state => state.orders.list;
export const selectLastOrder = state => state.orders.lastOrder;
export const selectPlacing   = state => state.orders.placing;
export const selectOrdersLoading = state => state.orders.loading;
export const selectOrdersError   = state => state.orders.error;

export default ordersSlice.reducer;
