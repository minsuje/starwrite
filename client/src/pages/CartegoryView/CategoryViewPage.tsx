import { CategoryViewWid } from '../../widgets/CategoryView';
import { CategorySearchFeat } from '../../features/CategorySearchFeat/index';
import { useState } from 'react';
import { _Background } from '../../shared/CommonStyle';
import { Spinner } from '../../shared/spinner';
import { DataSpinnerSh } from '../../shared/DataSpinner';
interface CategoryDataItem {
  name: string;
}

export interface CategoryViewProps {
  onSearch: (newSearchTerm: string) => void;
  categoryData: CategoryDataItem[];
}

export function CategoryViewPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState([]);
  const [categoryDataNone, setCategoryDataNone] = useState<boolean>(false);

  // 검색어가 업데이트될 때 호출되는 함수
  const onSearch = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm); // 검색어 상태 업데이트
  };

  // console.log('categoryData??', categoryDataNone);
  console.log('categoryData ????>>>>>>>>>>>>>>', categoryData);

  return (
    <>
      <CategorySearchFeat onSearch={onSearch} categoryData={categoryData} />
      <CategoryViewWid
        searchTerm={searchTerm}
        setLoading={setLoading}
        // setCategoryDataNone={setCategoryDataNone}
        setCategoryData={setCategoryData}
      ></CategoryViewWid>

      {loading ? (
        <_Background>
          <Spinner></Spinner>
        </_Background>
      ) : categoryData? (
        ''
      ) : (
        <DataSpinnerSh></DataSpinnerSh>
      )}
    </>
  );
}
