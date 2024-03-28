import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface EditState {
  open: boolean;
}

const initialState: EditState = {
  open: false,
};

const EditSlice = createSlice({
  name: 'EditState',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const EditActions = EditSlice.actions;
export const EditState = (state: RootState) => state.EditState.open;
export const EditReducer = EditSlice.reducer;
