import { CustomNode, SmallCircleData, Link } from '../model/Types';

export const nodes: CustomNode[] = [
  {
    id: 'A',
    label: 'Node A',
    isShared: 5,
    url: 'http://www.google.com',
    userid_num: 1,
  },
  { id: 'B', label: '글제목1' },
  { id: 'C', label: '글제목2' },
  { id: 'D', label: '글제목3' },
  { id: 'E', label: '글제목4' },
  { id: 'F', label: '글제목5' },
  { id: 'G', label: '글제목6' },

  // { id: 'J', label: 'Node J', isShared: 10, url: 'https://www.naver.com/' },
]; // 예시 노드 데이터
export const links: Link[] = [
  { source: 'A', target: 'B' },
  { source: 'C', target: 'A' },
  { source: 'D', target: 'A' },
  { source: 'E', target: 'A' },
  { source: 'F', target: 'A' },
];
