import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

// 초기 노드와 링크 데이터
const initialNodes = [
  { id: '1', group: 1, label: 'Node 1' },
  { id: '2', group: 1, label: 'Node 2' },
  { id: '3', group: 2, label: 'Node 3' },
  { id: '4', group: 2, label: 'Node 4' },
  { id: '5', group: 3, label: 'Node 5' },
  { id: '6', group: 3, label: 'Node 6' },
  { id: '7', group: 3, label: 'Node 6' },
  { id: '8', group: 3, label: 'Node 6' },
  { id: '9', group: 3, label: 'Node 6' },
  { id: '10', group: 3, label: 'Node 6' },
  { id: '11', group: 3, label: 'Node 6' },
  { id: '12', group: 3, label: 'Node 6' },
  { id: '13', group: 3, label: 'Node 6' },
  { id: '14', group: 3, label: 'Node 6' },
  { id: '15', group: 3, label: 'Node 6' },
  { id: '16', group: 3, label: 'Node 6' },
  { id: '17', group: 3, label: 'Node 6' },
  { id: '18', group: 3, label: 'Node 6' },
  { id: '19', group: 3, label: 'Node 6' },
  { id: '20', group: 3, label: 'Node 6' },
  { id: '21', group: 3, label: 'Node 6' },
  { id: '22', group: 3, label: 'Node 6' },
  { id: '23', group: 3, label: 'Node 6' },
  { id: '24', group: 3, label: 'Node 6' },
  { id: '25', group: 3, label: 'Node 6' },
  { id: '26', group: 3, label: 'Node 6' },
  { id: '27', group: 3, label: 'Node 6' },
  { id: '28', group: 3, label: 'Node 6' },
];

const initialLinks = [
  { source: '1', target: '2', value: 1 },
  { source: '2', target: '3', value: 1 },
  { source: '3', target: '4', value: 1 },
  { source: '5', target: '6', value: 1 },
  { source: '6', target: '7', value: 1 },
  { source: '7', target: '8', value: 1 },
  { source: '9', target: '10', value: 1 },
  { source: '10', target: '11', value: 1 },
  { source: '12', target: '13', value: 1 },
  { source: '14', target: '15', value: 1 },
  { source: '16', target: '17', value: 1 },
  { source: '18', target: '10', value: 1 },
];

export function MainPageD3() {
  const svgRef = useRef(null);
  const [viewportSize] = useState({
    width: 1000,
    height: 1000,
  });

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', viewportSize.width)
      .attr('height', viewportSize.height);
    svg.selectAll('*').remove();

    const group = svg.append('g');

    const zoomHandler = d3.zoom().on('zoom', (event) => {
      group.attr('transform', event.transform);
    });
    svg.call(zoomHandler).call(zoomHandler.transform, d3.zoomIdentity.scale(1));

    const simulation = d3
      .forceSimulation(initialNodes)
      .force(
        'link',
        d3.forceLink(initialLinks).id((d) => d.id),
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force(
        'center',
        d3.forceCenter(viewportSize.width / 2, viewportSize.height / 2),
      )
      .force(
        'radial',
        d3.forceRadial(10, window.innerWidth / 2, window.innerHeight / 2),
      )
      .force('collide', d3.forceCollide().radius(5))
      .alphaDecay(0.00008);

    const link = group
      .append('g')
      .selectAll('line')
      .data(initialLinks)
      .join('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))
      .attr('stroke', '#999')
      .style('opacity', 0.6);

    const node = group
      .append('g')
      .selectAll('image')
      .data(initialNodes)
      .enter()
      .append('image')
      .attr('width', 35)
      .attr('height', 35)
      .attr('href', (d) => (d.scrap ? '/star_scrap.svg' : '/star.svg'));

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    node.call(drag(simulation));

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('x', (d) => d.x - 17.5).attr('y', (d) => d.y - 17.5);
    });
  }, [viewportSize]); // 여기에서 빠진 부분을 닫습니다

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '50%',
      }}
    >
      <svg
        ref={svgRef}
        style={{ width: '100%', height: '100%' }}
        viewBox="0 0 1000 1000"
      ></svg>
    </div>
  );
}
