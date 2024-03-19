import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';
import { NodeData } from '../../features/NodeViewFeat/api/NodeviewApi';
import { Spinner } from '../../shared/spinner';
import { _Background } from '../../shared/CommonStyle';
import { DataSpinnerSh } from '../../shared/DataSpinner';

export function NodeViewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [nodesData, setNodesData] = useState([]);

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  return (
    <>
      <NodeSearchFeat onSearch={onSearch} nodesData={nodesData} />
      <NodeData></NodeData>

      <NodeView
        searchTerm={searchTerm}
        setLoading={setLoading}
        setNodesData={setNodesData}
      />

      {loading ? (
        <_Background>
          <Spinner />
        </_Background>
      ) : (
        // <DataSpinnerSh></DataSpinnerSh>
        ''
      )}
    </>
  );
}
