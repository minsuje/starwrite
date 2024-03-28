import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  category: string;
  name: string | undefined;
}

const initialState: CategoryState = {
  category: '',
  name: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    name: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    },
  },
});

export const categoryActions = categorySlice.actions;
export const currentCategory = (state: RootState) => state.category.category;
export const currentName = (state: RootState) => state.category.name;
export const categoryReducer = categorySlice.reducer;
