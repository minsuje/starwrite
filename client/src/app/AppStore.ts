import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/ListView/model/CategoriesSlice';
import { categoryReducer } from '../features/ListView/model/CategorySlice';
import { stateReducer } from '../features/ListView/model/StateSlice';

const store = configureStore({
  reducer: {
    // 여기에 추가
    categories: categoriesReducer,
    category: categoryReducer,
    state: stateReducer,
  },
});

export default store;
