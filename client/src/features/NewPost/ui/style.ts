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
  }
`;

const _TitleInput = styled(Input)`
  background-color: #202020;
  font-size: 20px;
`;

export { _TitleInput, _EditorHead, ListCategories, OneCategory };
