import { BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import {
  BlockNoteView,
  Theme,
  darkDefaultTheme,
  lightDefaultTheme,
} from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';

// 나중에 분리하기  + 배열에 저장하는 함수로 수정 -> post 함수는 추가
// async function saveToStorage(jsonBlocks: Block[]) {
//   localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
//   // console.log(JSON.stringify(jsonBlocks)); //Array // string으로 보내기
// }

// Uploads a file to tmpfiles.org and returns the URL to the uploaded file.
const lightRedTheme = {
  colors: {
    editor: {
      text: '#222222',
      background: '#ffeeee',
    },
    menu: {
      text: 'var(--color-zinc-800)',
      background: 'var(--color-zinc-800)',
    },
    tooltip: {
      text: 'var(--color-zinc-800)',
      background: 'var(--color-zinc-800)',
    },
    hovered: {
      text: 'var(--color-zinc-800)',
      background: 'var(--color-zinc-800)',
    },
    selected: {
      text: '#ffffff',
      background: 'var(--color-zinc-800)',
    },
    disabled: {
      text: '#9b0000',
      background: 'var(--color-zinc-800)',
    },
    shadow: '#640000',
    border: '#870000',
    sideMenu: 'var(--color-zinc-800)',
    highlights: lightDefaultTheme.colors!.highlights,
  },
  borderRadius: 4,
  fontFamily: 'Helvetica Neue, sans-serif',
} satisfies Theme;

// The theme for dark mode,
// users the light theme defined above with a few changes
const darkRedTheme = {
  ...lightRedTheme,
  colors: {
    ...lightRedTheme.colors,
    editor: {
      text: '#ffffff',
      background: 'var(--color-zinc-800)',
    },
    sideMenu: '#ffffff',
    highlights: darkDefaultTheme.colors!.highlights,
  },
} satisfies Theme;

// The combined "red theme",
// we pass this to BlockNoteView and then the editor will automatically
// switch between lightRedTheme / darkRedTheme based on the system theme
const redTheme = {
  light: lightRedTheme,
  dark: darkRedTheme,
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
// 나중에 분리하기 // 불러오기 get
async function loadFromStorage() {
  const storageString = localStorage.getItem('editorContent');
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Editor({
  setContent,
}: {
  setContent: (value: string) => void;
}) {
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | 'loading'
  >('loading');

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  const editor = useMemo(() => {
    if (initialContent === 'loading') {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent, uploadFile });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }
  // console.log('this', editor.document);

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      theme={redTheme.dark}
      onChange={() => {
        setContent(JSON.stringify(editor.document));
      }}
    />
  );
}
