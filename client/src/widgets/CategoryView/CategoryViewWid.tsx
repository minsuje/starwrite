import * as d3 from 'd3';
import { SimulationNodeDatum } from 'd3-force';

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { nodes } from '../../features/CategoryViewFeat/index';
import { fetchDataCategory } from '../../features/CategoryViewFeat/api/CategoryAPi';
interface CategoryItem extends SimulationNodeDatum {
  categoryId: string;
  name: string;
  id: string; // categoryId와 중복되는 것 같지만, d3 사용을 위해 추가될 수 있음
  url: string;
}

interface CategoryViewWidProps {
  searchTerm: string;
  setLoading: (loading: boolean) => void;
  setCategoryData: (data: CategoryItem[]) => void;
}
export function CategoryViewWid({
  searchTerm,
  setLoading,
  setCategoryData,
  // setCategoryDataNone,
}: CategoryViewWidProps) {
  const navigate = useNavigate();
  const { nickname } = useParams<{ nickname: string }>();
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [category, setCategory] = useState<CategoryItem[]>([]);
  // const [categoryDatas, setCategoryDatas] = useState([]);

  useEffect(() => {
    // axios 데이터 로딩
    const getDataCategory = async () => {
      try {
        const categoryDataResponse: CategoryItem[] =
          await fetchDataCategory(nickname); //데이터 응답

        // if (categoryDataResponse !== '') {
        //   let processedCategoryData = categoryDataResponse.map(
        //     (categoryItem) => ({
        //       ...categoryItem,
        //       id: categoryItem.categoryId,
        //       name: categoryItem.name,
        //       categoryId: categoryItem.categoryId,
        //       url: 'nodeurl',
        //     }),
        //   );
        if (categoryDataResponse && categoryDataResponse.length > 0) {
          let processedCategoryData = categoryDataResponse.map(
            (categoryItem) => ({
              ...categoryItem,
              id: categoryItem.categoryId,
              name: categoryItem.name,
              categoryId: categoryItem.categoryId,
              url: 'nodeurl', // 예제 url, 실제 사용 시 적절한 값으로 대체
            }),
          );

          console.log('>>>>>>', categoryDataResponse);

          if (searchTerm.trim() !== '') {
            // 검색어가 있을 경우 필터링을 적용
            processedCategoryData = processedCategoryData.filter((category) =>
              category.name.toLowerCase().includes(searchTerm.toLowerCase()),
            );
          }
          setCategory(processedCategoryData);
          setLoading(false);
          setCategoryData(categoryDataResponse);
          // setCategoryDataNone(categoryDataResponse);
          // setCategoryDatas(processedCategoryData);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getDataCategory();
    // console.log('categoryDatas>>', categoryDatas);
    console.log();
  }, [nickname]);

  // console.log('Processed category Data:', category);

  const simulation = d3
    .forceSimulation<CategoryItem>(category)
    .force('charge', d3.forceManyBody().strength(-80))
    .force('collide', d3.forceCollide<CategoryItem>().radius(100))
    .force(
      'radial',
      d3.forceRadial<CategoryItem>(
        0,
        viewportSize.width / 1.2,
        viewportSize.height / 1.5,
      ),
    );

  // 각각 노드들 중앙 정렬
  simulation.force(
    'center',
    d3.forceCenter(viewportSize.width / 1.2, viewportSize.height / 1.5),
  );
  useEffect(() => {
    const svg = d3.select(svgRef.current as SVGSVGElement);
    svg.selectAll('*').remove(); // 기존 SVG 내용을 초기화
    svg.attr('width', viewportSize.width).attr('height', viewportSize.height);
    const group = svg.append('g');

    const zoomHandler = d3
      .zoom<SVGSVGElement, unknown>()
      .on('zoom', (event) => {
        group.attr('transform', event.transform);
        // 함수 본문
      });

    // Zoom 핸들러를 SVG 요소에 적용
    svg.call(zoomHandler);
    // 초기 줌 스케일 설정 (예: 0.8로 줌 아웃)
    svg.call(zoomHandler.transform, d3.zoomIdentity.scale(0.6));

    // 드래그 이벤트 핸들러 생성
    // 노드에 드래그 기능 적용
    const dragHandler = d3
      .drag<SVGGElement, CategoryItem, CategoryItem | d3.SubjectPosition>()
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
      .data(category)
      .enter()
      .append('g')
      // .attr('transform', 'translate(-17.5, -.5)')
      .style('cursor', 'pointer')
      .on('click', (_, d) => {
        if (d.url) {
          navigate(`/user/starwrite/nodeview/${nickname}/${d.id}`);
        }
      })
      .call(dragHandler);

    node.append('circle').attr('r', 56).attr('fill', '#A6A6A6');
    // console.log('nodes', nodes);
    node
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .text((d) => d.name)
      .attr('y', 4);

    simulation.on('tick', () => {
      node.attr('transform', (d) => `translate(${d.x}, ${d.y})`);
    });
  }, [category]);

  return (
    <svg
      ref={svgRef}
      height={viewportSize.height}
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '950px',
        position: 'fixed',
        width: '100%',
      }}
    ></svg>
  );
}
