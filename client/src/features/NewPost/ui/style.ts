import styled from 'styled-components';
import { Input } from '../../../shared/CommonStyle';
import { Theme, darkDefaultTheme } from '@blocknote/react';
import { motion } from 'framer-motion';

import { _Modal } from '../../../shared/Modal/ModalStyle';
// 스타일
const OneCategory = styled(motion.div)`
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  width: 100%;
  margin: 0px auto;
  text-align: center;
  padding: 16px 0px;
  border-radius: 4px;
  background-color: var(--color-zinc-700);
  transition: all 0.3s ease;
  background-color: ${(props) => props.color || '#4242422a'};
  &:hover {
    background-color: #c0c0c02a;
    transition: all 0.3s ease;
    cursor: pointer;
  }
`;

const ListCategories = styled.div`
  width: 100%;
  /* height: 100%; */
  /* margin: auto; */
  /* padding-top: 10px; */
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const _EditorHead = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: var(--color-zinc-900);
  /* border: 1px solid; */
  border-color: rgba(255, 255, 255, 0.3);
  border-radius: 7px;
  padding: 16px;
  display: flex;
  justify-content: ${(props) => props.content || 'space-between'};
  align-items: center;
  gap: 8px;
  p {
    font-size: 1rem;
    padding: 8px 16px;
    font-weight: 500;
    width: 100%;
    /* text-align: center; */
  }
`;

const _TitleInput = styled(Input)`
  display: flex;
  width: 100%;
  border: none;
  background-color: #f1f1f100;
  font-size: 1.7rem;
  padding: 0;

  &:hover {
    border: none;
  }

  &:focus {
    border: none;
  }
`;

const _EditorBox = styled.div`
  display: flex;
  height: calc(100vh - 120px);
  flex-direction: column;
  /* margin: 5vh auto; */
  gap: 12px;
`;
const _EditorDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-zinc-900);
  padding: 24px 40px;
  overflow-y: auto;
  border-radius: 8px;
`;

const _PublcButton = styled.div`
  border: 1px solid var(--color-zinc-600);
  font-size: 0.9rem;
  border-radius: 4px;
  text-align: center;
  padding: 8px 20px;
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
    highlights: darkDefaultTheme.colors!.highlights,
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
      background: 'var(--color-zinc-900)',
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
  top: calc((100vh - 80%) / 2);
  flex-direction: column;
  gap: 30px;
  color: #adadad;

  button {
    background-color: var(--color-primary-600);
    border: none;
    color: white;
    padding: 10px;
    border-radius: 7px;
    &:hover {
      background-color: var(--color-primary-700);
    }
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
