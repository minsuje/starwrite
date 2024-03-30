import { configureStore } from '@reduxjs/toolkit';
import { categoriesReducer } from '../features/ListView/model/CategoriesSlice';
import { categoryReducer } from '../features/ListView/model/CategorySlice';
import { stateReducer } from '../features/ListView/model/StateSlice';
import { commentStateReducer } from '../features/ListView/model/CommentSlice';
import { EditReducer } from '../features/ListView/model/EditSlice';

const store = configureStore({
  reducer: {
    categories: categoriesReducer, // 카테고리 리스트
    category: categoryReducer, // 글 생성 시 현재 카테고리 전달
    state: stateReducer, // 카테고리 리스트 재렌더링
    commentState: commentStateReducer, // 댓글 재렌더링
    EditState: EditReducer, // 카테고리 수정
  },
});

export default store;
