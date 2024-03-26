import { useEffect, useState } from 'react';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
import { getCategoriesApi } from '../api/CategoryApi';
import { Category } from '../../../shared/model';
import { scrapPostApi } from '../api/PostApi';

function SelectCategory({
  close,
  postId,
}: {
  close: () => void;
  postId: string | undefined;
}) {
  const [myCategories, setMyCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState<string>();

  function scrap() {
    console.log('why~~~!!!');

    if (category) {
      const promise = scrapPostApi(Number(postId), category);
      promise.then((result) => {
        console.log('스크랩 result', result);
      });
    }
  }
  useEffect(() => {
    const myNickname = localStorage.getItem('nickname');
    if (myNickname) {
      const promise = getCategoriesApi(myNickname);
      promise.then((categories) => {
        setMyCategories(categories);
        // categories 배열이 비어 있지 않다면 첫 번째 카테고리를 기본값으로 설정
        if (categories.length > 0) {
          setCategory(categories[0].categoryId);
        }
      });
    }
  }, []);
  return (
    <>
      <_ModalBg>
        <_Modal>
          <p>안녕</p>
          <select
            onChange={(value) => {
              setCategory(value.currentTarget.value);
            }}
          >
            {myCategories.map((category) => {
              return (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.name}
                </option>
              );
            })}
          </select>
          <button onClick={scrap}>스크랩</button>
          <button onClick={close}>닫기</button>
        </_Modal>
      </_ModalBg>
    </>
  );
}

export default SelectCategory;
