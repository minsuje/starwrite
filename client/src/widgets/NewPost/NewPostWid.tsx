import styled from 'styled-components';
import { Editor, NewPostHeadFeat } from '../../features/NewPost';
import { useState } from 'react';

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
  const [openSaving, setOpenSaving] = useState<boolean>(false);
  return (
    <_EditorBox>
      {openSaving && <>안녕</>}
      <NewPostHeadFeat openSaving={() => setOpenSaving(!openSaving)} />
      <_EditorDiv>
        <Editor />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostWid;
