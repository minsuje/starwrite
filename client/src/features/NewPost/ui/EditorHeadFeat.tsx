// import { Category } from '../../../shared/types/app';
// import { getCategoriesApi } from '../../ListView/api/CategoryApi';

import { Category, useAppSelector } from '../../../shared/model';
import { getCategoriesApi } from '../../ListView/api/CategoryApi';
import { _EditorHead, _TitleInput, _PublcButton } from './style';
import { useEffect, useState } from 'react';
import { _ErrorMsg } from '../../../shared/CommonStyle';
import { currentCategory } from '../../ListView/model/CategorySlice';

function NewPostHeadFeat({
  onValid,
  data,
  publishPost,
  savePost,
  openSaving,
  setTitle,
  setCategory,
  setIsPublic,
  setOnValid,
}: {
  onValid: string;
  data: {
    title: string | undefined;
    category: string | undefined;
    isPublic: string | undefined;
  };
  savePost: () => void;
  publishPost: () => void;
  openSaving: () => void;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
  setIsPublic: (value: string) => void;
  setOnValid: () => void;
}) {
  const [toggleButton, setToggleButton] = useState<boolean>(true);
  const [categories, setCategories] = useState<Category[]>([]);

  const { title, category, isPublic } = data;
  const selected = useAppSelector(currentCategory);

  useEffect(() => {
    if (isPublic === 'true') {
      setToggleButton(true);
    } else {
      setToggleButton(false);
    }
  }, [isPublic]);

  useEffect(() => {
    const myNickname = localStorage.getItem('nickname');

    if (myNickname) {
      const promise = getCategoriesApi(myNickname);
      promise.then((categories) => {
        setCategories(categories);
      });
    }
  }, [selected]);

  useEffect(() => {
    console.log('category', category);
    if (selected !== '' && selected !== 'all' && selected !== 'scrab') {
      setCategory(selected);
      console.log('category2', category);
    } else if (categories[0]) {
      console.log('설마 여기?');
      setCategory(categories[0].categoryId);
    }

    console.log('category', category);
  }, [categories]);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
        <button onClick={openSaving}>임시저장 불러오기</button>
        <button onClick={savePost}>임시저장 </button>
        <button onClick={() => publishPost()}>저장</button>
      </div>

      {/* <_EditorHead> */}
      <_TitleInput
        placeholder="제목을 입력하세요"
        defaultValue={title ? title : undefined}
        onChange={(value) => {
          setTitle(value.currentTarget.value);
          setOnValid();
        }}
      />
      {/* </_EditorHead> */}

      <_ErrorMsg>
        {onValid === 'false'
          ? '제목은 1자 이상 50자 이하로 작성해주세요'
          : onValid === 'duplicate'
            ? '이미 존재하는 제목입니다.'
            : ''}
      </_ErrorMsg>

      <_EditorHead content={'start'}>
        <p>카테고리</p>
        <select
          value={category}
          onChange={(value) => {
            setCategory(value.currentTarget.value);
          }}
          style={{
            // width: '50%',
            width: 'fit-content',
            padding: '0px 5%',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            color: 'white',
            border: 'none',
            fontSize: '0.9rem',
          }}
        >
          {categories.map((category, idx) => {
            return (
              <option
                style={{
                  padding: '10px 10px',
                  backgroundColor: 'rgba(0,0,0,1)',
                  color: 'white',
                  border: 'none',
                }}
                key={idx}
                value={category.categoryId}
              >
                {category.name}
              </option>
            );
          })}
        </select>

        <p>공개설정</p>

        <div style={{ display: 'flex', gap: '20px' }}>
          <_PublcButton
            color={toggleButton ? 'var(--color-zinc-600)' : undefined}
            onClick={() => {
              setIsPublic('true');
              setToggleButton(true);
            }}
          >
            공개
          </_PublcButton>
          <_PublcButton
            color={!toggleButton ? 'var(--color-zinc-600)' : undefined}
            onClick={() => {
              setIsPublic('false');
              setToggleButton(false);
            }}
          >
            비공개
          </_PublcButton>
        </div>
      </_EditorHead>
    </>
  );
}

export default NewPostHeadFeat;
