import { baseApi } from '../../../shared/api/BaseApi';

// 댓글 생성
// export const newCommentApi = async () => {
//   try {
//     const response = await baseApi.put('/category', id);
//     console.log('patchCategoryApi', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('patchCategoryApiError', error);
//     throw error;
//   }
// };

interface Annotation {
  annotation: {
    position: number;
    content: string;
    isWriter: boolean;
    type: string;
  };
  userId: string; //?
  postId: number;
}
// 댓글 생성
export const newCommentApi = async (data: Annotation) => {
  try {
    const response = await baseApi.post('/annotation', data);
    console.log('newCommentApi', response.data);
    return response.data;
  } catch (error) {
    console.error('newCommentApi', error);
    throw error;
  }
};
