import { Block, BlockNoteEditor, PartialBlock } from '@blocknote/core';
import '@blocknote/core/fonts/inter.css';
import { BlockNoteView, darkDefaultTheme } from '@blocknote/react';
import '@blocknote/react/style.css';
import { useEffect, useMemo, useState } from 'react';

// 나중에 분리하기  + 배열에 저장하는 함수로 수정 -> post 함수는 추가
async function saveToStorage(jsonBlocks: Block[]) {
  localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
  console.log(jsonBlocks); //Array
}

// 나중에 분리하기 // 불러오기 get
async function loadFromStorage() {
  const storageString = localStorage.getItem('editorContent');
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default function Editor() {
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
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return 'Loading content...';
  }

  // Renders the editor instance.
  return (
    <BlockNoteView
      editor={editor}
      theme={darkDefaultTheme}
      onChange={() => {
        saveToStorage(editor.document);
      }}
    />
  );
}
