import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
// import { links } from '../../features/NodeViewFeat/index';

import {
  SmallCircleData,
  CustomNode,
  Link,
} from '../../features/NodeViewFeat/index';
import './NodeView.css';
import { fetchData } from '../../features/NodeViewFeat/index';
import { ExtendedCustomNode } from '../../features/NodeViewFeat/model/Types';
import { useParams } from 'react-router';
import { NoDataComponent } from '../../shared/NoDataComponent';
import { PagesearchNode } from '../../pages/NodeView/NodeViewPage';

export type SearchType = {
  setNodesData: React.Dispatch<React.SetStateAction<PagesearchNode>>;
  setPageDataProp: (data: boolean) => void;
  searchTerm: string;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const NodeView = ({
  searchTerm,
  setLoading,
  setNodesData,
  setPageDataProp,
}: SearchType) => {
  const [nodes, setNodes] = useState<CustomNode[]>([]);
  const [links, setLink] = useState<Link[]>([]);
  const { nickname, category } = useParams();

  // console.log('categoryId>>?>>>>>', category);
  // console.log('nodes', nodes);
  // console.log('links', links);

  useEffect(() => {
    // axios 데이터 로딩
    const getData = async () => {
      try {
        const fetchedNodes = await fetchData(category);

        if (fetchedNodes !== '') {
          let nodesData = fetchedNodes.posts.map((node: CustomNode) => ({
            ...node,
            id: node.postId, //22
            label: node.title, //토마토
            x: Math.random() * viewportSize.width,
            y: Math.random() * viewportSize.height,
            url: `/user/starwrite/listview/main/${nickname}/${category}/${node.postId}`,
          }));

          // validLinks 설정 예시
          const validLinks = fetchedNodes.relation
            .filter((link) => {
              return (
                link.postId !== null &&
                link.relatedPostId !== null &&
                nodesData.some((node) => node.postId === link.postId) &&
                nodesData.some((node) => node.postId === link.relatedPostId)
              );
            })
            .map((link) => ({
              ...link,
              source: link.postId,
              target: link.relatedPostId,
            }));

          if (searchTerm.trim() !== '') {
            nodesData = nodesData.filter((node: CustomNode) =>
              node.label.toLowerCase().includes(searchTerm.toLowerCase()),
            );
          }

          setNodes(nodesData);
          setLoading(false);
          setNodesData(fetchedNodes);
          setLink(validLinks);

          setPageDataProp(fetchedNodes);
        } else if (fetchedNodes === '') {
          setLoading(false);
        }

        // console.log('links>>>>>>>>>>>', links);

        // const LinksData = fetchedNodes.relation.map((link: Link) => ({
        //   ...link,
        //   source: link.postId,
        //   target: link.relatedPostId,
        // }));

        // console.log('LinksData>>>>>>>>', LinksData);

        // setLink(fetchedNodes.relation);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, []);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [viewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  function drag(
    simulation: d3.Simulation<CustomNode, Link>,
  ): d3.DragBehavior<Element, CustomNode, CustomNode | d3.SubjectPosition> {
    return d3
      .drag<Element, CustomNode>()
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

  // findAllConnectedNodes 함수에 타입 지정
  function findAllConnectedNodes(nodeId: string, links: Link[]): Set<string> {
    const visited = new Set<string>(); // 방문한 노드의 ID를 추적
    const queue: string[] = [nodeId]; // BFS를 위한 큐

    while (queue.length > 0) {
      const currentId = queue.shift()!;
      if (!visited.has(currentId)) {
        visited.add(currentId);
        links.forEach((link) => {
          const sourceId =
            typeof link.source === 'object' ? link.source.id : link.source;
          const targetId =
            typeof link.target === 'object' ? link.target.id : link.target;
          if (sourceId === currentId && !visited.has(targetId)) {
            queue.push(targetId);
          } else if (targetId === currentId && !visited.has(sourceId)) {
            queue.push(sourceId);
          }
        });
      }
    }

    return visited;
  }
  // function findAllConnectedNodes(nodeId: string, links: any) {
  //   let visited = new Set<string>(); // 방문한 노드를 추적합니다.
  //   let queue: string = [nodeId]; // BFS를 위한 큐

  //   while (queue.length > 0) {
  //     let currentId = queue.shift();
  //     if (!visited.has(currentId)) {
  //       visited.add(currentId);
  //       links.forEach((link) => {
  //         let sourceId =
  //           typeof link.source === 'object' ? link.source.id : link.source;
  //         let targetId =
  //           typeof link.target === 'object' ? link.target.id : link.target;
  //         if (sourceId === currentId && !visited.has(targetId)) {
  //           queue.push(targetId);
  //         } else if (targetId === currentId && !visited.has(sourceId)) {
  //           queue.push(sourceId);
  //         }
  //       });
  //     }
  //   }

  //   return visited;
  // }

  useEffect(() => {
    // 작은 원의 데이터를 준비합니다.
    const smallCirclesData: SmallCircleData[] = [];
    nodes.forEach((node: ExtendedCustomNode) => {
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

    // SVG 요소 선택 및 초기화

    // SVG 요소 선택 및 초기화
    const svg = d3
      .select(svgRef.current as SVGSVGElement)
      .attr('width', '100%')
      .attr('height', viewportSize.height);
    svg.selectAll('*').remove(); // 기존의 모든 SVG 요소 제거

    const group = svg.append('g');

    // Zoom 핸들러 생성 및 설정
    const zoomHandler = d3
      .zoom<SVGSVGElement, unknown>()
      .on('zoom', (event) => {
        group.attr('transform', event.transform);
      });

    // Zoom 핸들러를 SVG 요소에 적용
    svg.call(zoomHandler);
    // 초기 줌 스케일 설정 (예: 0.8로 줌 아웃)
    svg.call(zoomHandler.transform, d3.zoomIdentity.scale(0.8));

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3
          .forceLink<CustomNode, Link>(links)
          .id((d) => d.postId)
          // 링크 선 길이 조절
          .distance(100),
      ) // 링크 거리 조절
      .force('charge', d3.forceManyBody().strength(-500))
      .force('collide', d3.forceCollide().radius(50))
      .force(
        'center',
        d3.forceCenter(window.innerWidth / 1.55, window.innerHeight / 1.4),
      )
      .force(
        'radial',
        d3.forceRadial(10, window.innerWidth / 2, window.innerHeight / 2),
      )

      .alphaDecay(0.0228); // 시뮬레이션의 속도 조절 (기본값은 0.0228)
    // 링크 그리기
    const link = group
      .append('g')
      .attr('g', 'links')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      // 선의 굵기 조절
      .attr('stroke-width', (d) => Math.sqrt(d.value ?? 3))
      .attr('stroke', '#fff')
      .style('opacity', 0.2);

    const node = group
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
      .call(
        drag(simulation) as unknown as d3.DragBehavior<
          SVGImageElement,
          CustomNode,
          CustomNode | d3.SubjectPosition
        >,
      )
      .on('click', (_, d) => {
        if (d.url) window.location.href = d.url; // URL이 있으면 해당 URL로 이동
      })
      .style('cursor', 'pointer') // 커서 포인트 변경
      .on('mouseover', function (_, d) {
        const connectedNodes = findAllConnectedNodes(d.id, links);

        // 연결된 모든 노드의 opacity 조정
        node.style('opacity', (n) => (connectedNodes.has(n.id) ? 1 : 0.1));

        // 연결된 모든 링크의 opacity 조정
        link.style('opacity', (l) => {
          const sourceId =
            typeof l.source === 'object' ? l.source.id : l.source;
          const targetId =
            typeof l.target === 'object' ? l.target.id : l.target;
          return connectedNodes.has(sourceId) && connectedNodes.has(targetId)
            ? 1
            : 0.1;
        });
      })
      .on('mouseout', function () {
        node.style('opacity', 1);
        link.style('opacity', 0.1); // 기본 opacity 값을 사용
      });
    // 텍스트 요소 추가

    const text = group
      .append('g')
      .attr('class', 'texts')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')
      // .attr('x', (d) => d.x ?? 50)
      // .attr('y', (d) => d.y ?? 50) // 노드 위에 위치하도록 y 좌표 조정
      .attr('text-anchor', 'middle') // 텍스트를 중앙 정렬
      .attr('fill', '#ffffff'); // 텍스트 색상 설정
    // .text((d) => d.label); // 각 노드의 라벨을 텍스트로 설정

    // 작은 원 그리기 위한 'g' 태그 추가
    const smallCircleGroups = group
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
  }, [nodes, links]); // nodes와 links가 변경될 때마다 useEffect를 다시 실행

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const nodeSelection = svg
      .selectAll('.nodes image')
      .data<CustomNode>(nodes) // 여기서 data는 CustomNode 타입의 배열이어야 합니다.
      .enter()
      .append('g')
      .classed('node', true);
    //글 제목 깜빡깜빡

    // 검색어가 있는 경우
    if (searchTerm.trim()) {
      nodeSelection
        .classed('blink-animation', (d: CustomNode) =>
          d.label.toLowerCase().includes(searchTerm.toLowerCase()),
        ) // boolean 값을 반환합니다.
        .style('opacity', (d: CustomNode) =>
          d.label.toLowerCase().includes(searchTerm.toLowerCase()) ? 1 : 0.2,
        );
    } else {
      // 검색어가 없는 경우
      nodeSelection
        .classed('blink-animation', false) // 직접적으로 boolean 값을 제공합니다.
        .style('opacity', 1);
    }
  }, [searchTerm]);

  if (nodes.length === 0 || nodes.every((node) => node.id === null)) {
    // nodes 배열이 비어 있거나 모든 항목이 null일 때 렌더링할 컴포넌트
    return <NoDataComponent />;
  }
  // console.log('>>>>>>>>>>>>>>>>>>', nodes);

  return (
    <svg
      ref={svgRef}
      height={viewportSize.height}
      style={{
        zIndex: -5,
        top: 0,
        position: 'fixed',
      }}
    ></svg>
  );
};
