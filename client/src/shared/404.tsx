import Lottie from 'lottie-react';
import Page404 from './404Page.json';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // react-router-dom을 사용해 홈으로의 링크 구현

// 스타일드 컴포넌트
const Page404MainDiv = styled.div`
  height: 100vh; // 뷰포트 높이를 100%로 설정하여 전체 화면을 채움

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center; // 텍스트 중앙 정렬
`;

const StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #1361d7;
  color: white;
  text-decoration: none;
  border-radius: 5px;
`;

export function Page404Error() {
  return (
    <Page404MainDiv>
      <Lottie animationData={Page404} style={{ width: 300, height: 300 }} />
      <h2>우주의 먼 구석까지 찾아봤지만, 이 페이지는 찾을 수 없네요!</h2>
      <p>걱정 마세요, 홈으로 가는 길은 여기에 있습니다.</p>
      <StyledLink to="/">홈으로</StyledLink>
    </Page404MainDiv>
  );
}
