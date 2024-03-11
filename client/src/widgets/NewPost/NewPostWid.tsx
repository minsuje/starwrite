import styled from 'styled-components';
import { Editor, NewPostHeadFeat } from '../../features/NewPost';

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

function NewPostWid() {
  return (
    <_EditorBox>
      <NewPostHeadFeat />
      <_EditorDiv>
        <Editor />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostWid;
