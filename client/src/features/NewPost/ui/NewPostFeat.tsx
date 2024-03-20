import { _EditorBox, _EditorDiv } from './style';
import { useEffect, useState } from 'react';
import { Editor, GetSavings, NewPostHeadFeat } from '..';
import { useParams } from 'react-router-dom';
import {
  getsavingApi,
  newPostApi,
  newSavingApi,
  patchPostApi,
  patchSavingApi,
} from '../api/newPostApi';
import checkLinking from '../lib/checkLinking';

function NewPostFeat() {
  const { postId } = useParams();

  // postId가 존재하면 글 정보 불러오기
  useEffect(() => {
    if (postId) {
      getsavingApi(Number(postId));
    }
  }, [postId]);

  const [openSaving, setOpenSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [isPublic, setIsPublic] = useState<string>('true');
  const [content, setContent] = useState<string | undefined>();
  const [relatedPosts, setRelatedPosts] = useState<string[]>([]);

  function publishPost() {
    const postData = {
      category: '111a8a97-eb41-40a1-9e62-940b7fe9f671',
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
      relatedPosts: relatedPosts,
    };
    console.log('data', postData);
    if (postId) {
      patchPostApi(postData, Number(postId));
    } else {
      newPostApi(postData);
    }
  }

  function savePost() {
    const postData = {
      category: category,
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
    };
    if (postId) {
      patchSavingApi(postData, Number(postId));
    } else {
      newSavingApi(postData);
    }
  }

  return (
    <_EditorBox>
      {openSaving && <GetSavings onclick={() => setOpenSaving(false)} />}
      <NewPostHeadFeat
        data={{ title, category, isPublic }}
        savePost={() => {
          savePost();
        }}
        publishPost={() => {
          publishPost();
        }}
        openSaving={() => setOpenSaving(!openSaving)}
        setTitle={(value: string) => {
          setTitle(value);
        }}
        setCategory={(value: string) => {
          setCategory(value);
        }}
        setIsPublic={(value: string) => {
          setIsPublic(value);
        }}
      />
      <_EditorDiv>
        <Editor
          setContent={(value: string) => {
            setContent(value);
            setRelatedPosts(checkLinking(content));
          }}
        />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostFeat;
