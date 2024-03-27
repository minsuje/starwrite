import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/ListView/model/CategoriesSlice';
import { categoryReducer } from '../features/ListView/model/CategorySlice';
import { stateReducer } from '../features/ListView/model/StateSlice';
import { commentStateReducer } from '../features/ListView/model/CommentSlice';

const store = configureStore({
  reducer: {
    // 여기에 추가
    categories: categoriesReducer,
    category: categoryReducer,
    state: stateReducer,
    commentState: commentStateReducer,
  },
});

export default store;
