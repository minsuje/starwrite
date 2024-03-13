export interface Node extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  url?: string;
}

export const nodes: Node[] = [
  {
    id: 'A',
    label: 'Node A',
    url: '/:userid_num/:category',
  },
  { id: 'B', label: 'Node B' },
  { id: 'C', label: 'Node A' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
  { id: 'D', label: 'Node D' },
];
