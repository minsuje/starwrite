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

// export interface Node {
//   id: string;
//   group: number;
//   // D3 Simulation에 필요한 속성들
//   x?: number;
//   y?: number;
//   vx?: number;
//   vy?: number;
//   fx?: number | null;
//   fy?: number | null;

// }

// // CustomNode와 Link 인터페이스 정의
// export interface CustomNode {
//   id: string;
//   // D3 시뮬레이션에 필요한 기타 필드...
//   x?: number;
//   y?: number;
//   fx?: number | null;
//   fy?: number | null;
//   label: string;
//   url?: string;
//   isShared?: number;
//   connectedNodes?: string[];
//   userid?: number; // 사용자 ID 필드 추가
//   category?: string; // 카테고리 필드 추가
//   userid_num?: number;
//   source?: any;
//   target?: string;
// }
// export interface Link extends SimulationLinkDatum<CustomNode> {
//   source: string | CustomNode;
//   target: string | CustomNode;
//   value?: number;
//   a?: string;
//   b?: string;
// }

// export interface SmallCircleData {
//   parentNode: CustomNode;
//   index: number;
//   total: number;
// }

// export interface SimulationNodeDatum {
//   id: any;
//   x?: number;
//   y?: number;
//   vx?: number;
//   vy?: number;
//   fx?: number | null;
//   fy?: number | null;
// }
