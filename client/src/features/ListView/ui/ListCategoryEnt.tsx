import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { initalList } from '../model/CategoryData';
import { getCategoriesApi } from '../api/CategoryApi';
import { baseApi } from '../../../shared/api/BaseApi';
import { Category, useAppSelector } from '../../../shared/model';
import { useAppDispatch } from '../../../shared/model';
import { categoriesActions } from '../model/CategoriesSlice';
import { resetState } from '../model/StateSlice';

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

  const dispatch = useAppDispatch();
  const reset = useAppSelector(resetState);

  const selected = async (categoryId: string) => {
    if (categoryId === 'logout') {
      localStorage.removeItem('nickname');
      localStorage.removeItem('accessToken');

      try {
        await baseApi.post(`/logout`);
        //console.log(response.data);
      } catch (error) {
        //console.log(error);
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
          dispatch(categoriesActions.change(categories));
        });
      }
    } else if (sort === 'myPage') {
      setCategories([
        { name: '기본정보', categoryId: 'myProfile' },
        { name: '로그아웃', categoryId: 'logout' },
      ]);
    }
    //console.log('리스트', reset);
  }, [sort, nickname, updateCategory, dispatch, reset]);

  return (
    <>
      <ListCategories>
        {!(categories.length === 0) &&
          categories.map((oneCategory, idx) => {
            if (oneCategory.categoryId !== category) {
              return (
                <OneCategory
                  whileTap={{ scale: 0.98, opacity: 0.9 }}
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
                  whileTap={{ scale: 0.98, opacity: 0.9 }}
                  color={'#c0c0c02a'}
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
