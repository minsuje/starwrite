// import { Category } from '../../../shared/types/app';
// import { getCategoriesApi } from '../../ListView/api/CategoryApi';
import { categories } from '../../ListView/model/CategoryData';
import { _EditorHead, _TitleInput, _PublcButton } from './style';
import { useEffect, useState } from 'react';

function NewPostHeadFeat({
  data,
  publishPost,
  savePost,
  openSaving,
  setTitle,
  setCategory,
  setIsPublic,
}: {
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
}) {
  const [toggleButton, setToggleButton] = useState<boolean>(true);
  // const [categories, setCategories] = useState<Category[]>([]);

  const { title, category, isPublic } = data;

  // useEffect(() => {
  //   const promise = getCategoriesApi('고길동');
  //   promise.then((categories) => {
  //     console.log('categories data:', categories);
  //     setCategories(categories);
  //   });
  // }, []);

  useEffect(() => {
    if (isPublic === 'true') {
      setToggleButton(true);
    } else {
      setToggleButton(false);
    }
  }, [isPublic]);
  return (
    <>
      <_EditorHead>
        <_TitleInput
          placeholder="제목을 입력하세요"
          value={title ? title : undefined}
          onChange={(value) => setTitle(value.currentTarget.value)}
        />

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={savePost}>임시저장 </button>
          <button onClick={openSaving}>임시저장 불러오기</button>
          <button onClick={() => publishPost()}>저장</button>
        </div>
      </_EditorHead>
      <_EditorHead content={'start'}>
        <p>카테고리 </p>
        <select
          value={category}
          onChange={(value) => setCategory(value.currentTarget.value)}
          style={{
            width: '40%',
            padding: '0px 10%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            color: 'white',
            border: 'none',
            fontSize: '17px',
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
                value={category.id}
              >
                {category.name}
              </option>
            );
          })}
        </select>
      </_EditorHead>
      <_EditorHead>
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
      </_EditorHead>
    </>
  );
}

export default NewPostHeadFeat;
