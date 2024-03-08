import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  // 다른 필요한 커스텀 속성들을 여기에 추가할 수 있습니다.
}
const navigate = useNavigate();
const { userid_num } = useParams();

export function CategoryViewWid() {
  const svgRef = useRef<SVGSVGElement>(null);

  const nodes: Node[] = [{ id: 'A' }, { id: 'B' }, { id: 'C' }, { id: 'D' }]; //
  useEffect(() => {
    const width = 1000;
    const height = 600;
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const nodeSelection = svg
      .selectAll('g')
      .data(nodes)
      .join('g')
      .each(function (d) {
        const selection = d3.select(this);
        selection
          .append('circle')
          .attr('r', 26)
          .attr('fill', 'skyblue')
          .on('click', () => navigate(`/nodeview/${userid_num}/:category`));
        selection
          .append('text')
          .text((d) => d.id)
          .attr('x', -5)
          .attr('y', 5);
      });

    const simulation = d3
      .forceSimulation(nodes) // Node[] 타입의 nodes 사용
      .force('charge', d3.forceManyBody().strength(-15))
      .force('center', d3.forceCenter(width / 2, height / 2));

    simulation.on('tick', () => {
      nodeSelection.attr(
        'transform',
        (d) => `translate(${d.x ?? 0}, ${d.y ?? 0})`,
      );
    });
  }, [nodes]);

  return <svg ref={svgRef} />;
}
