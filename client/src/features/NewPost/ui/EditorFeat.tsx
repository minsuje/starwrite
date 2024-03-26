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
import { Titles } from '../model/types';

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
const schema = BlockNoteSchema.create({
  inlineContentSpecs: {
    // Adds all default inline content.
    ...defaultInlineContentSpecs,
    // Adds the mention tag.
    mention: Mention,
  },
});

let myNickname = localStorage.getItem('nickname');
if (!myNickname) {
  myNickname = '닉네임';
}

const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor,
  titles: Titles[],
): DefaultReactSuggestionItem[] => {
  return titles.map((title) => ({
    title: title.title,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: 'mention',
          props: {
            title: title.title,
            postid: title.postid.toString(),
            nickname: myNickname,
          },
        },
        ' \n', // add a space after the mention
      ]);
    },
  }));
};
// async function uploadFile(file: File) {
//   const body = new FormData();
//   body.append('file', file);

//   const ret = await fetch('https://tmpfiles.org/api/v1/upload', {
//     method: 'POST',
//     body: body,
//   });
//   return (await ret.json()).data.url.replace(
//     'tmpfiles.org/',
//     'tmpfiles.org/dl/',
//   );
// }

export default function Editor({
  titleList,
  content,
  setContent,
}: {
  titleList: Titles[];
  content: string | undefined;
  setContent: (value: string) => void;
}) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >(undefined);

  const [titles, setTitles] = useState<Titles[]>([]);

  useEffect(() => {
    if (content) {
      setInitialContent(JSON.parse(content) as PartialBlock[]);
    }
  }, [content]);

  useEffect(() => {
    setTitles(titleList);
  }, [titleList]);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({
      schema,
      initialContent,
      // uploadFile,
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
