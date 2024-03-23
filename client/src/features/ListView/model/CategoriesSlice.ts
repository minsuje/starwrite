import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../../../shared/model';

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
});

export const categoriesActions = categoriesSlice.actions;
export const collectCategories = (state: RootState) =>
  state.categories.categories;
export const categoriesReducer = categoriesSlice.reducer;
