import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, CustomNode } from '../model/Types';

export function NodeData() {
  const [nodesData, setNodesData] = useState<CustomNode[]>([]);
  const [linksData, setLinksData] = useState<Link[]>([]);

  interface CustomNode {
    id: string;
    label: string;
    isShared?: number;
    url: string;
    userid_num: number;
  }
  interface Link {
    source: string;
    target: string;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://52.79.228.200:8080/category/getCategoryPostNode?categoryId=0c487293-615e-4476-aba3-c1c5fac46b1c`,
        );

        console.log(response);

        // API 응답으로 받은 데이터를 상태에 저장
        setNodesData(response.data.nodes);
        setLinksData(response.data.links);
      } catch (error) {
        console.error('API Error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {nodesData.map((node) => (
          <li key={node.id}>
            {node.label} (User ID: {node.userid_num})
          </li>
        ))}
      </ul>
      <ul>
        {linksData.map((link, index) => (
          <li key={index}>
            {link.source} {link.target}
          </li>
        ))}
      </ul>
    </div>
  );
}
export const nodes: CustomNode[] = [
  {
    id: '1',
    label: 'Node 1',
    isShared: 1,
    url: 'http://example.com/1',
    userid_num: 1,
  },
  {
    id: '2',
    label: 'Node 2',
    isShared: 2,
    url: 'http://example.com/2',
    userid_num: 2,
  },
  {
    id: '3',
    label: 'Node 3',
    isShared: 3,
    url: 'http://example.com/3',
    userid_num: 3,
  },
  {
    id: '4',
    label: 'Node 4',
    isShared: 4,
    url: 'http://example.com/4',
    userid_num: 4,
  },
  {
    id: '5',
    label: 'Node 5',
    isShared: 5,
    url: 'http://example.com/5',
    userid_num: 5,
  },
];

// 링크 데이터
export const links: Link[] = [
  { source: '1', target: '2' },
  { source: '2', target: '3' },
  { source: '3', target: '4' },
  { source: '4', target: '5' },
  { source: '5', target: '1' }, // 예시로 마지막 노드가 첫 번째 노드와 연결되도록 추가
];
