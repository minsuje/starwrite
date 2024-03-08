import { NodeView } from '../../../../widgets/index';
import { Header } from '../../../../widgets/header/HeaderWid';
import { useState } from 'react';
import { SearchFeat } from '../../../../features';

function NodeViewPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  return (
    <>
      <Header />
      <SearchFeat onSearch={onSearch} />
      <NodeView searchTerm={searchTerm} />
    </>
  );
}

export default NodeViewPage;
