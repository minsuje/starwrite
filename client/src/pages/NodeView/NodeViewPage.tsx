import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';
// import { NodeData } from '../../features/NodeViewFeat/api/NodeviewApi';
import { Spinner } from '../../shared/spinner';
import { _Background } from '../../shared/CommonStyle';
// import { CustomNode } from '../../features/NodeViewFeat';
// import { searchNode } from '../../features/NodeViewFeat/model/Types';
import { NoDataComponent } from '../../shared/NoDataComponent';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
const StyledButton = styled.div`
  position: absolute;
  left: 50%; // 부모 컨테이너에 대해 왼쪽에서 50% 떨어진 위치
  bottom: 60px; // 하단에서 100px 떨어진 위치
  transform: translateX(-50%); // X축 방향으로 -50% 이동하여 중앙 정렬
  padding: 16px 20px;
  background-color: #1361d7;
  color: white;
  border-radius: 4px;
  text-align: center;
  cursor: pointer; // 마우스 오버 시 커서 변경
`;

interface Post {
  title: string;
}
interface NodesData {
  posts: Post[];
}

export interface PagesearchNode {
  posts: Post[];
  relation: string[];
  NodeData?: string[];
}

export interface NodeViewProps {
  nodesData: NodesData;
  searchTerm?: string;
  onSearch: (newSearchTerm: string) => void;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  setNodesData?: React.Dispatch<React.SetStateAction<PagesearchNode>>; // 이 부분이 중요
  setPageDataProp?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NodeViewPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/user/starwrite/writenewpost'); // 여기에 이동하고 싶은 경로를 지정
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [nodesData, setNodesData] = useState<PagesearchNode>({
    posts: [],
    relation: [],
    NodeData: [], // Optional이지만 초기값으로 빈 배열 할당
  });
  const [, setPageDataProp] = useState<boolean>(false); // nonData 스피너 페이지

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  // //console.log('nodesData>>>>>>>>>>>>>', nodesData);
  // //console.log('DataSpinnerSh', pageDataProp);

  // if (nodesData.posts.length === 0 && nodesData.relation.length === 0) {
  //   return <NoDataComponent />;
  // }

  const category = '노드';
  return (
    <>
      <NodeSearchFeat onSearch={onSearch} nodesData={nodesData} />

      <NodeView
        searchTerm={searchTerm}
        setLoading={setLoading}
        setNodesData={setNodesData}
        setPageDataProp={setPageDataProp}
      />

      {loading ? (
        <_Background>
          <Spinner />
        </_Background>
      ) : nodesData.posts.length === 0 || nodesData.posts[0].title === null ? (
        <_Background>
          <NoDataComponent category={category} />
        </_Background>
      ) : (
        // 로딩이 완료되고, 데이터가 유효한 경우에만 StyledButton을 표시합니다.
        <StyledButton onClick={handleClick}>별자리 생성하기</StyledButton>
      )}
    </>
  );
}
