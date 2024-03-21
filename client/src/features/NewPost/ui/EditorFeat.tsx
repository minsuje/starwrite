import {
  BlockNoteEditor,
  PartialBlock,
  BlockNoteSchema,
  defaultInlineContentSpecs,
  filterSuggestionItems,
} from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  DefaultReactSuggestionItem,
  SuggestionMenuController,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';
import { redTheme } from './style';
import { Mention } from './Mention';
import Titles from '../model/Titles';
import { getTitleApi } from '../api/newPostApi';

interface Titles {
  postid: number;
  title: string;
}
// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor,
  titles: Titles[],
): DefaultReactSuggestionItem[] => {
  return titles.map((title) => ({
    title: title.title,
    onItemClick: () => {
      // const name = title.name;
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            title: title.title,
            postid: title.postid.toString(),
          },
        },
        ' \n', // add a space after the mention
      ]);
    },
  }));
};
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

export default function Editor({
  content,
  setContent,
}: {
  content: string | undefined;
  setContent: (value: string) => void;
}) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >(undefined);

  const [titles, setTitles] = useState<Titles[]>([]);

  useEffect(() => {
    if (content) {
      setInitialContent(JSON.parse(content));
      console.log('content', content);
    }
  }, [content]);

  useEffect(() => {
    const promise = getTitleApi();
    promise.then((titleList) => {
      console.log('titles data: ', titleList);
      setTitles(titleList);
    });
  }, []);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({
      schema,
      initialContent,
      uploadFile,
    });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }

  return (
    <BlockNoteView
      editor={editor}
      theme={redTheme.dark}
      onChange={() => {
        setContent(JSON.stringify(editor.document));
      }}
    >
      <SuggestionMenuController
        triggerCharacter={'@'} // 한글자만 가능
        getItems={async (query) =>
          // Gets the mentions menu items
          filterSuggestionItems(getMentionMenuItems(editor, titles), query)
        }
      />
    </BlockNoteView>
  );
}
