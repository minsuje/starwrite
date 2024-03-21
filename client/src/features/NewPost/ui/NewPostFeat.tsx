import { _EditorBox, _EditorDiv } from './style';
import { useEffect, useState } from 'react';
import { Editor, GetSavings, NewPostHeadFeat } from '..';
import { useParams } from 'react-router-dom';
import {
  getsavingApi,
  // newPostApi,
  newSavingApi,
  // patchPostApi,
  patchSavingApi,
} from '../api/newPostApi';
import checkLinking from '../lib/checkLinking';

interface Saving {
  categoryid: string;
  posts: {
    category: string | null;
    content: string;
    createdAt: Date;
    img: string;
    postId: null;
    recentView: null;
    relatedPost: null;
    title: string;
    tmpSave: boolean;
    updatedAt: Date;
    users: null;
    visible: string;
  };
  postid: null;
  usersRelationType: null;
}

function NewPostFeat() {
  const { postId } = useParams();

  // postId가 존재하면 글 정보 불러오기
  useEffect(() => {
    if (postId) {
      const promise = getsavingApi(Number(postId));
      promise.then((saving: Saving) => {
        console.log('saving data: ', saving);
        setTitle(saving.posts.title);
        setSaved(saving.posts.content);
        setIsPublic(saving.posts.visible);
        if (saving.categoryid) {
          setCategory(saving.categoryid);
        } else {
          setCategory('');
        }
      });
    }
  }, [postId]);

  const [openSaving, setOpenSaving] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [isPublic, setIsPublic] = useState<string>('true');
  const [content, setContent] = useState<string | undefined>();
  const [relatedPosts, setRelatedPosts] = useState<number[]>([]);
  const [saved, setSaved] = useState<string | undefined>();
  const [onValid, setOnValid] = useState<boolean>(true);

  function publishPost() {
    console.log(title);
    setRelatedPosts(checkLinking(content));
    if (title === undefined || title.length > 50) {
      setOnValid(false);
      console.log('제목 1자 이상 50자 이하로 작성해주세요');
      return;
    }
    const postData = {
      category: category,
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
      relatedPosts: relatedPosts,
    };
    console.log('data', postData);
    // if (postId) {
    //   patchPostApi(postData, Number(postId));
    // } else {
    //   newPostApi(postData);
    // }
  }

  function savePost() {
    const postData = {
      category: category,
      post: {
        title: title,
        content: content,
        visible: isPublic,
      },
      relatedPosts: [],
    };
    console.log('postData', postData);
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
        onValid={onValid}
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
          content={saved}
          setContent={(value: string) => {
            setContent(value);
          }}
        />
      </_EditorDiv>
    </_EditorBox>
  );
}

export default NewPostFeat;
