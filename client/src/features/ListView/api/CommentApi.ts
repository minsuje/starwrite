import { baseApi } from '../../../shared/api/BaseApi';
import { Annotation } from '../model/type';

// 댓글 생성
export const newCommentApi = async (data: Annotation) => {
  try {
    const response = await baseApi.post('/annotation', data);
    //console.log('newCommentApi', response.data);
    return response.data;
  } catch (error) {
    console.error('newCommentApi', error);
    throw error;
  }
};
