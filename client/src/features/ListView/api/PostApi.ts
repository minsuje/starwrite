import { baseApi } from '../../../shared/api/BaseApi';

// 카테고리 선택시 글 리스트 불러오기
export const postListApi = async (category: string | undefined) => {
  try {
    const response = await baseApi.get(
      `/category/posts?categoryId=${category}`,
    );
    console.log('postListApi', response.data);
    return response.data;
  } catch (error) {
    console.error('postListApi Error', error);
    throw error;
  }
};
// 전체 글 불러오기
export const postListAllApi = async (nickname: string | undefined) => {
  try {
    const response = await baseApi.get(`/post/${nickname}/all`);
    console.log('postListAllApi', response.data);
    return response.data;
  } catch (error) {
    console.error('postListApiAll Error', error);
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

// 글 스크랩 하기
export const scrapPostApi = async (postid: number, category: string) => {
  try {
    const response = await baseApi.post('post/scrap', {
      postId: postid,
      category: category,
    });
    console.log('scrapPostApi', response);
    return response.data;
  } catch (error) {
    console.error('scrapPostApi', error);
    throw error;
  }
};
