import { baseApi } from '../../../shared/api/BaseApi';

// 카테고리 선택시 글 리스트 불러오기
export const postListApi = async (category: string | undefined) => {
  try {
    const response = await baseApi.get(`http://52.79.228.200:8080/${category}`);
    console.log('postListApi', response.data);
    return response.data;
  } catch (error) {
    console.error('postListApi Error', error);
    throw error;
  }
};

// 글 하나 선택시 내용 불러오기
export const postDetailApi = async (postid: number) => {
  try {
    const response = await baseApi.get(`post/detail/${postid}`);
    console.log('postDetailApi', response.data);
    return response.data;
  } catch (error) {
    console.error('postDetailApi Error', error);
    throw error;
  }
};

// 글 수정
export const patchPostApi = async (postid: number, data: string) => {
  try {
    const response = await baseApi.patch(`localhost/${postid}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('patchPostApi Error', error);
    throw error;
  }
};

// 글 삭제
export const deletePostApi = async (postid: number) => {
  try {
    const response = await baseApi.delete(`/post/delete/${postid}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('deletePostApi Error', error);
    throw error;
  }
};
