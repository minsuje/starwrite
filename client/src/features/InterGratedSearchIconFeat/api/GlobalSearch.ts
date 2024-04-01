import { baseApi } from '../../../shared/api/BaseApi';

export const fetchDataGlobalSearch = async (searchTerm: string) => {
  try {
    const response = await baseApi.get(`/post/search?title=${searchTerm}`);
    //console.log('통합검색 >>>>', searchTerm);
    return response.data;
  } catch (error) {
    console.error('API ERROR', error);
  }
};
