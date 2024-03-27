import { useEffect, useState } from 'react';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
import { getCategoriesApi } from '../api/CategoryApi';
import { Category } from '../../../shared/model';
import { scrapPostApi } from '../api/PostApi';
import { _ButtonBox, _Button } from '../ui/style';
import styled from 'styled-components';

const _ScrapBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  p {
    font-size: 20px;
  }
`;
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
          <_ScrapBox>
            <p>스크랩</p>
            <div>
              <span>카테고리 </span>
              <select
                onChange={(value) => {
                  setCategory(value.currentTarget.value);
                }}
              >
                {myCategories.map((category) => {
                  return (
                    <option
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <_ButtonBox>
              <_Button onClick={scrap}>스크랩</_Button>
              <_Button color="#ffffff1d" onClick={close}>
                닫기
              </_Button>
            </_ButtonBox>
          </_ScrapBox>
        </_Modal>
      </_ModalBg>
    </>
  );
}

export default SelectCategory;
