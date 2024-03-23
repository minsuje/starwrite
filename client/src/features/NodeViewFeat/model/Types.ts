import { SimulationLinkDatum, SimulationNodeDatum } from 'd3';

export interface CustomNode extends SimulationNodeDatum {
  id: string;
  url?: string;
  x?: number;
  y?: number;
  label: string;
  isShared?: number;
  postId: number;
  title: string;
  posts: string[];
  recentView: string;
  opacity: number;
}

export interface Link extends SimulationLinkDatum<CustomNode> {
  source: string | CustomNode; // source 프로퍼티는 string 타입의 ID 또는 CustomNode 객체
  target: string | CustomNode; // target 프로퍼티는 string 타입의 ID 또는 CustomNode 객체
  value?: number;
  postId: number;
  relatedPostId: number;
}

export interface ExtendedCustomNode extends CustomNode {
  isShared?: number; // 'isShared' 프로퍼티는 연결된 노드의 수를 나타내는 숫자입니다.
}

// smallCirclesData 배열에 들어갈 객체를 위한 인터페이스
export interface SmallCircleData {
  parentNode: ExtendedCustomNode; // 부모 노드
  index: number; // 현재 원의 인덱스
  total: number; // 전체 원의 수
}

export interface searchNode {
  posts: [];
  relation: [];
}
