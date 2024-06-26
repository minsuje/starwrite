import styled, { keyframes } from 'styled-components';

const shine = keyframes`
  0% { background-position: 0px 0 }
  100% { background-position: 468px 0 }
`;

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
      color: var(--color-primary-500);
    }
  }
`;

const _CategoryNameInput = styled.input`
  position: absolute;
  /* left: 35%; */
  z-index: 100;
`;

export const _listBox = styled.div`
  overflow: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const _postBox = styled.div`
  padding: 20px 20px;
  background-color: var(--color-zinc-800);
  border-radius: 6px;
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
    line-height: 1.5;
    font-size: 14px;
    color: var(--color-zinc-400);
  }
  &:hover {
    opacity: 0.8;
  }
`;

export const _SkeletonPostBox = styled.div`
  ${_postBox};
  border-radius: 6px;
  animation-duration: 1.6s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: ${shine};
  animation-timing-function: linear;
  background: var(--color-zinc-800);
  background: linear-gradient(
    to right,
    #27272ad7 0%,
    #333336 50%,
    #27272ad7 100%
  );
  background-size: 800px 104px;
  height: 120px;
`;

// style 정의
export const _Box = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  color: #adadad;
  input {
    background-color: #3b3d41;
    border: none;
    padding: 12px;
    border-radius: 4px;
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
  gap: 8px;
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
  padding-top: 20px;
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
  display: flex;
  width: 100%;
  padding: 16px 0 16px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  div {
    display: flex;
    gap: 12px;
  }
  textarea {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    border: none;
    border-radius: 4px;
    background-color: var(--color-zinc-800);
    color: white;
    resize: none;
  }
  button {
    display: flex;
    background-color: var(--color-primary-500);
    justify-content: center;
    align-items: center;
    color: white;
    padding: 20px;
    border: none;
    border-radius: 2px;
  }
  h1 {
    font-size: 1.5rem;
  }
`;

// 리스트에 글 없을 때
export const _NoneList = styled.div`
  width: 100%;
  text-align: center;
  padding-top: 100px;
`;

export { _headBox, _buttonBox, _CategoryNameInput };
