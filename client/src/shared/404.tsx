import Lottie from 'lottie-react';
import Page404 from './404Page.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Page404MainDiv = styled.div`
  position: absolute; // 중요: 이제 이 div는 Lottie 배경에 대한 위치 컨텍스트를 제공합니다.

  width: 100vw;
  /* display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; */
  text-align: center;
  top: 220px;

  z-index: 2; // 이 컨텐츠가 Lottie 애니메이션 위에 오도록 z-index 설정
`;

const FullScreenLottie = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1; // 배경으로 사용되므로 z-index를 낮게 설정
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1361d7;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  z-index: 3; // 링크도 확실히 보이도록 높은 z-index 설정
`;

export function Page404Error() {
  return (
    <>
      <FullScreenLottie>
        <Lottie
          animationData={Page404}
          style={{ width: '100%', height: '100%' }}
        />
      </FullScreenLottie>
      <Page404MainDiv>
        <h2>우주의 먼 구석까지 찾아봤지만, 이 페이지는 찾을 수 없네요!</h2>
        <p>걱정 마세요, 홈으로 가는 길은 여기에 있습니다.</p>
        <StyledLink to="/">홈으로</StyledLink>
      </Page404MainDiv>
    </>
  );
}
