import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export interface Node {
  id: string;
  group: number;
  // D3 Simulation에 필요한 속성들
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
  subject: any;
  active: any;
  alphaTarget: any;
}

// CustomNode와 Link 인터페이스 정의
export interface CustomNode {
  id: string;
  // D3 시뮬레이션에 필요한 기타 필드...
  x?: number;
  y?: number;
  fx?: number | null;
  fy?: number | null;
  label: string;
  url?: string;
  isShared?: number;
  connectedNodes?: string[];
}
export interface Link extends SimulationLinkDatum<CustomNode> {
  source: string | CustomNode;
  target: string | CustomNode;
  value?: number;
}

export interface SmallCircleData {
  parentNode: CustomNode;
  index: number;
  total: number;
}

// export interface SimulationNodeDatum {
//   id: any;
//   x?: number;
//   y?: number;
//   vx?: number;
//   vy?: number;
//   fx?: number | null;
//   fy?: number | null;
// }
