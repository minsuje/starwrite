import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { list } from '../model/CategoryData';

function ListCategory() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const selected = (category: string) => {
    navigate(`/starwrite/listview/main/${category}`);
    setSelectedCategory(category);
  };

  useEffect(() => {
    setCategories(list);
  }, []);

  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((category, idx) => {
            if (category !== selectedCategory) {
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
            } else {
              return (
                <OneCategory
                  color={'0.9'}
                  key={idx}
                  onClick={() => {
                    selected(category);
                  }}
                >
                  {category}
                </OneCategory>
              );
            }
          })}
      </ListCategories>
    </>
  );
}

export default ListCategory;
