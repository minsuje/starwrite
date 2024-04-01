import { baseApi } from '../../../shared/api/BaseApi';

// 카테고리 리스트 axios
export const getCategoriesApi = async (nickname: string) => {
  try {
    const response = await baseApi.get(`/category/user?nickname=${nickname}`);
    //console.log('getCategoriesApi', response.data);
    return response.data;
  } catch (error) {
    console.error('getCategories Error', error);
    throw error;
  }
};

// 카테고리 추가 axios post
export const newCategoryApi = async (name: string) => {
  try {
    const response = await baseApi.post('/category', { name: name });
    //console.log('newCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('newCategoryApi Error', error);
    throw error;
  }
};
interface PatchName {
  name: string | undefined;
  categoryId: string | undefined;
}

// 카테고리 이름 수정 axios
export const patchCategoryApi = async (data: PatchName) => {
  try {
    const response = await baseApi.patch('/category', data);
    //console.log('patchCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('patchCategoryApiError', error);
    throw error;
  }
};

// 카테고리 삭제 axios
export const deleteCategoryApi = async (id: string) => {
  try {
    const response = await baseApi.delete(`/category?categoryId=${id}`);
    //console.log('deleteCategoryApi', response.data);
    alert('카테고리 삭제가 완료되었습니다.');
    return response.data;
  } catch (error) {
    console.error('deleteCategoryError', error);
    throw error;
  }
};
