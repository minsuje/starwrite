import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';
import { MyBlock, schema } from '../../model/type';
import { deletePostApi, postDetailApi } from '../../api/PostApi';
import { useNavigate, useParams } from 'react-router';
import { _Title } from '../style';
import { redTheme } from '../../../NewPost/ui/style';
import CommentList from '../Comment/CommentList';
import SelectCategory from '../../lib/SelectCategory';
import { Annotation, PostDetail } from '../../../../shared/model/types';
import { getTitleApi } from '../../../NewPost/api/newPostApi';
import { useAppSelector } from '../../../../shared/model';
import { commentState } from '../../model/CommentSlice';
import styled from 'styled-components';

const _DetailButton = styled.div`
  width: 10%;
  background-color: var(--color-primary-500);
  color: white;
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export default function ListDetailFeat() {
  const { postId } = useParams();
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const [title, setTitle] = useState<string>();
  const [visible, setVisible] = useState<string>();
  const [isMine, setIsMine] = useState<string>('true');
  const [blocks, setBlocks] = useState<MyBlock[]>([]);
  const [scrap, setScrap] = useState<boolean>(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);

  const reset = useAppSelector(commentState);

  function editPost(postid: number) {
    navigate(`/user/starwrite/writenewpost/${postid}`);
  }
  function openScrap() {
    const promise = getTitleApi();
    promise.then((titles) => {
      console.log('titles', titles);
      for (let i = 0; i < titles.length; i++) {
        if (titles[i].title === title) {
          alert('같은 제목의 글이 있습니다.');
          return;
        }
      }
      setScrap(true);
    });
  }
  async function deletePost(postid: number) {
    const promise = deletePostApi(postid);
    promise
      .then((result) => {
        if (result === '삭제 성공') {
          alert('삭제 완료 되었습니다.');
          navigate(`/user/starwrite/listview/main/${myNickname}/all`);
        }
      })
      .catch(() => {
        console.error('!!');
      });
  }

  //글 상세 정보 불러오기
  useEffect(() => {
    const promise = postDetailApi(Number(postId));
    promise.then((postDetail: PostDetail) => {
      setInitialContent(JSON.parse(postDetail.content) as PartialBlock[]);
      setTitle(postDetail.title);
      setVisible(postDetail.visible);
      if (postDetail.authorNickname === myNickname) {
        setIsMine('true');
      } else if (postDetail.authorNickname === null) {
        setIsMine('scrap');
      } else {
        setIsMine('false');
      }
      setAnnotations(postDetail.annotations);
    });
  }, [postId, myNickname, reset]);

  // 에디터 생성
  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ schema, initialContent });
  }, [initialContent]);

  // editor 생성 X
  if (editor === undefined) {
    return 'Loading content...';
  }
  // 내글이 아닐 때 + 비공개 글
  if (isMine === 'false' && visible === 'false') {
    return <>비공개글입니다.</>;
  }

  // 조회가능한 글
  return (
    <>
      <_Title>
        {title}
        <div>{visible === 'true' ? '공개' : '비공개'}</div>
      </_Title>

      {/* 내글은 수정, 삭제 가능 
      // 다른 사람글은 스크랩만 가능 
      (스크랩할 때 중복검사) */}
      <_Title>
        {isMine === 'true' && (
          <>
            <_DetailButton onClick={() => editPost(Number(postId))}>
              수정
            </_DetailButton>
          </>
        )}

        {isMine === 'false' && (
          <>
            <_DetailButton onClick={openScrap}>스크랩</_DetailButton>
          </>
        )}

        {isMine !== 'false' && (
          <>
            <_DetailButton onClick={() => deletePost(Number(postId))}>
              삭제
            </_DetailButton>
          </>
        )}
      </_Title>
      {scrap && (
        <SelectCategory
          postId={postId}
          close={() => setScrap(false)}
        ></SelectCategory>
      )}
      <div onKeyDown={(e) => e.preventDefault()}>
        <BlockNoteView
          slashMenu={false}
          editor={editor}
          editable={false}
          theme={redTheme.dark}
          onSelectionChange={() => {
            const selection = editor.getSelection();
            if (selection !== undefined) {
              setBlocks(selection.blocks);
            } else {
              setBlocks([editor.getTextCursorPosition().block]);
            }
          }}
        />
      </div>
      <div>
        <CommentList annotations={annotations} selectedLine={blocks[0]} />
      </div>
    </>
  );
}
