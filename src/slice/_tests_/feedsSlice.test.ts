import { feedsReducer, initialState } from '../FeedSlice';
import { fetchFeeds } from '../../action/AllActions';

describe('feedSlice', () => {
  it('должен вернуть начальное состояние', () => {
    expect(feedsReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('должен обрабатывать fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fetchFeeds.fulfilled', () => {
    const mockPayload = {
      orders: [{ id: 1, name: 'Заказ 1' }],
      total: 5,
      totalToday: 2
    };
    const action = { type: fetchFeeds.fulfilled.type, payload: mockPayload };
    const state = feedsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.totalToday).toBe(mockPayload.totalToday);
    expect(state.error).toBeNull();
  });

  it('должен обрабатывать fetchFeeds.rejected', () => {
    const mockError = 'Не удалось получить фиды';
    const action = { type: fetchFeeds.rejected.type, payload: mockError };
    const state = feedsReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(mockError);
  });
});
