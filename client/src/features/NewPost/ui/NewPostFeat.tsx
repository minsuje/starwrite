import { _EditorBox, _EditorDiv } from './style';
import { useState } from 'react';
import { Editor, GetSavings, NewPostHeadFeat } from '..';

function NewPostFeat() {
  const [openSaving, setOpenSaving] = useState<boolean>(false);

  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [isPublic, setIsPublic] = useState<boolean>(true);

  const [content, setContent] = useState<string | undefined>();

  return (
    <_EditorBox>
      {openSaving && <GetSavings onclick={() => setOpenSaving(false)} />}
      <NewPostHeadFeat
        openSaving={() => setOpenSaving(!openSaving)}
        setTitle={(value: string) => {
          setTitle(value);
          console.log(title);
        }}
        setCategory={(value: string) => {
          setCategory(value);
          console.log(category);
        }}
        setIsPublic={(value: boolean) => setIsPublic(value)}
        isPublic={isPublic}
      />
      <_EditorDiv>
        <Editor
          setContent={(value: string) => {
            setContent(value);
            console.log('content : ', content);
          }}
        />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostFeat;
