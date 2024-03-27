import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ButtonProps {
  bgcolor?: string; // bgColor 속성 추가
}

export const _PageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;

export const _StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
`;

// 중복 검사버튼
export const _registerbtn = styled.button<ButtonProps>`
  width: 40%;
  height: 22px;
  /* margin-top:px; */
  color: white;
  text-align: center;
  border: none;
  background-color: ${(props) => props.bgcolor || 'blue'};
  &:hover {
    background-color: #0353cb;
  }
  &:disabled {
    background-color: gray;
  }
`;

// 버튼 스타일
export const _SmallButton = styled.button<ButtonProps>`
  width: 100px;
  height: 40px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

export const MediumButton = styled.button<ButtonProps>`
  width: 200px;
  height: 40px;
  background-color: ${(props) => props.bgcolor || 'blue'};
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
  width: 100%;
  max-width: 300px;
  background-color: #616161;
  border: none;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 3px;
  display: flex;

  /* flex-direction: row; */
`;

// label 스타일
export const Label = styled.label`
  display: flex;
  /* flex-direction: column; */
  color: #c0c0c0;
  padding: 10px 0px;
  width: 100%;
`;

// input + label 박스 스타일
export const InputBox = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  gap: 2px;
  margin-bottom: 0px;
`;

// 메인 뷰 Title
export const _Title = styled.div`
  display: flex;
  color: red;
`;

// emoji
export const _emoji = styled.span`
  margin-left: 5px;
  font-size: 13px;
`;

// 스타일 지정
export const _RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

export const _ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 12px;
  padding-top: 2px;
`;
export const _SuccessMsg = styled.p`
  color: #73ec75;
  font-size: 12px;
  padding-top: 2px;
`;

// // 메인 뷰 Profile
// export const _Profile = styled.div`
//   width: 50px;
//   color: red;
//   border-radius: 50%;
// `;

export const _Background = styled.div`
  position: absolute;
  width: 450px;
  height: 450px;
  top: 29%;
  left: 50%;
  transform: translate(-50%);
`;

// react-router Link 디자인
export const _StyledLink = styled(Link)`
  display: block;
  padding: 0px 15px;
  /* background-color: #212121; */
  color: #ffffff;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #333;
  }
`;
