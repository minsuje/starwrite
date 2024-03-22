import { baseApi } from '../../../shared/api/BaseApi';
import { NewPost } from '../model/types';

// 글 저장 하기
export const newPostApi = async (data: NewPost) => {
  try {
    // const myNickname = localStorage.getItem('nickname');
    const response = await baseApi.post(`/post`, data);
    console.log('newPostApi', response.data);
    // window.location.href = `/user/starwrite/listview/main/${myNickname}/all`;
    return response.data;
  } catch (error) {
    console.error(`newPostApi Error`, error);
    throw error;
  }
};
export const patchPostApi = async (data: NewPost, id: number) => {
  try {
    const response = await baseApi.patch(`/post/${id}`, data);
    console.log('patchPostApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`patchPostApi Error`, error);
    throw error;
  }
};

// 글 임시저장 하기(post 새로 생길 때)
export const newSavingApi = async (data: NewPost) => {
  try {
    const response = await baseApi.post(`/post/save`, data);
    console.log('newSavingApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`newSavingApi Error`, error);
    throw error;
  }
};
export const patchSavingApi = async (data: NewPost, postid: number) => {
  try {
    const response = await baseApi.patch(`/post/save/${postid}`, data);
    console.log('patchSavingApi', response.data);
    return response.data;
  } catch (error) {
    console.error(`patchSavingApi Error`, error);
    throw error;
  }
};

// 임시저장된 글 리스트 불러오기
export const savingsApi = async () => {
  try {
    const response = await baseApi.get(`/post/all/save`);
    console.log(`savingsApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`savingsApi Error`, error);
    throw error;
  }
};

// 임시저장된 글 불러오기
export const getsavingApi = async (id: number) => {
  try {
    const response = await baseApi.get(`/post/all/save/${id}`);
    console.log(`getsavingApi`, response);
    return response.data;
  } catch (error) {
    console.error(`getsavingApi Error`, error);
    throw error;
  }
};

//글 목록 불러오기
export const getTitleApi = async () => {
  try {
    const response = await baseApi.get(`/post/write`);
    console.log(`getTitleApi`, response.data);
    return response.data;
  } catch (error) {
    console.error(`getTitleApi Error`, error);
    throw error;
  }
};
