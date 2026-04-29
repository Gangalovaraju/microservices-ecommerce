import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    customerEmail: '',
    notification: null,   // { type: 'success'|'error'|'info', message }
  },
  reducers: {
    setEmail(state, action) {
      state.customerEmail = action.payload;
    },
    showNotification(state, action) {
      state.notification = action.payload;
    },
    clearNotification(state) {
      state.notification = null;
    },
  },
});

export const { setEmail, showNotification, clearNotification } = uiSlice.actions;

export const selectEmail        = state => state.ui.customerEmail;
export const selectNotification = state => state.ui.notification;

export default uiSlice.reducer;
