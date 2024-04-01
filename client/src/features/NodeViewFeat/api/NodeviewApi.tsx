import { Link, CustomNode } from '../model/Types';
import { baseApi } from '../../../shared/api/BaseApi';

export const nodes: CustomNode[] = [
  // {
  //   id: '1',
  //   label: 'Node 1',
  //   isShared: 1,
  //   url: 'http://example.com/1',
  //   userid_num: 1,
  // },
];

// 링크 데이터
export const links: Link[] = [
  // { source: '1', target: '2' url },
  // { source: '2', target: '3' },
];

//52.79.228.200

export const fetchData = async (category: string | undefined) => {
  try {
    const response = await baseApi.get(
      `/category/getCategoryPostNode?categoryId=${category}`,
    );
    //console.log('response', response);
    return response.data;
  } catch (error) {
    console.error('API Error', error);
    throw new Error('Failed to fetch data');
  }
};
