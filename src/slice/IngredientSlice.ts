import { createSlice } from '@reduxjs/toolkit';

import { TIngredient } from '../utils/types';
import { fetchIngredients } from '../action/AllActions';

type TIngredientsState = {
  items: TIngredient[];
  isLoad: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  items: [],
  isLoad: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoad = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoad = false;
        state.items = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoad = false;
        state.error = action.error?.message || 'Failed to fetch ingredients';
      });
  },

  selectors: {
    isLoadState: (state) => state.isLoad,
    getIngredients: (state) => state.items
  }
});

export const { isLoadState, getIngredients } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
