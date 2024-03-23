import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/ListView/model/CategoriesSlice';

const store = configureStore({
  reducer: {
    // 여기에 추가
    categories: categoriesReducer,
  },
});

export default store;
