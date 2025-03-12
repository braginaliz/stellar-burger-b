import { combinedOrderReducer, clearOrderState } from '../OrdersSlice'; 
import { createOrder, getUserOrders } from '../../action/AllActions';

const initialOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined,
};

const initialOrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const initialState = {
  order: initialOrderState,
  orders: initialOrdersState,
};

describe('combinedOrderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const state = combinedOrderReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен обрабатывать clearOrderState', () => {
    const state = combinedOrderReducer(initialState, clearOrderState());
    expect(state.order.orderRequest).toBe(false);
    expect(state.order.orderModalData).toBeNull();
    expect(state.order.error).toBeNull();
  });

  describe('createOrder', () => {
    it('должен обрабатывать createOrder.pending', () => {
      const action = { type: createOrder.pending.type };
      const state = combinedOrderReducer(initialState, action);
      expect(state.order.orderRequest).toBe(true);
      expect(state.order.error).toBe(null);
    });

    it('должен обрабатывать createOrder.fulfilled', () => {
      const mockOrder = { id: 1, name: 'Тестовый Заказ' };
      const action = { type: createOrder.fulfilled.type, payload: { order: mockOrder } };
      const state = combinedOrderReducer(initialState, action);
      expect(state.order.orderRequest).toBe(false);
      expect(state.order.orderModalData).toEqual(mockOrder);
      expect(state.order.error).toBe(null);
    });

    it('должен обрабатывать createOrder.rejected', () => {
      const errorMsg = 'Ошибка при создании заказа';
      const action = { type: createOrder.rejected.type, payload: errorMsg };
      const state = combinedOrderReducer(initialState, action);
      expect(state.order.orderRequest).toBe(false);
      expect(state.order.error).toBe(errorMsg);
    });
  });

  describe('getUserOrders', () => {
    it('должен обрабатывать getUserOrders.pending', () => {
      const action = { type: getUserOrders.pending.type };
      const state = combinedOrderReducer(initialState, action);
      expect(state.orders.loading).toBe(true);
      expect(state.orders.error).toBe(null);
    });

    it('должен обрабатывать getUserOrders.fulfilled', () => {
      const mockOrders = [{ id: 1, name: 'Заказ 1' }, { id: 2, name: 'Заказ 2' }];
      const action = { type: getUserOrders.fulfilled.type, payload: mockOrders };
      const state = combinedOrderReducer(initialState, action);
      expect(state.orders.loading).toBe(false);
      expect(state.orders.orders).toEqual(mockOrders);
    });

    it('должен обрабатывать getUserOrders.rejected', () => {
      const errorMsg = 'Ошибка при получении заказов';
      const action = { type: getUserOrders.rejected.type, payload: errorMsg };
      const state = combinedOrderReducer(initialState, action);
      expect(state.orders.loading).toBe(false);
      expect(state.orders.error).toBe(errorMsg);
    });
  });
});