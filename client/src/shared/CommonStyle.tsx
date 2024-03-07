import styled from 'styled-components';

// 버튼 스타일
export const SmallButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

export const MediumButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

export const LargeButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;
// input 스타일
export const Input = styled.input`
  height: 30px;
  width: 300px;
  background-color: #616161;
  border: none;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 3px;
`;

// label 스타일
export const Label = styled.label`
  color: #c0c0c0;
  padding-bottom: 5px;
`;

// input + label 박스 스타일
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;
