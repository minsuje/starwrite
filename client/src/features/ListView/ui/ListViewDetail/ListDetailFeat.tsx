import {
  BlockNoteEditor,
  PartialBlock,
  BlockNoteSchema,
  defaultInlineContentSpecs,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView, darkDefaultTheme } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';
import { PostList } from '../../model/listViewData';
import { Mention } from '../../../NewPost/ui/Mention';
import { postDetailApi } from '../../api/PostApi';
import { useParams } from 'react-router';

const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});
// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
async function uploadFile(file: File) {
  const body = new FormData();
  body.append('file', file);

  const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
    method: 'POST',
    body: body,
  });
  return (await ret.json()).data.url.replace(
    'tmpfiles.org/',
    'tmpfiles.org/dl/',
  );
}
// 나중에 분리하기
// 불러오기 get
async function loadFromStorage() {
  const storageString = PostList[1].content;
  console.log('?', JSON.parse(storageString) as PartialBlock[]);
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function ListDetailFeat() {
  const { postId } = useParams();

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  useEffect(() => {
    const promise = postDetailApi(Number(postId));
    promise.then((postDetail) => {
      console.log('postDetail data: ', postDetail);
      setInitialContent(JSON.parse(postDetail.post.content));
    });
  }, [postId]);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ schema, initialContent, uploadFile });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }
  console.log('initialContent', loadFromStorage());
  // Renders the editor instance.

  return (
    <div onKeyDown={(e) => e.preventDefault()}>
      <BlockNoteView
        editor={editor}
        theme={darkDefaultTheme}
        onSelectionChange={() => {
          const textCursorPosition = editor.getTextCursorPosition();
          editor.toggleStyles({
            backgroundColor: 'yellow',
          });
          console.log('textCursorPosition', textCursorPosition.block);
        }}
      />
    </div>
  );
}
