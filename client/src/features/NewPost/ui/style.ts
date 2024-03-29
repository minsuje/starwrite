import styled from 'styled-components';
import { Input } from '../../../shared/CommonStyle';
import { Theme, darkDefaultTheme, lightDefaultTheme } from '@blocknote/react';

import { _Modal } from '../../../shared/Modal/ModalStyle';
// 스타일
const OneCategory = styled.div`
  width: 80%;
  margin: 0px auto;
  text-align: center;
  padding: 15px 0px;
  background-color: var(--color-zinc-700);
  opacity: ${(props) => props.color || '0.6'};
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const ListCategories = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const _EditorHead = styled.div`
  width: 90%;
  background-color: var(--color-zinc-900);
  border: 1px solid;
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 7px;
  padding: 2% 5%;
  display: flex;
  justify-content: ${(props) => props.content || 'space-between'};
  align-items: center;
  gap: 10px;
  p {
    font-size: 15px;
    font-weight: 800;
    width: 50%;
    text-align: center;
  }
`;

const _TitleInput = styled(Input)`
  width: 100%;
  background-color: var(--color-zinc-900);
  font-size: 20px;
`;

const _EditorBox = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  margin: 5vh auto;
  gap: 20px;
`;
const _EditorDiv = styled.div`
  width: 100%;
  height: 70vh;
  background-color: var(--color-zinc-800);
  padding: 25px 0;
  overflow-y: auto;
`;

const _PublcButton = styled.div`
  border: 1px solid var(--color-zinc-600);
  font-size: 0.8rem;
  border-radius: 4px;
  width: 5em;
  text-align: center;
  padding: 4px 0;
  background-color: ${(props) => props.color || 'none'};
  &:hover {
    cursor: pointer;
  }
`;

// 에디터 테마
const lightRedTheme = {
  colors: {
    editor: {
      text: 'var(--color-zinc-100)',
      background: 'var(--color-zinc-900)',
    },
    menu: {
      text: 'var(--color-zinc-100)',
      background: 'var(--color-zinc-800)',
    },
    tooltip: {
      text: 'var(--color-zinc-100)',
      background: 'var(--color-zinc-800)',
    },
    hovered: {
      text: 'var(--color-zinc-300)',
      background: 'var(--color-zinc-800)',
    },
    selected: {
      text: '#ffffff',
      background: 'var(--color-zinc-800)',
    },
    disabled: {
      text: '#ffffff',
      background: 'var(--color-zinc-800)',
    },
    shadow: '#000000',
    border: '#000000',
    sideMenu: 'var(--color-zinc-100)',
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
      text: 'var(--color-zinc-100)',
      background: 'var(--color-zinc-800)',
    },
    sideMenu: 'var(--color-zinc-100)',
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

//  임시저장 Modal style 정의
export const _Box = styled(_Modal)`
  display: flex;
  width: 80%;
  height: 80%;
  top: 0;
  flex-direction: column;
  gap: 30px;
  color: #adadad;

  label {
    font-size: 20px;
  }
`;

export const _postBox = styled.div`
  padding: 25px 20px;
  background-color: var(--color-zinc-700);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-decoration: none;
  text-decoration-line: none;
  h1 {
    font-size: 20px;
    color: var(--color-zinc-300);
  }
  p {
    font-size: 13px;
    color: var(--color-zinc-500);
  }
  &:hover {
    opacity: 0.8;
  }
`;

export {
  redTheme,
  _TitleInput,
  _EditorHead,
  ListCategories,
  OneCategory,
  _EditorBox,
  _EditorDiv,
  _PublcButton,
};
