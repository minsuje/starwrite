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
  { id: 'C', label: 'Node C', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node E', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node F', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node G', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node H', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '과학' },
  { id: 'D', label: 'Node D', userid_num: 1, category: '과학' },
];

// 각각 nodes 객체에 url를 동적으로 추가한다.
nodes.forEach((node) => {
  node.url = `/user/starwrite/nodeview/${node.userid_num}/${node.category}`;
});

console.log(nodes);
