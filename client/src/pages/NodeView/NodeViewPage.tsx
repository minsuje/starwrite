import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';
import { NodeData } from '../../features/NodeViewFeat/api/NodeviewApi';
import { Spinner } from '../../shared/spinner';
import { _Background } from '../../shared/CommonStyle';
import { DataSpinnerSh } from '../../shared/DataSpinner';
// import { CustomNode } from '../../features/NodeViewFeat';
// import { searchNode } from '../../features/NodeViewFeat/model/Types';

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
  const [pageDataProp, setPageDataProp] = useState<boolean>(false);

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  // 1번 페이지가 로딩될때 띄워줘야할 이미지
  // 2번 데이터가 없을경우 띄워줘야할 페이지가 있어요

  // if
  // if (loading === true) {
  //   <_Background>
  //     <Spinner />
  //   </_Background>;
  // console.log('트루였니?', loading);
  // setLoading(false);
  // if (page === '') {
  //   <DataSpinnerSh></DataSpinnerSh>;
  // }
  // }
  console.log('nodesData>>>>>>>>>>>>>', nodesData);
  return (
    <>
      <NodeSearchFeat onSearch={onSearch} nodesData={nodesData} />
      <NodeData></NodeData>

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
      ) : pageDataProp ? (
        ''
      ) : (
        <DataSpinnerSh></DataSpinnerSh>
      )}
    </>
  );
}
