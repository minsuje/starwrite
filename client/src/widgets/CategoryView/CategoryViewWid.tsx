import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nodes } from '../../widgets/CategoryView/index';

export function CategoryViewWid({ searchTerm }: any) {
  const navigate = useNavigate();
  const { userid_num } = useParams();
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth - 100,
    height: window.innerHeight - 100,
  });

  useEffect(() => {
    // 화면 크기 변화 감지를 위한 resize 이벤트 리스너 등록
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth - 100,
        height: window.innerHeight - 100,
      });
    };

    window.addEventListener('resize', handleResize);

    // 이벤트 리스너 정리
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 기존 SVG 내용을 초기화
    svg.attr('width', viewportSize.width).attr('height', viewportSize.height);
    const group = svg.append('g');

    const zoomHandler = d3.zoom().on('zoom', (event) => {
      group.attr('transform', event.transform);
    });

    (svg as any).call(zoomHandler); // 줌 핸들러를 SVG 요소에 적용

    // 초기 줌 스케일 설정 (예: 0.8로 줌 아웃)
    (svg as any).call(zoomHandler.transform, d3.zoomIdentity.scale(0.7));

    const node = group
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      // .attr('transform', 'translate(-17.5, -.5)')
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        if (d.url) {
          navigate('/starwrite/nodeview/:userid_num/:category');
        }
      });

    node.append('circle').attr('r', 26).attr('fill', 'skyblue');

    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .text((d) => d.label)
      .attr('y', 4);

    const simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-20));

    simulation.force(
      'center',
      d3.forceCenter(viewportSize.width / 1.2, viewportSize.height / 1.5),
    );

    simulation.on('tick', () => {
      node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    });
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
      }}
    >
      <svg
        ref={svgRef}
        width="100%"
        height={viewportSize.height}
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          width: '100%',
        }}
      ></svg>
    </div>
  );
}
