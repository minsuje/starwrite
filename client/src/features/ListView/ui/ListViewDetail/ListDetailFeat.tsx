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
import { _buttonBox, _NoneList } from '../style';
import './ListDetailFeat.css';

const _DetailButton = styled.button`
  width: fit-content;
  background: none;
  color: var(--color-primary-100);
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: var(--color-primary-400);
  }
`;
export default function ListDetailFeat() {
  const { nickname, postId } = useParams();
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const [isMine, setIsMine] = useState<boolean>(true);
  const [isWriter, setIsWriter] = useState<boolean>();
  const [blocks, setBlocks] = useState<MyBlock[]>([]);
  const [scrap, setScrap] = useState<boolean>(false);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [post, setPost] = useState<PostDetail>();

  const reset = useAppSelector(commentState);

  function editPost(postid: number) {
    navigate(`/user/starwrite/writenewpost/${postid}`);
  }
  function openScrap() {
    const promise = getTitleApi();
    promise.then((titles) => {
      // 중복검사
      for (let i = 0; i < titles.length; i++) {
        if (titles[i].title === post?.title) {
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
    if (myNickname === nickname) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
    const promise = postDetailApi(Number(postId));
    promise.then((postDetail: PostDetail) => {
      setInitialContent(JSON.parse(postDetail.content) as PartialBlock[]);
      setPost(postDetail);
      setAnnotations(postDetail.annotations);
      if (postDetail.authorNickname === nickname) {
        setIsWriter(true);
      } else {
        setIsWriter(false);
      }
    });
  }, [postId, myNickname, reset, nickname]);

  // 에디터 생성
  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ schema, initialContent });
  }, [initialContent]);

  // editor 생성 X
  if (editor === undefined) {
    return <_NoneList>Loading content...</_NoneList>;
  }
  // 내글이 아닐 때 + 비공개 글
  if (!isMine && post?.visible === 'false') {
    return <>비공개글입니다.</>;
  }

  // 조회가능한 글
  return (
    <>
      <_Title>
        {post?.title}
        <p>{post?.categoryName}</p>
        {!isWriter && <p>스크랩</p>}
        <p>{post?.visible === 'true' ? '공개' : '비공개'}</p>
      </_Title>
      <_buttonBox>
        {isMine && isWriter && (
          <>
            <_DetailButton onClick={() => editPost(Number(postId))}>
              수정
            </_DetailButton>
          </>
        )}

        {!isMine && isWriter && (
          <>
            <_DetailButton onClick={openScrap}>스크랩</_DetailButton>
          </>
        )}

        {isMine && (
          <>
            <_DetailButton onClick={() => deletePost(Number(postId))}>
              삭제
            </_DetailButton>
          </>
        )}
      </_buttonBox>
      <hr style={{ borderColor: 'var(--color-zinc-600)' }}></hr>
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
          data-theming-css-demo
          editable={false}
          theme={redTheme.light}
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
      <hr style={{ borderColor: 'var(--color-zinc-600)' }}></hr>
      <div>
        <CommentList annotations={annotations} selectedLine={blocks[0]} />
      </div>
    </>
  );
}
