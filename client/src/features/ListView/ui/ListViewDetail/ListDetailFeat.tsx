import {
  BlockNoteEditor,
  PartialBlock,
  BlockNoteSchema,
  defaultInlineContentSpecs,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';
import { PostList } from '../../model/listViewData';
import { Mention } from '../../../NewPost/ui/Mention';
import { deletePostApi, postDetailApi } from '../../api/PostApi';
import { useNavigate, useParams } from 'react-router';
import { _Title } from '../style';
import { redTheme } from '../../../NewPost/ui/style';

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

async function loadFromStorage() {
  const storageString = PostList[1].content;
  console.log('?', JSON.parse(storageString) as PartialBlock[]);
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function ListDetailFeat() {
  const { postId } = useParams();
  const myNickname = localStorage.getItem('nickname');

  const navigate = useNavigate();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');
  const [title, setTitle] = useState<string>();
  const [visible, setVisible] = useState<string>();

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
      console.log('postDetail data: ', postDetail);
      setInitialContent(JSON.parse(postDetail.post.content) as PartialBlock[]);
      setTitle(postDetail.post.title);
      setVisible(postDetail.post.visible);
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
  console.log('initialContent', loadFromStorage());
  // Renders the editor instance.

  return (
    <>
      <_Title>
        {title}
        <div>{visible === 'true' ? '공개' : '비공개'}</div>
      </_Title>
      <_Title>
        <button onClick={() => editPost(Number(postId))}>수정</button>
        <button onClick={() => deletePost(Number(postId))}>삭제</button>
      </_Title>

      <div onKeyDown={(e) => e.preventDefault()}>
        <BlockNoteView
          editor={editor}
          theme={redTheme.dark}
          onSelectionChange={() => {
            const textCursorPosition = editor.getTextCursorPosition();
            editor.toggleStyles({
              backgroundColor: 'yellow',
            });
            console.log('textCursorPosition', textCursorPosition.block);
          }}
        />
      </div>
    </>
  );
}
