import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CommentState {
  state: boolean;
}

const initialState: CommentState = {
  state: true,
};

const commentStateSlice = createSlice({
  name: 'commentState',
  initialState,
  reducers: {
    reset: (state, action: PayloadAction<boolean>) => {
      state.state = action.payload;
    },
  },
});

export const commentStateActions = commentStateSlice.actions;
export const commentState = (state: RootState) => state.commentState.state;
export const commentStateReducer = commentStateSlice.reducer;
