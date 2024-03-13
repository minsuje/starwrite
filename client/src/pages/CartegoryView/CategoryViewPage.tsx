import { CategoryViewWid } from '../../widgets/CategoryView';
import { SearchFeat } from '../../features/index';
import { useState } from 'react';
import { styled } from 'styled-components';

export function CategoryViewPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };
  return (
    <>
      <SearchFeat onSearch={onSearch} />
      <CategoryViewWid searchTerm={searchTerm}></CategoryViewWid>
    </>
  );
}
