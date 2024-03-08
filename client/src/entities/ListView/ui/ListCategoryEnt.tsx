import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../ui/style';

// 타입
type Categories = string[];

function ListCategory() {
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(['전체', '스크랩', '임시저장', '과학', '사회', '국어']);
    console.log('category 바 마운트');
  }, []);

  const selected = (category: string) => {
    navigate(`/starwrite/listview/main/${category}`);
  };
  const [categories, setCategories] = useState<Categories>([]);
  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((category) => {
            return (
              <OneCategory
                onClick={() => {
                  selected(category);
                }}
              >
                {category}
              </OneCategory>
            );
          })}
      </ListCategories>
    </>
  );
}

export default ListCategory;
