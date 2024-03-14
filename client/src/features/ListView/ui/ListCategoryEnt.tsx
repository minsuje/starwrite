import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { list } from '../model/CategoryData';

function ListCategory() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [categories, setCategories] = useState<string[]>(['전체']);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  );
  const selected = (category: string) => {
    navigate(`/user/starwrite/listview/main/${category}`);
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
                  color={'1'}
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
