import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OneCategory, ListCategories } from '../../NewPost/ui/style';
import { initalList } from '../model/CategoryData';
import { Category } from '../../../shared/types/app';
import { getCategoriesApi } from '../api/CategoryApi';

// import { postListApi } from '../api/PostApi';

function ListCategory({
  sort,
  category,
  nickname,
}: {
  sort: string;
  category?: string;
  nickname?: string;
}) {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(initalList);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    category,
  );
  // 이게 맞는지 확인 부탁드려요 구휘님 03.17
  const selected = (categoryId: string) => {
    if (categoryId === 'logout') {
      localStorage.removeItem('nickname');
      localStorage.removeItem('accessToken');
      navigate(`/`);
    } else if (categoryId === 'myProfile') {
      navigate(`/user/starwrite/mypage/${categoryId}`);
    } else if (selectedCategory) {
      navigate(`/user/starwrite/listview/main/${nickname}/${categoryId}`);
      setSelectedCategory(selectedCategory);
    }
  };

  useEffect(() => {
    // postListApi('b5113021-2ec9-43e4-b067-91643850251c');

    if (sort === 'listView') {
      // 닉네임 수정 -> local에서 뽑아오거나 지금 워크스페이스 주인의 닉네임
      const promise = getCategoriesApi('고길동');
      promise.then((categories) => {
        console.log('categories data: ', categories);
        setCategories([...initalList, ...categories]);
      });
    } else if (sort === 'myPage') {
      setCategories([
        { name: '기본정보', categoryId: 'myProfile' },
        { name: '로그아웃', categoryId: 'logout' },
      ]);
    }
  }, [sort]);

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
