import styled from 'styled-components';
import { Spinner } from '../../shared/spinner';
const _StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// 제목
const _StyledHeading = styled.h1`
  text-align: center;
  font-size: 50px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 1px;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
`;

// 부제목
const _StyledSpan = styled.span`
  margin-top: 5px;
  font-size: 15px;
  color: #fff;
  word-spacing: 1px;
  font-weight: normal;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: 'Raleway', sans-serif;
  font-weight: 500;

  display: grid;
  grid-template-columns: 1fr max-content 1fr;
  grid-template-rows: 27px 0;
  grid-gap: 20px;
  align-items: center;

  &:after,
  &:before {
    content: ' ';
    display: block;
    border-bottom: 1px solid #ccc; // 여기 #ㅎ이 올바른 색상 코드가 아니므로 #ddd로 변경했습니다.
    border-top: 1px solid #ccc;
    height: 5px;
    background-color: #f8f8f8;
  }
`;

// 내용
const _styledContent = styled.p`
  text-align: center;
  padding: 30px;
`;

const _styledDiv = styled.div`
  width: 50%;
  height: 50%;
`;

export function MainPage() {
  return (
    <>
      {/* <_MainPageTitle>StarWirte</_MainPageTitle>
      <_MainPageTitle>별이 가득한 데이터를 수집하세요</_MainPageTitle>
      <_MainPageContent>
        "별이 촘촘한 밤하늘처럼, 당신만의 지식 우주를 넓혀가세요."
      </_MainPageContent> */}

      <_StyledContainer>
        <_StyledHeading>
          STARWRITE
          <_StyledSpan>별 과 데이터</_StyledSpan>
        </_StyledHeading>
        <_styledContent>
          "밤 하늘 촘촘한 별처럼, 당신만의 지식 데이터를 넓혀가세요."
        </_styledContent>
        <_styledDiv>
          <Spinner></Spinner>
        </_styledDiv>
      </_StyledContainer>
    </>
  );
}
