import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  category: string;
}

const initialState: CategoryState = {
  category: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export const currentCategory = (state: RootState) => state.category.category;
export const categoryReducer = categorySlice.reducer;
