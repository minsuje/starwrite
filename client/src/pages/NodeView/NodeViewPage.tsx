import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';
// import { NodeData } from '../../features/NodeViewFeat/api/NodeviewApi';
import { Spinner } from '../../shared/spinner';
import { _Background } from '../../shared/CommonStyle';
// import { CustomNode } from '../../features/NodeViewFeat';
// import { searchNode } from '../../features/NodeViewFeat/model/Types';
import { NoDataComponent } from '../../shared/NoDataComponent';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [nodesData, setNodesData] = useState<PagesearchNode>({
    posts: [],
    relation: [],
    NodeData: [], // Optional이지만 초기값으로 빈 배열 할당
  });
  const [pageDataProp, setPageDataProp] = useState<boolean>(false); // nonData 스피너 페이지

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  console.log('nodesData>>>>>>>>>>>>>', nodesData);
  console.log('DataSpinnerSh', pageDataProp);

  // if (nodesData.posts.length === 0 && nodesData.relation.length === 0) {
  //   return <NoDataComponent />;
  // }

  const category = '노드';
  return (
    <div style={{ marginTop: '50px' }}>
      <NodeSearchFeat onSearch={onSearch} nodesData={nodesData} />
      {/* <NodeData></NodeData> */}

      <NodeView
        searchTerm={searchTerm}
        setLoading={setLoading}
        setNodesData={setNodesData}
        setPageDataProp={setPageDataProp}
      />
      {/* 
      {loading ? (
        <_Background>
          <Spinner />
        </_Background>
      ) : pageDataProp ? (
        ''
      ) : (
        <DataSpinnerSh></DataSpinnerSh>
      )} */}

      {loading ? (
        <_Background>
          <Spinner />
        </_Background>
      ) : nodesData.posts[0].title === null ? (
        <NoDataComponent category={category} />
      ) : null}
    </div>
  );
}
