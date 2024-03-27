import styled from 'styled-components';
import { Spinner } from '../../shared/spinner';

const _StyledContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 10px;
  margin: 0px 7.5%;
  padding-bottom: 100px;
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
  width: 100%;
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
  /* padding: 3%; */
`;

const _MainImage = styled.img`
  width: 100%;
  height: 100%;
`;

const _styledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; // 가로 축 중앙 정렬
  text-align: center;
  width: 100%; //
`;

export function MainPage() {
  return (
    <_StyledContainer>
      {/* <_MainPageTitle>StarWirte</_MainPageTitle>
      <_MainPageTitle>별이 가득한 데이터를 수집하세요</_MainPageTitle>
      <_MainPageContent>
        "별이 촘촘한 밤하늘처럼, 당신만의 지식 우주를 넓혀가세요."
      </_MainPageContent> */}
      <_styledDiv>
        <_StyledHeading>
          STARWRITE
          <_StyledSpan>별 과 데이터</_StyledSpan>
        </_StyledHeading>
      </_styledDiv>

      <_styledDiv>
        <_styledContent>
          "밤 하늘 촘촘한 별처럼, 당신만의 지식 데이터를 넓혀가세요."
        </_styledContent>
        <_MainImage src="./MainPage2.png" alt="" />
      </_styledDiv>

      {/* <_styledDiv></_styledDiv> */}
      <div>
        <div style={{ display: 'flex', border: '1px solid #ffff' }}>
          {/* 노션 보고 디자인 */}
          <div style={{ padding: '30px', border: '1px solid #ffff' }}>
            AI
            <p>"AI 기능이 뭐였더라.."</p>
          </div>

          <div style={{ padding: '30px', border: '1px solid #ffff' }}>
            BACKLINK
            <p>
              "복잡한 데이터들을 백링크을 통하여 당신만의 별자리를 만들어 보십쇼
              ㅡㅡ"
            </p>
          </div>

          {/* 공개 비공개 설명 */}
          <div style={{ padding: '30px', border: '1px solid #ffff' }}>
            SCRAB
            <p>"스크랩 기능을 통한 다양한 사람과 데이터를 주고받으셈"</p>
          </div>

          <div style={{ padding: '30px', border: '1px solid #ffff' }}>
            망각곡선
            <p>"머리나쁜 당신들을 위해 만들었습니다 맹각곡선 !"</p>
          </div>
        </div>
      </div>

      {/* 이미지로 클릭할 거임 */}
      <div
        style={{
          marginTop: '50px',
          padding: '300px',
          border: '1px solid #ffff',
        }}
      >
        AI 클릭시 AI 이미지 보여주기 BACKLINK 클릭하면 BACKLINK 이미지 보여주기
        SCRAB 클릭하면 SCRAB 이미지 보여주기 망각곡선의 이미지들 설명해주기
      </div>

      <h1>강력한 우리의 기능들을 소개해주겠다 ~!</h1>

      <div>
        <div>
          Ai !!!!!!!!
          <p>Ai를 사용하여 당신의 부족한점을 채워보세요 ~샬라샬라~</p>
        </div>

        <div>
          BACKLINK !!!!!!!!
          <p>BACKLINK를 사용하여 당신의 부족한점을 채워보세요 ~샬라샬라~</p>
        </div>

        <div>
          SCRAB !!!!!!!!!
          <p>SCRAB 사용하여 당신의 부족한점을 채워보세요 ~샬라샬라~</p>
        </div>

        <div>
          망각곡선 !!!!!!!!!
          <p>망각곡선을 사용하여 당신의 부족한점을 채워보세요 ~샬라샬라~</p>
        </div>
      </div>
      <button>STARWRITE 시작하기</button>
    </_StyledContainer>
  );
}
