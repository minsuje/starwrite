import { NodeView } from '../../widgets/NodeView/index';
import { useState } from 'react';
import { NodeSearchFeat } from '../../features/NodeSearchFeat/index';

export function NodeViewPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  return (
    <>
      <NodeSearchFeat onSearch={onSearch} />
      <NodeView searchTerm={searchTerm} />
    </>
  );
}
