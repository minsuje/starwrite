import styled from 'styled-components';
import { Editor } from '../../features/NewPost';

const _EditorBox = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: 5vh auto;
  gap: 20px;
`;
const _EditorDiv = styled.div`
  width: 100%;
  height: 70vh;
  background-color: #202020;
  padding: 25px 0;
  overflow-y: auto;
`;

const _EditorHead = styled.div`
  width: 90%;
  background-color: #202020;
  padding: 3% 5%;
`;
function NewPostWid() {
  return (
    <_EditorBox>
      <_EditorHead>
        {/* 컴포넌트 생성 */}
        <h1> 제목 </h1>
      </_EditorHead>
      <_EditorHead>
        {/* 컴포넌트 생성 */}
        <h1> 카테고리 선택 </h1>
      </_EditorHead>
      <_EditorDiv>
        <Editor />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostWid;
