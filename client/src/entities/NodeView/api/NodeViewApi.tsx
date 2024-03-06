import { CustomNode, SmallCircleData, Link } from '../model/Types';

export const nodes: CustomNode[] = [
  {
    id: 'A',
    label: 'Node A',
    isShared: 5,
    url: 'http://www.google.com',
    connectedNodes: ['B'],
  },
  { id: 'B', label: 'Node B', connectedNodes: ['A'] },
  { id: 'C', label: 'Node C' },
  // { id: 'J', label: 'Node J', isShared: 10, url: 'https://www.naver.com/' },
]; // 예시 노드 데이터
export const links: Link[] = [{ source: 'A', target: 'B' }];
