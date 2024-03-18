import axios from 'axios';

// 카테고리 리스트 axios
export const getCategoriesApi = async (user: string) => {
  try {
    const response = await axios.get(`localhost/${user}`);
    console.log('getCategoriesApi', response.data);
    return response.data;
  } catch (error) {
    console.error('getCategories Error', error);
    throw error;
  }
};
// 카테고리 추가 axios post
export const newCategoryApi = async (name: string) => {
  try {
    const response = await axios.post('/category', name);
    console.log('newCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('newCategoryApi Error', error);
    throw error;
  }
};

// 카테고리 이름 수정 axios
export const patchCategoryApi = async (name: string) => {
  try {
    const response = await axios.patch('localhost', name);
    console.log('patchCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('patchCategoryApiError', error);
    throw error;
  }
};

// 카테고리 삭제 axios
export const deleteCategoryApi = async (name: string) => {
  try {
    const response = await axios.delete(`localhost/${name}`);
    console.log('deleteCategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('deleteCategoryError', error);
    throw error;
  }
};
