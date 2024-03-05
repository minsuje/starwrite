import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { nodes, links } from '../api/NodeViewApi';

// links;
// nodes;
export const NodeView = () => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 드래그 핸들러
  function drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return d3
      .drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }

  useEffect(() => {
    // 작은 원의 데이터를 준비합니다.
    let smallCirclesData = [];
    nodes.forEach((node) => {
      for (let i = 0; i < node.isShared; i++) {
        smallCirclesData.push({
          parentNode: node,
          index: i,
          total: node.isShared,
        });
      }
    });

    console.log(smallCirclesData);
    // SVG 요소 선택 및 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 기존의 모든 SVG 요소 제거

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const zoomHandler = d3.zoom().on('zoom', (event) => {
      svg.selectAll('g').attr('transform', event.transform);
    });
    // 확대/축소 기능을 SVG에 적용
    svg.call(zoomHandler);

    // 시뮬레이션 설정
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink(links)
          .id((d) => d.id)
          .distance(100),
      ) // 링크 선의 길이
      .force('charge', d3.forceManyBody().strength(-50))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // 링크 그리기
    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value))
      .attr('stroke', '#fff');

    const node = svg
      .append('g')
      .attr('class', 'nodes')
      .selectAll('image')
      .data(nodes)
      .enter()
      .append('image')
      .attr('href', '/star.svg')
      .attr('width', 35)
      .attr('height', 35)
      .attr('transform', 'translate(-17.5, -17.5)')
      .attr('pointer-events', 'all')
      .call(drag(simulation))
      .on('click', (d) => {
        // D3.js v6 이상의 이벤트 처리 방식
        if (d.url) window.location.href = d.url; // URL이 있으면 해당 URL로 이동
      })
      .style('cursor', 'pointer'); // 커서 포인트 변경

    // // 작은 원 추가;
    // const sharedCircles = svg.append('g')
    //   .attr('class', 'shared-nodes')
    //   .selectAll('circle')
    //   .data(sharedNodes)
    //   .enter().append('circle')
    //   .attr('r', 4) // 작은 원의 반지름
    //   .attr('fill', 'blue') // 작은 원의 색상
    //   .attr('stroke', '#fff')
    //   .attr('stroke-width', 1.5);

    // 텍스트 요소 추가
    const text = svg
      .append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', (d) => d.x)
      .attr('y', (d) => d.y) // 노드 위에 위치하도록 y 좌표 조정
      .attr('text-anchor', 'middle', '#') // 텍스트를 중앙 정렬
      .attr('fill', '#ffffff') // 텍스트 색상 설정
      .text((d) => d.label); // 각 노드의 라벨을 텍스트로 설정

    // 작은 원 그리기 위한 'g' 태그 추가
    const smallCircleGroups = svg
      .selectAll('.small-circle-group')
      .data(smallCirclesData)
      .enter()
      .append('g')
      .attr('class', 'small-circle-group');
    smallCircleGroups
      .append('circle')
      .attr('class', 'small-circle')
      .attr('r', 3) // 작은 원의 반지름
      .attr('fill', 'yellow'); // 작은 원의 색상

    // 시뮬레이션의 tick 이벤트에 리스너를 추가하여 노드와 링크의 위치를 업데이트
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('x', (d) => d.x - 0.5) // 이미지의 중앙이 노드 위치에 오도록 x 조정
        .attr('y', (d) => d.y - 0.5); // 이미지의 중앙이 노드 위치에 오도록 y 조정

      // 텍스트 위치 업데이트
      text.attr('x', (d) => d.x).attr('y', (d) => d.y - 30);

      // 작은 원 위치 업데이트
      // sharedCircles
      //   .attr('cx', d => d.x - 30) // 작은 원(위성) 위치 조절
      //   .attr('cy', d => d.y - 30);  // 작은 원(위성) 위치 조절

      // 작은 원 위치 업데이트
      svg
        .selectAll('.small-circle')
        .attr(
          'cx',
          (d) =>
            d.parentNode.x + 20 * Math.cos((2 * Math.PI * d.index) / d.total),
        )
        .attr(
          'cy',
          (d) =>
            d.parentNode.y + 20 * Math.sin((2 * Math.PI * d.index) / d.total),
        );
    });
  }, [nodes, links]); // nodes와 links가 변경될 때마다 useEffect를 다시 실행

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ border: '1px solid black', background: 'black' }}
    ></svg>
  );
};
