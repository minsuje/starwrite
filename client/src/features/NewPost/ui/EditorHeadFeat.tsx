import { Category, useAppSelector } from '../../../shared/model';
import { getCategoriesApi } from '../../ListView/api/CategoryApi';
import { _EditorHead, _TitleInput, _PublcButton } from './style';
import { useEffect, useState } from 'react';
import { _ErrorMsg } from '../../../shared/CommonStyle';
import { currentCategory } from '../../ListView/model/CategorySlice';
import { _buttonBox } from '../../ListView/ui/style';
import styled from 'styled-components';

const _newBox = styled(_buttonBox)`
  /* margin: 25px; */
  display: flex;
  width: fit-content;
`;

const _newPostHeader = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  margin-bottom: 16px;
`;

function NewPostHeadFeat({
  onValid,
  data,
  tmpSaved,
  publishPost,
  savePost,
  openSaving,
  setTitle,
  setCategory,
  setIsPublic,
  setOnValid,
}: {
  tmpSaved: boolean | undefined;
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
    } else if (categories[0]) {
      setCategory(categories[0].categoryId);
    }
  }, [categories, selected]);

  return (
    <>
      <_newPostHeader>
        <_TitleInput
          placeholder="제목을 입력하세요"
          defaultValue={title ? title : undefined}
          onChange={(value) => {
            setTitle(value.currentTarget.value);
            setOnValid();
          }}
        />
        <_ErrorMsg>
          {onValid === 'false'
            ? '제목은 1자 이상 50자 이하로 작성해주세요'
            : onValid === 'duplicate'
              ? '이미 존재하는 제목입니다.'
              : ''}
        </_ErrorMsg>
        <_newBox>
          {tmpSaved && (
            <>
              <button onClick={openSaving}>불러오기</button>
              <button onClick={savePost}>임시저장 </button>
            </>
          )}
          <button onClick={() => publishPost()}>저장하기</button>
        </_newBox>
      </_newPostHeader>

      <_EditorHead content={'space-between'}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            // width: '50%',
          }}
        >
          <p>카테고리</p>
          <select
            value={category}
            onChange={(value) => {
              setCategory(value.currentTarget.value);
            }}
            style={{
              // width: '10rem',
              padding: '8px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem',
            }}
          >
            {categories.map((category, idx) => {
              return (
                <option key={idx} value={category.categoryId}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
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
