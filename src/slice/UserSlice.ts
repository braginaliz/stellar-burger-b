import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  registerUser,
  getUser,
  updateUser,
  loginUser,
  logoutUser
} from '../action/AllActions';

export interface IUserState {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialState: IUserState = {
  user: {
    name: '',
    email: ''
  },
  error: null,
  isLoading: false,
  isAuthenticated: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    getUserState: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getUserEmail: (state) => state.user?.email,
    getUserError: (state) => state.error,
    getUserAuth: (state) => state.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to register user';
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false;
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Failed to login user';
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
    });
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to get user';
        state.isAuthenticated = false;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to update user';
      });
  }
});

export const {
  getUserState,
  getUserAuth,
  getUserName,
  getUserEmail,
  getUserError
} = userSlice.selectors;

export const UserReducer = userSlice.reducer;
