import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { initalList } from '../model/CategoryData';
import { Category } from '../../../shared/types/app';
import { getCategoriesApi } from '../api/CategoryApi';
import { baseApi } from '../../../shared/api/BaseApi';

function ListCategory({
  sort,
  category,
  nickname,
  updateCategory,
}: {
  sort: string;
  category?: string;
  nickname?: string;
  updateCategory?: boolean;
}) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(initalList);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  );

  const selected = async (categoryId: string) => {
    if (categoryId === 'logout') {
      localStorage.removeItem('nickname');
      localStorage.removeItem('accessToken');
      

      try {
        const response = await baseApi.post(`/logout`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }

      navigate(`/`);
    } else if (categoryId === 'myProfile') {
      navigate(`/user/starwrite/mypage/${categoryId}`);
    } else if (selectedCategory) {
      navigate(`/user/starwrite/listview/main/${nickname}/${categoryId}`);
      setSelectedCategory(selectedCategory);
    }
  };

  useEffect(() => {
    if (sort === 'listView') {
      if (nickname) {
        const promise = getCategoriesApi(nickname);
        // 현재 주소에서 뽑아낸 nickname
        promise.then((categories) => {
          setCategories([...initalList, ...categories]);
        });
      }
    } else if (sort === 'myPage') {
      setCategories([
        { name: '기본정보', categoryId: 'myProfile' },
        { name: '로그아웃', categoryId: 'logout' },
      ]);
    }
  }, [sort, nickname, updateCategory]);

  // useEffect(() => {
  //   if (nickname) {
  //     const promise = getCategoriesApi(nickname);
  //     // 현재 주소에서 뽑아낸 nickname
  //     promise.then((categories) => {
  //       setCategories([...initalList, ...categories]);
  //     });
  //   }
  // }, [updateCategory, nickname]);

  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((oneCategory, idx) => {
            if (oneCategory.categoryId !== category) {
              return (
                <OneCategory
                  key={idx}
                  onClick={() => {
                    selected(oneCategory.categoryId);
                  }}
                >
                  {oneCategory.name}
                </OneCategory>
              );
            } else {
              return (
                <OneCategory
                  color={'1'}
                  key={idx}
                  onClick={() => {
                    selected(oneCategory.categoryId);
                  }}
                >
                  {oneCategory.name}
                </OneCategory>
              );
            }
          })}
      </ListCategories>
    </>
  );
}

ListCategory.defaultProps = {
  sort: 'listView',
};

export default ListCategory;
