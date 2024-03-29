import { useRef } from 'react';
import styled from 'styled-components';
// 그리드 컨테이너 스타일링
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 설정 */
  gap: 20px; /* 그리드 아이템 간의 간격 설정 */
  width: 90%;
`;

// 그리드 아이템 스타일링
const GridItem = styled.div`
  /* border: 1px solid #ffff;  */
  padding: 20px; /* 안쪽 여백 설정 */
  text-align: center;
`;

const StyledLink = styled.div`
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  /* outline: 1px solid; */
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 125ms cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    border: 1px solid;
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

export function MainPageContent() {
  const fristScrollRef = useRef(null);
  const secondScrollRef = useRef(null);

  // console.log(scrollRef);

  function scrollToFirstRef() {
    if (fristScrollRef.current) {
      fristScrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  function scrollSecondRef() {
    if (secondScrollRef.current) {
      secondScrollRef.current.scrollSecondRef({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <>
      <GridContainer>
        <StyledLink>
          <GridItem>
            AI 백링크 연결 추천
            <p>
              백링크를 통해 지식을 서로 연관지어 보세요 처음이라 어려우시다면
              AI가 도와드립니다
            </p>
            <button onClick={scrollToFirstRef}>고</button>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            내 문서 기반 AI 챗봇
            <p>내가 작성한 문서들과 대화해보세요.</p>
            <button onClick={scrollSecondRef}>너도 고</button>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            노드뷰
            <p>지식이 서로 어떻게 연결되어 있는지 확인해보세요</p>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            에디터
            <p>마크다운을 지원하는 에디터로 손쉽게 글을 작성하세요</p>
          </GridItem>
        </StyledLink>
      </GridContainer>

      <div style={{ height: '100%' }}>
        <div
          style={{
            height: '50%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ' center',
          }}
        >
          <h2>AI 백링크 연결</h2>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </div>
        <div
          style={{
            height: '50%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ' center',
          }}
        >
          <h2>내 문서 기반 AI 챗봇</h2>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </div>
        <div
          style={{
            height: '500%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ' center',
          }}
        >
          <div ref={fristScrollRef}>
            <h2>노드뷰</h2>
          </div>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </div>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: ' center',
          }}
        >
          <h2>에디터</h2>
          <div ref={secondScrollRef}>
            <p>
              백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를
              분석해서 가장 연관있는 데이터를 추천해드립니다
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
