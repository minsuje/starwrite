import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../NewPost/ui/style';
import { list } from './model/CategoryData';

function ListCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>(['전체']);
  const selected = (category: string) => {
    navigate(`/starwrite/listview/main/${category}`);
  };

  useEffect(() => {
    setCategories(list);

    console.log('category 바 마운트');
  }, []);

  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((category, idx) => {
            return (
              <OneCategory
                key={idx}
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
