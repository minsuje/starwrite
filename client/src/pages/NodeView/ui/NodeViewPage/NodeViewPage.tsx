import { NodeView } from '../../../../entities/NodeView/index';
import { Header } from '../../../../widgets/header/HeaderWid';
import { SearchFeat } from '../../../../features/Search/SearchFeat';
import { useState } from 'react';

function NodeViewPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm) => {
    console.log('page에서의 result 결과', newSearchTerm);
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  return (
    <>
      <Header onSearch={onSearch} />
      {/* NodeView 컴포넌트에 검색어 상태를 prop으로 전달 */}
      <NodeView searchTerm={searchTerm} />
    </>
  );
}

export default NodeViewPage;
