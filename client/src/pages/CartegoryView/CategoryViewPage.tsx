import { CategoryViewWid } from '../../widgets/CategoryView';
import { CategorySearchFeat } from '../../features/CategorySearchFeat/index';
import { useState } from 'react';

export function CategoryViewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [CategoryId, setCategoryId] = useState([]);

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  console.log('pagesCategoryId>>>>>>>>>>>>>>', CategoryId);
  return (
    <>
      <CategorySearchFeat onSearch={onSearch} />
      <CategoryViewWid
        searchTerm={searchTerm}
        CategoryId={setCategoryId}
      ></CategoryViewWid>
    </>
  );
}
