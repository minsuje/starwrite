import {
  BlockNoteEditor,
  PartialBlock,
  BlockNoteSchema,
  defaultInlineContentSpecs,
  Block,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';
import { Mention } from '../../../NewPost/ui/Mention';
import { deletePostApi, postDetailApi } from '../../api/PostApi';
import { useNavigate, useParams } from 'react-router';
import { _Title } from '../style';
import { redTheme } from '../../../NewPost/ui/style';

import CommentList from '../Comment/CommentList';

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

export default function ListDetailFeat() {
  const { postId } = useParams();
  const myNickname = localStorage.getItem('nickname');
  const navigate = useNavigate();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const [title, setTitle] = useState<string>();
  const [visible, setVisible] = useState<string>();
  const [isMine, setIsMine] = useState<boolean>(true);
  const [blocks, setBlocks] = useState<Block>();

  function editPost(postid: number) {
    navigate(`/user/starwrite/writenewpost/${postid}`);
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

  useEffect(() => {
    const promise = postDetailApi(Number(postId));
    promise.then((postDetail) => {
      setInitialContent(JSON.parse(postDetail.post.content) as PartialBlock[]);
      setTitle(postDetail.post.title);
      setVisible(postDetail.post.visible);
      setIsMine(postDetail.isMine);
    });
  }, [postId]);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ schema, initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }

  // Renders the editor instance.

  return (
    <>
      <_Title>
        {title}
        <div>{visible === 'true' ? '공개' : '비공개'}</div>
      </_Title>
      {isMine && (
        <_Title>
          <button onClick={() => editPost(Number(postId))}>수정</button>
          <button onClick={() => deletePost(Number(postId))}>삭제</button>
        </_Title>
      )}

      <div onKeyDown={(e) => e.preventDefault()}>
        <BlockNoteView
          slashMenu={false}
          editor={editor}
          theme={redTheme.dark}
          onSelectionChange={() => {
            const selection = editor.getSelection();
            if (selection !== undefined) {
              setBlocks(selection.blocks);
            } else {
              setBlocks(editor.getTextCursorPosition().block);
              const lineContent = blocks[0];
              console.log('detailFeat', blocks);
            }
          }}
        />
      </div>
      <CommentList selectedLine={blocks[0]} />
    </>
  );
}
