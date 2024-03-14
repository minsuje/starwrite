import * as d3 from 'd3';
import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { nodes } from '../../widgets/CategoryView/index';

const _SyledContainer = styled.div`
  display: 'flex';
  width: '100%';
`;

export function CategoryViewWid({ searchTerm }: any) {
  const navigate = useNavigate();
  const { userid_num } = useParams();
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const simulationRef = useRef<d3.Simulation<
    d3.SimulationNodeDatum,
    undefined
  > | null>(null);

  // console.log(searchTerm);
  useEffect(() => {
    // 화면 크기 변화 감지를 위한 resize 이벤트 리스너 등록
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
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
    (svg as any).call(zoomHandler.transform, d3.zoomIdentity.scale(0.6));

    // 드래그 이벤트 핸들러 생성
    // 노드에 드래그 기능 적용
    const dragHandler = d3
      .drag<SVGImageElement, any>()
      .on('start', function (event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', function (event, d) {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', function (event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    // 요소에 드래그 기능 연결

    const node = group
      .selectAll('.node')
      .attr('class', 'node')
      .data(nodes)
      .enter()
      .append('g')
      // .attr('transform', 'translate(-17.5, -.5)')
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        if (d.url) {
          navigate(`/user/starwrite/nodeview/${d.userid_num}/${d.category}`);
        }
      })
      .call(dragHandler);

    node.append('circle').attr('r', 26).attr('fill', 'skyblue');
    console.log('nodes', nodes);
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .text((d) => d.label)
      .attr('y', 4);

    const simulation = d3
      .forceSimulation(nodes)
      .force('charge', d3.forceManyBody().strength(-50));

    // 각각 노드들 중앙 정렬
    simulation.force(
      'center',
      d3.forceCenter(viewportSize.width / 1.2, viewportSize.height / 1.5),
    );

    simulation.on('tick', () => {
      node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    });
  }, []);

  return (
    <_SyledContainer>
      <svg
        ref={svgRef}
        height={viewportSize.height}
        style={{
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          width: '100%',
        }}
      ></svg>
    </_SyledContainer>
  );
}
