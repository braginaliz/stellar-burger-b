import { createSlice } from '@reduxjs/toolkit';
import { TFeedState } from '@utils-types';
import { fetchFeeds } from '../action/AllActions';

export const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
  selectors: {
    getOrders: (state) => state.orders,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  }
});

export const { getOrders, getTotal, getTotalToday } = feedSlice.selectors;
export const feedsReducer = feedSlice.reducer;
