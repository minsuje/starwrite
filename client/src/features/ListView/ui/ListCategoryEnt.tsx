import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { initalList, list } from '../model/CategoryData';
import { Category } from '../../../shared/types/app';

function ListCategory() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [categories, setCategories] = useState<Category[]>(initalList);
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
            if (category.name !== selectedCategory) {
              return (
                <OneCategory
                  key={idx}
                  onClick={() => {
                    selected(category.name);
                  }}
                >
                  {category.name}
                </OneCategory>
              );
            } else {
              return (
                <OneCategory
                  color={'1'}
                  key={idx}
                  onClick={() => {
                    selected(category.name);
                  }}
                >
                  {category.name}
                </OneCategory>
              );
            }
          })}
      </ListCategories>
    </>
  );
}

export default ListCategory;
