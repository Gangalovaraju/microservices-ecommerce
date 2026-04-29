import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { inventoryApi } from '../../api/apiClient';

export const fetchProducts = createAsyncThunk(
  'products/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const res = await inventoryApi.getAll();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to load products');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCategory: 'All',
  },
  reducers: {
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending,   state => { state.loading = true;  state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  },
});

export const { setCategory } = productsSlice.actions;

export const selectProducts         = state => state.products.items;
export const selectProductsLoading  = state => state.products.loading;
export const selectProductsError    = state => state.products.error;
export const selectSelectedCategory = state => state.products.selectedCategory;
export const selectCategories       = state => {
  const cats = ['All', ...new Set(state.products.items.map(p => p.category).filter(Boolean))];
  return cats;
};
export const selectFilteredProducts = state => {
  const { items, selectedCategory } = state.products;
  return selectedCategory === 'All' ? items : items.filter(p => p.category === selectedCategory);
};

export default productsSlice.reducer;
