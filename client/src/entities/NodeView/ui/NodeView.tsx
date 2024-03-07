import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { nodes, links } from '../api/NodeViewApi';
import { SmallCircleData, CustomNode, Link } from '../model/Types';
import './NodeView.css';

// links;
// nodes;
export const NodeView = ({ searchTerm }) => {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  //
  console.log('이곳은 NodeView searchTerm', searchTerm);
  //

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

  //드래그 핸들러
  function drag(simulation: d3.Simulation<CustomNode, undefined>) {
    return d3
      .drag<SVGImageElement, CustomNode>()
      .on('start', (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on('drag', (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on('end', (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });
  }

  useEffect(() => {
    const findAllConnectedNodes = (nodeId, nodes) => {
      let visited = new Set(); // 방문한 노드를 추적합니다.
      let stack = [nodeId]; // DFS를 위한 스택

      while (stack.length) {
        let currentId = stack.pop();
        if (!visited.has(currentId)) {
          visited.add(currentId);
          let currentNode = nodes.find((n) => n.id === currentId);
          if (currentNode && currentNode.connectedNodes) {
            currentNode.connectedNodes.forEach((nId) => {
              if (!visited.has(nId)) {
                stack.push(nId);
              }
            });
          }
        }
      }

      return visited; // 방문한 모든 노드의 ID를 반환합니다.
    };

    // 마우스 호버 시
    const handleMouseOver = (event, d) => {
      // 연결된 모든 노드의 ID를 찾습니다.
      const connectedNodes = findAllConnectedNodes(d.id, nodes);

      // 연결된 노드 및 해당 노드들을 연결하는 링크를 밝게 표시합니다.
      node.style('opacity', (n) => (connectedNodes.has(n.id) ? 1 : 0.1));
      link.style('opacity', (l) =>
        connectedNodes.has(l.source.id) && connectedNodes.has(l.target.id)
          ? 1
          : 0.1,
      );

      // 현재 호버된 노드의 투명도를 높입니다.
      d3.select(event.currentTarget).style('opacity', 1);
    };
    // 마우스 호버 제거 시
    const handleMouseOut = () => {
      // 모든 노드와 링크의 opacity를 원래대로 복원합니다.
      node.style('opacity', 1);
      link.style('opacity', 1);
    };

    // 작은 원의 데이터를 준비합니다.
    let smallCirclesData: SmallCircleData[] = [];
    nodes.forEach((node) => {
      // if(node.isShared => 만약 백링크가 걸려있다면 작동하게해라 )
      if (node.isShared) {
        for (let i = 0; i < node.isShared; i++) {
          smallCirclesData.push({
            parentNode: node,
            index: i,
            total: node.isShared,
          });
        }
      }
    });

    console.log('smallCirclesData>>', smallCirclesData);

    // SVG 요소 선택 및 초기화
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // 기존의 모든 SVG 요소 제거

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const zoomHandler = d3.zoom().on('zoom', (event) => {
      svg.selectAll('g').attr('transform', event.transform);
    });
    // 확대/축소 기능을 SVG에 적용
    (svg as any).call(zoomHandler);

    // 시뮬레이션 설정
    // const simulation = d3
    //   .forceSimulation(nodes)
    //   .force(
    //     'link',
    //     d3
    //       .forceLink<CustomNode, Link>(links)
    //       .id((d) => d.id)
    //       // 링크 선의 길이
    //       .distance(100),
    //   )
    //   .force('charge', d3.forceManyBody().strength(-50))
    //   .force('center', d3.forceCenter(width / 2, height / 2));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',

        d3
          .forceLink<CustomNode, Link>(links)
          .id((d) => d.id)
          // 링크 선 길이 조절
          .distance(100),
      ) // 링크 거리 조절
      .force('charge', d3.forceManyBody().strength(-5)) // 노드 간 반발력 조절
      .force('center', d3.forceCenter(width / 2, height / 2))
      .alphaDecay(0.0228); // 시뮬레이션의 속도 조절 (기본값은 0.0228)
    // .on('tick', ticked);
    // 링크 그리기
    const link = svg
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', (d) => Math.sqrt(d.value ?? 1))
      .attr('stroke', '#fff')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    const node = svg
      .append('g') //  호출하여 SVG 내에 새로운 <g> 요소(그룹)를 추가 이 그룹은 별 모양 이미지를 포함할 노드들의 컨테이너 역할
      .attr('class', 'nodes') // classname nodes설정
      .selectAll('image') // 데이터 배열을 각 이미지 요소에 바인딩
      .data(nodes) // 데이터 배열을 각 이미지 요소에 바인딩
      .enter() // 데이터 배열을 각 이미지 요소에 바인딩합니다.
      .append('image') // 실제 <image> 요소를 추가
      .attr('href', '/star.svg') // 별모양으로 변경함 pulic 폴더 내부의 svg 파일 사용
      .attr('width', 35) // svg 넓이
      .attr('height', 35) // svg 높이
      .attr('transform', 'translate(-17.5, -17.5)') // 이미지를 중심으로 이동시켜 위치를 조정
      .attr('pointer-events', 'all')
      .call(drag(simulation as any)) //  D3.js의 드래그 기능을 이용하여 해당 이미지(노드)를 드래그 앤 드롭으로 이동할 수 있도록 함
      .on('click', (_, d) => {
        if (d.url) window.location.href = d.url; // URL이 있으면 해당 URL로 이동
      })
      .style('cursor', 'pointer') // 커서 포인트 변경
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);
    if (searchTerm.trim()) {
      node
        .filter((d) => d.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .classed('blink-animation', true);
    } else {
      node.classed('blink-animation', false); // 검색어가 비어 있으면 애니메이션 클래스 제거
    }
    // 검색어와 일치할 때 깜빡이는 애니메이션을 적용합니다.
    // node.filter((d) => d.label === searchTerm).classed('blink-animation', true); // 조건에 따라 애니메이션 클래스 추가

    // 텍스트 요소 추가
    const text = svg
      .append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      .attr('x', (d) => d.x ?? 0)
      .attr('y', (d) => d.y ?? 0) // 노드 위에 위치하도록 y 좌표 조정
      .attr('text-anchor', 'middle') // 텍스트를 중앙 정렬
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
        .attr('x1', (d) => {
          if (typeof d.source !== 'string' && d.source.x !== undefined) {
            return d.source.x;
          } else {
            return 0; // 혹은 다른 적절한 기본값
          }
        })
        .attr('y1', (d) => {
          if (typeof d.source !== 'string' && d.source.y !== undefined) {
            return d.source.y;
          } else {
            return 0; // 혹은 다른 적절한 기본값
          }
        })
        .attr('x2', (d) => {
          if (typeof d.target !== 'string' && d.target.x !== undefined) {
            return d.target.x;
          } else {
            return 0; // 혹은 다른 적절한 기본값
          }
        })
        .attr('y2', (d) => {
          if (typeof d.target !== 'string' && d.target.y !== undefined) {
            return d.target.y;
          } else {
            return 0; // 혹은 다른 적절한 기본값
          }
        });
      node
        .attr('x', (d) => d.x ?? -0.5) // 이미지의 중앙이 노드 위치에 오도록 x 조정
        .attr('y', (d) => d.y ?? -0.5); // 이미지의 중앙이 노드 위치에 오도록 y 조정

      // 텍스트 위치 업데이트

      text
        .text((d) => d.label) // 각 노드의 라벨을 텍스트로 설정
        .attr('x', (d) => d.x ?? 0)
        .attr('y', (d) => (d.y ?? 0) - 30); // 노드 위에 위치하도록 y 좌표 조정

      // 작은 원 위치 업데이트
      // sharedCircles
      //   .attr('cx', d => d.x - 30) // 작은 원(위성) 위치 조절
      //   .attr('cy', d => d.y - 30);  // 작은 원(위성) 위치 조절

      // 작은 원 위치 업데이트
      svg
        .selectAll<SVGElement, SmallCircleData>('.small-circle')
        .attr(
          'cx',
          (d) =>
            (d.parentNode.x || 0) + // 기본값으로 0을 사용하거나 다른 적절한 값으로 변경 가능
            20 * Math.cos((2 * Math.PI * d.index) / d.total),
        )
        .attr(
          'cy',
          (d) =>
            (d.parentNode.y || 0) + // 기본값으로 0을 사용하거나 다른 적절한 값으로 변경 가능
            20 * Math.sin((2 * Math.PI * d.index) / d.total),
        );
    });
  }, [nodes, links, searchTerm]); // nodes와 links가 변경될 때마다 useEffect를 다시 실행

  return (
    <svg
      ref={svgRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ border: '1px solid black', background: 'black' }}
    ></svg>
  );
};
