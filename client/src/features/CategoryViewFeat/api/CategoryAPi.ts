import { baseApi } from '../../../shared/api/BaseApi';

// 카테고리 선택시 글 리스트 불러오기
export const CategoryApi = async (category: string) => {
  try {
    const response = await baseApi.get(
      `/category/${category}/getCategoryPostNode`,
    );
    console.log('CategoryApi', response.data);
    return response.data;
  } catch (error) {
    console.error('CategoryApi Error', error);
    throw error;
  }
};

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  url?: string;
  userid_num?: number;
  category?: string;
}

export const nodes: Node[] = [
  {
    id: 'A',
    label: 'Node A',
    userid_num: 1,
    category: '과학',
    // url: `/user/starwrite/nodeview/:userid_num/${this.category}`,
  },
  { id: 'B', label: 'Node B', userid_num: 2, category: '수학' },
  { id: 'C', label: 'Node C', userid_num: 1, category: '수' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '테' },
  { id: 'D', label: 'Node E', userid_num: 1, category: '스' },
  { id: 'D', label: 'Node F', userid_num: 1, category: '트' },
  { id: 'D', label: 'Node G', userid_num: 1, category: '과' },
  { id: 'D', label: 'Node H', userid_num: 1, category: '월' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '화' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '수' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '목' },
];

// 각각 nodes 객체에 url를 동적으로 추가한다.
// nodes.forEach((node) => {
//   node.url = `/user/starwrite/nodeview/${node.userid_num}/${node.category}`;
// });

// const nickname = localStorage.getItem('nickname');
export const fetchDataCategory = async (nickname: string) => {
  try {
    const response = await baseApi.get(`/category/user?nickname=${nickname}`, {
      // headers: {
      //   Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
      // },
    });
    return response.data;

    // API 응답으로 받은 데이터를 상태에 저장
  } catch (error) {
    console.error('API Error', error);
  }
};
