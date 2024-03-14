import savePost from '../lib/savePost';
import { categories } from '../../ListView/model/CategoryData';
import { _EditorHead, _TitleInput } from './style';

type openSaving = () => void;
function NewPostHeadFeat({
  openSaving,
  setTitle,
  setCategory,
}: {
  openSaving: openSaving;
  setTitle: () => void;
  setCategory: () => void;
}) {
  return (
    <>
      <_EditorHead>
        <_TitleInput
          placeholder="제목을 입력하세요"
          onChange={() => setTitle}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={openSaving}>임시저장</button>
          <button onClick={savePost}>저장</button>
        </div>
      </_EditorHead>
      <_EditorHead content={'start'}>
        <p>카테고리 </p>
        <select
          onChange={setCategory}
          style={{
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
              >
                {category}
              </option>
            );
          })}
        </select>
      </_EditorHead>
    </>
  );
}

export default NewPostHeadFeat;
