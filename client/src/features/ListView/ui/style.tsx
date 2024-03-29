import styled from 'styled-components';

const _headBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px 40px 10px;
  align-items: end;

  div > h1 {
    color: var(--color-zinc-100);
    border: none;
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0%;
  }
`;

const _buttonBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;

  button {
    background: none;
    border: none;
    color: white;
    box-shadow: none;
    font-size: 15px;

    &:hover {
      cursor: pointer;
    }
  }
`;

const _CategoryNameInput = styled.input`
  position: absolute;
  left: 35%;
  z-index: 100;
`;

export const _listBox = styled.div`
  overflow: auto;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const _postBox = styled.div`
  padding: 25px 20px;
  background-color: var(--color-zinc-800);
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

// style 정의
export const _Box = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #adadad;
  input {
    background-color: #3b3d41;
    border: none;
    padding: 10px;
  }
  label {
    font-size: 20px;
  }
`;

export const _ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 10px;
  padding-top: 0px;
`;

export const _ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 9px;
`;

export const _Button = styled.button`
  flex-grow: 1;
  padding: 8px 0;
  color: white;
  border: none;
  border-radius: 4px;
  min-width: 40px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  background-color: ${(props) => props.color || '#1361D7'};
`;
export const _Title = styled.h1`
  font-size: 2rem;
  padding-top: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 90%;

  p {
    background-color: var(--color-zinc-100);
    color: var(--color-zinc-900);
    font-size: 0.9rem;
    padding: 0.5rem;
    border-radius: 5px;
    width: fit-content;
  }
`;

// 댓글 생성
// 댓글 입력창

export const _NewCommentBox = styled.div`
  width: 90%;
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  textarea {
    width: 100%;
    height: 5rem;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    background-color: var(--color-zinc-800);
    color: white;
    resize: none;
  }
  button {
    width: 100%;
    background-color: var(--color-primary-500);
    color: white;
    padding: 7px;
    border: none;
    border-radius: 2px;
  }
  h1 {
    font-size: 1.5rem;
  }
`;

export { _headBox, _buttonBox, _CategoryNameInput };
