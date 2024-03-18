import { _EditorBox, _EditorDiv } from './style';
import { useState } from 'react';
import { Editor, GetSavings, NewPostHeadFeat } from '..';
import { useParams } from 'react-router-dom';

function NewPostFeat() {
  // useParams로 postId 불러오기
  // 새글쓰기 - undefined
  // 임시저장 불러오기 - postId
  const { postId } = useParams();
  console.log('postId', { postId });

  const [openSaving, setOpenSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [isPublic, setIsPublic] = useState<string>('true');
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
        setIsPublic={(value: string) => {
          setIsPublic(value);
          console.log(isPublic);
        }}
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
