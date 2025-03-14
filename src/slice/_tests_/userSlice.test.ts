import { UserReducer, initialState, IUserState } from '../UserSlice';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser
} from '../../action/AllActions';

describe('Срез пользователя', () => {
  it('должен возвращать начальное состояние', () => {
    const state = UserReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('должен обрабатывать registerUser в ожидании', () => {
    const action = { type: registerUser.pending.type };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать registerUser успешно', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: { user: { name: 'Pukin', email: 'pukin@example.com' } }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать registerUser с ошибкой', () => {
    const action = {
      type: registerUser.rejected.type,
      error: { message: 'Ошибка регистрации' }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка регистрации');
  });

  it('должен обрабатывать loginUser в ожидании', () => {
    const action = { type: loginUser.pending.type };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать loginUser успешно', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: { user: { name: 'Lukin', email: 'lukin@example.com' } }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать loginUser с ошибкой', () => {
    const action = {
      type: loginUser.rejected.type,
      error: { message: 'Ошибка входа' }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Ошибка входа');
  });

  it('должен обрабатывать logoutUser успешно', () => {
    const action = { type: logoutUser.fulfilled.type };
    const state = UserReducer(initialState, action);
    expect(state.user).toBe(null);
    expect(state.isAuthenticated).toBe(false);
  });

  it('должен обрабатывать getUser в ожидании', () => {
    const action = { type: getUser.pending.type };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать getUser успешно', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: { user: { name: 'Chukin', email: 'chukin@example.com' } }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(action.payload.user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('должен обрабатывать getUser с ошибкой', () => {
    const action = {
      type: getUser.rejected.type,
      error: { message: 'Ошибка получения пользователя' }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка получения пользователя');
    expect(state.isAuthenticated).toBe(false);
  });

  it('должен обрабатывать updateUser в ожидании', () => {
    const action = { type: updateUser.pending.type };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать updateUser успешно', () => {
    const initialStateWithUser = {
      ...initialState,
      user: { name: 'Pukin', email: 'pukin@example.com' },
      isAuthenticated: true
    };
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: { name: 'Mukin', email: 'mukin@example.com' } }
    };
    const state = UserReducer(initialStateWithUser, action);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(action.payload.user);
    expect(state.error).toBe(null);
  });

  it('должен обрабатывать updateUser с ошибкой', () => {
    const action = {
      type: updateUser.rejected.type,
      error: { message: 'Ошибка обновления' }
    };
    const state = UserReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка обновления');
  });
});
