import styled from 'styled-components';
import { Input } from '../../../shared/CommonStyle';
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
  background-color: #202020;
  padding: 2% 5%;
  display: flex;
  justify-content: ${(props) => props.content || 'space-between'};
  align-items: center;
  gap: 15px;
  p {
    font-size: 15px;
    width: 50%;
    text-align: center;
  }
`;

const _TitleInput = styled(Input)`
  background-color: #202020;
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
  background-color: 'var(--color-zinc-800)';
  padding: 25px 0;
  overflow-y: auto;
`;

const _PublcButton = styled.div<{ color: boolean }>`
  border: 1px solid var(--color-zinc-600);
  border-radius: 4px;
  width: 50%;
  text-align: center;
  padding: 4px 0;
  background-color: ${(props) => props.color && ' var(--color-zinc-600)'};
`;

export {
  _TitleInput,
  _EditorHead,
  ListCategories,
  OneCategory,
  _EditorBox,
  _EditorDiv,
  _PublcButton,
};
