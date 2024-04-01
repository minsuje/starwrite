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
  border-radius: 4px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;
  cursor: pointer;
  &:hover {
    background-color: #0353cb;
    transition: all 0.3s ease;
  }
  &:disabled {
    background-color: gray;
  }
`;

// 버튼 스타일
export const _SmallButton = styled.button<ButtonProps>`
  width: 100px;
  padding: 14px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;
  cursor: pointer;
  &:hover {
    background-color: #0353cb;
    transition: all 0.3s ease;
  }
`;

export const MediumButton = styled.button<ButtonProps>`
  width: 200px;
  padding: 14px;
  background-color: ${(props) => props.bgcolor || 'blue'};
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;
  cursor: pointer;
  &:hover {
    background-color: #0353cb;
    transition: all 0.3s ease;
  }
`;

export const LargeButton = styled.button`
  width: 300px;
  padding: 14px;
  background-color: #1361d7;
  color: white;
  border: none;
  border-radius: 4px;
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;
  cursor: pointer;
  &:hover {
    background-color: #0353cb;
    transition: all 0.3s ease;
  }
`;
// input 스타일
export const Input = styled.input`
  padding: 12px;
  box-sizing: border-box;
  width: 100%;
  /* max-width: 300px; */
  background-color: #1a1b1e;
  border: 1px solid #313339;
  color: #e3e4e8;
  -webkit-app-region: no-drag;
  outline-offset: -1px;
  font-size: 15px;
  line-height: 1.5;
  display: flex;
  border-radius: 6px;
  transition: all 0.3s ease;
  &:hover {
    border: 1px solid #3f4452;
    transition: all 0.3s ease;
  }
  &:focus {
    border: 1px solid #0353cb;
    transition: all 0.3s ease;
  }

  /* flex-direction: row; */
`;

// label 스타일
export const Label = styled.label`
  display: flex;
  /* flex-direction: column; */
  color: #e3e4e8;
  padding: 10px 0px;
  width: 100%;
  gap: 4px;
`;

// input + label 박스 스타일
export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputLabelBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
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
  padding: 8px 0px;
  /* background-color: #212121; */
  color: #f4f4f4;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;

  &:hover {
    color: #c4c4c4;
    transition: all 0.3s ease;
  }
`;

export const _StyledLinkOut = styled(Link)`
  display: block;
  padding: 13px 100px;
  /* background-color: #212121; */
  color: #ffffff;
  text-decoration: none;
  text-align: center;

  &:hover {
    background-color: #333;
  }
`;
