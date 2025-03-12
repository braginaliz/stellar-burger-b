import { createSlice } from '@reduxjs/toolkit';

import { TOrder } from '@utils-types';
import { createOrder, getUserOrders } from '../action/AllActions';

interface OrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null | undefined;
}

interface OrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

export const initialOrderState: OrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const initialOrdersState: OrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const combinedOrderSlice = createSlice({
  name: 'combinedorder',
  initialState: {
    order: initialOrderState,
    orders: initialOrdersState
  },
  reducers: {
    clearOrderState: (state) => {
      state.order.orderRequest = false;
      state.order.orderModalData = null;
      state.order.error = null;
    }
  },
  extraReducers: (builder) => {
    // Order reducers
    builder
      .addCase(createOrder.pending, (state) => {
        state.order.orderRequest = true;
        state.order.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order.orderRequest = false;
        state.order.orderModalData = action.payload.order;
        state.order.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.order.orderRequest = false;
        state.order.error = action.payload as string;
      })
      // Orders reducers

      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders.loading = false;
        state.orders.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.orders.loading = false;
        state.orders.error = action.payload as string;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.orders.loading = true;
        state.orders.error = null;
      });
  },
  selectors: {
    getOrderRequest: (state) => state.order.orderRequest,
    getOrderModalData: (state) => state.order.orderModalData,
    getOrders: (state) => state.orders.orders
  }
});

export const { clearOrderState } = combinedOrderSlice.actions;
export const { getOrderRequest, getOrderModalData, getOrders } =
  combinedOrderSlice.selectors;

export const combinedOrderReducer = combinedOrderSlice.reducer;
