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
  const { nickname, category } = useParams<string>();

  // console.log('categoryId>>?>>>>>', category);
  // console.log('nodes', nodes);
  // console.log('links', links);

  useEffect(() => {
    // axios 데이터 로딩
    const getData = async () => {
      try {
        const fetchedNodes = await fetchData(category);

        if (fetchedNodes && fetchedNodes.posts.length > 0) {
          const nodesData = fetchedNodes.posts.map((node: CustomNode) => {
            const currentTime = new Date(); // 현재 시간
            const recentViewTime = new Date(node.recentView); // 각 노드의 recentView 시간
            const timeDiff =
              Math.abs(currentTime.getTime() - recentViewTime.getTime()) /
              (1000 * 60 * 60 * 24); // 현재 시간과의 차이 (일 단위)

            // decayRate를 조절하여 투명도가 더 천천히 감소하도록 합니다.
            // 이 값은 실험을 통해 최적화할 수 있습니다. 여기서는 시간 차이가 1일 때 투명도가 약 0.5가 되도록 설정합니다.
            const decayRate = -Math.log(0.8); // 1일이 지날 때마다 투명도가 약 절반으로 감소

            // Math.exp 함수를 사용하여 투명도 계산. 시간 차이가 클수록 투명도가 감소
            const opacity = Math.exp(-decayRate * timeDiff);

            return {
              ...node,
              id: node.postId,
              label: node.title,
              x: Math.random() * viewportSize.width,
              y: Math.random() * viewportSize.height,
              url: `/user/starwrite/listview/main/${nickname}/${category}/${node.postId}`,
              opacity: Math.max(0.2, opacity), // 투명도가 너무 낮아지는 것을 방지하기 위한 최소값 설정
            };
          });

          // validLinks 설정 예시
          const validLinks = fetchedNodes.relation
            .filter((link: Link) => {
              return (
                link.postId !== null &&
                link.relatedPostId !== null &&
                nodesData.some(
                  (node: CustomNode) => node.postId === link.postId,
                ) &&
                nodesData.some(
                  (node: CustomNode) =>
                    node.postId === Number(link.relatedPostId),
                )
              );
            })
            .map((link: Link) => ({
              ...link,
              source: link.postId,
              target: link.relatedPostId,
            }));

          // if (searchTerm.trim() !== '') {
          //   nodesData = nodesData.filter((node: CustomNode) =>
          //     node.label.toLowerCase().includes(searchTerm.toLowerCase()),
          //   );
          // }

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
        d3.forceCenter(window.innerWidth / 1.55, window.innerHeight / 2),
      )
      .force(
        'radial',
        d3.forceRadial(10, window.innerWidth / 2, window.innerHeight / 2),
      )

      .alphaDecay(0.00028); // 시뮬레이션의 속도 조절 (기본값은 0.0228)
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
      .attr('href', (d) => (d.scrap ? '/star_scrap.svg' : '/star.svg')) // 별모양으로 변경함 pulic 폴더 내부의 svg 파일 사용
      .attr('width', 35) // svg 넓이
      .attr('height', 35) // svg 높이
      .attr('transform', 'translate(-17.5, -17.5)') // 이미지를 중심으로 이동시켜 위치를 조정
      .attr('pointer-events', 'all')
      .style('opacity', (d) => d.opacity)
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
        // node.style('opacity', (n) => (connectedNodes.has(n.id) ? 1 : 0.1));

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
        // node.style('opacity', 1);
        link.style('opacity', 0.1); // 기본 opacity 값을 사용
      });

    // 커스텀 툴팁을 위한 div를 준비합니다.

    // 텍스트 요소 추가
    const text = group
      .append('g')
      .attr('class', 'text')
      .selectAll('text')
      .data(nodes)
      .enter()
      .append('text')

      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .text((d) => {
        console.log(d.label); // 이 로그를 통해 d.label의 실제 값을 확인
        return d.label.length > 5 ? `${d.label.substring(0, 5)}...` : d.label;
      })
      .on('mouseover', function (event, d) {
        tooltip
          .style('visibility', 'visible')
          .text(d.label) // 전체 텍스트를 툴팁으로 설정합니다.
          .style('top', event.pageY - 10 + 'px')
          .style('left', event.pageX + 10 + 'px');
      })

      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
      });

    // 커스텀 툴팁을 위한 div 생성
    const tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('padding', '2px')
      .style('background', 'lightgrey')
      .style('border-radius', '5px')
      .style('pointer-events', 'none'); // 툴팁이 마우스 이벤트를 방해하지 않도록 설정

    // 마우스 오버 이벤트로 툴팁 보여주기
    text
      .on('mouseover', (event, d) => {
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(d.label)
          .style('left', event.pageX + 5 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(500).style('opacity', 0);
      });

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
        // .text((d) => d.label) // 각 노드의 라벨을 텍스트로 설정
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

  console.log('>>>>>>>>>>>', nodes);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const nodeSelection = svg.selectAll('.nodes image').data<CustomNode>(nodes); // 여기서 data는 CustomNode 타입의 배열이어야 합니다.

    // 검색어가 있는 경우
    if (searchTerm.trim()) {
      nodeSelection.each(function (d: CustomNode) {
        const nodeElement = d3.select(this);
        // d.label이 유효한지 확인
        const isMatchSearchTerm =
          d.label && d.label.toLowerCase().includes(searchTerm.toLowerCase());

        // 검색어와 일치하는 노드에 대해 반짝임 효과 적용
        nodeElement.classed('blink-animation', isMatchSearchTerm);

        // 모든 노드의 투명도를 망각곡선에 따라 설정하되, 검색어와 일치하는 노드는 강조
        const opacityBasedOnRecency = d.opacity; // 망각곡선에 따른 opacity 값
        nodeElement.style(
          'opacity',
          isMatchSearchTerm ? 1 : opacityBasedOnRecency,
        );
      });
    } else {
      // 검색어가 없는 경우, 모든 노드의 반짝임 효과를 제거하고 망각곡선에 따른 투명도를 적용
      nodeSelection
        .classed('blink-animation', false)
        .style('opacity', (d) => d.opacity);
    }
  }, [searchTerm, nodes]);

  // if (nodes.length === 0 || nodes.every((node) => node.id === null)) {
  //   return <NoDataComponent />;
  // }

  return (
    <svg
      ref={svgRef}
      height={viewportSize.height}
      style={{
        justifyContent: 'center',
        position: 'fixed',
        width: '100%',
      }}
    ></svg>
  );
};
