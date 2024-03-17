import { savePost } from '../lib/savePost';
import { categories } from '../../ListView/model/CategoryData';
import { _EditorHead, _TitleInput, _PublcButton } from './style';
import { useState } from 'react';

function NewPostHeadFeat({
  openSaving,
  setTitle,
  setCategory,
  setIsPublic,
}: {
  openSaving: () => void;
  setTitle: (value: string) => void;
  setCategory: (value: string) => void;
  setIsPublic: (value: string) => void;
}) {
  const [toggleButton, setToggleButton] = useState<boolean>(false);
  return (
    <>
      <_EditorHead>
        <_TitleInput
          placeholder="제목을 입력하세요"
          onChange={(value) => setTitle(value.currentTarget.value)}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={openSaving}>임시저장 불러오기</button>
          <button onClick={() => savePost('저장')}>저장</button>
        </div>
      </_EditorHead>
      <_EditorHead content={'start'}>
        <p>카테고리 </p>
        <select
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
          color={toggleButton}
          onClick={() => {
            setIsPublic('true');
            setToggleButton(true);
          }}
        >
          공개
        </_PublcButton>
        <_PublcButton
          color={!toggleButton}
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
