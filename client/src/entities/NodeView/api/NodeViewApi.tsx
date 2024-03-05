export const nodes = [
  { id: 'A', label: 'Node A', isShared: 5, url: 'http://www.google.com' },
  { id: 'B', label: 'Node B' },
  { id: 'C', label: 'Node C' },
  { id: 'D', label: 'Node D' },
  { id: 'E', label: 'Node E' },
  { id: 'F', label: 'Node F' },
  { id: 'G', label: 'Node G' },
  { id: 'H', label: 'Node H' },
  { id: 'I', label: 'Node I' },
  { id: 'J', label: 'Node J', isShared: 10, url: 'https://www.naver.com/' },
  { id: 'K', label: 'Node K' },
]; // 예시 노드 데이터
export const links = [
  { source: 'A', target: 'B' },
  { source: 'E', target: 'C' },
  { source: 'E', target: 'A' },
  { source: 'D', target: 'A' },
  { source: 'F', target: 'G' },
  { source: 'I', target: 'G' },
  { source: 'K', target: 'G' },
];
