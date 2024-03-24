import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface state {
  state: boolean;
}

const initialState: state = {
  state: true,
};

const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const stateActions = stateSlice.actions;
export const resetState = (state: RootState) => state.state.state;
export const stateReducer = stateSlice.reducer;
