import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';
import { NodeData } from '../../features/NodeViewFeat/api/NodeviewApi';
import { Spinner } from '../../shared/spinner';
import { _Background } from '../../shared/CommonStyle';

export function NodeViewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  return (
    <>
      <NodeSearchFeat onSearch={onSearch} />
      <NodeData setLoading={setLoading}></NodeData>
      <NodeView searchTerm={searchTerm} />
      <_Background>{loading ? <Spinner /> : null}</_Background>
    </>
  );
}
