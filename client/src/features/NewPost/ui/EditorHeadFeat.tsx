import styled from 'styled-components';
import savePost from '../lib/savePost';

const _EditorHead = styled.div`
  width: 90%;
  background-color: #202020;
  padding: 3% 5%;
  display: flex;
  justify-content: space-between;
`;
function NewPostHeadFeat() {
  return (
    <>
      <_EditorHead>
        <h1> 제목 </h1>
        <button onClick={savePost}>저장</button>
      </_EditorHead>
      <_EditorHead>
        <h1> 카테고리 선택 </h1>
      </_EditorHead>
    </>
  );
}

export default NewPostHeadFeat;
