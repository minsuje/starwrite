import styled from 'styled-components';

// 그리드 컨테이너 스타일링
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 설정 */
  gap: 10px; /* 그리드 아이템 간의 간격 설정 */
  width: 100%;
`;

// 그리드 아이템 스타일링
const GridItem = styled.div`
  border: 1px solid #000; /* 테두리 설정 */
  padding: 20px; /* 안쪽 여백 설정 */
  text-align: center; /* 텍스트 가운데 정렬 */
`;

export function MainPage() {
  return (
    <>
      {/* 상단 */}
      <div
        style={{
          height: '100%',
          marginTop: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div>
          <h2>당신의 모든 것을 공유하고 기록하세요</h2>
          <p style={{}}>당신의 세컨 브레인을 그려보세요</p>
        </div>

        <div style={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
          <img src="/MainPage2.png" alt="" />
        </div>
      </div>
      {/* 상단 끝 */}

      {/* 주요기능 */}

      <div style={{ height: '100%', textAlign: 'center' }}>
        <h2> 주요기능</h2>

        <GridContainer>
          <GridItem>
            AI 백링크 연결 추천
            <p>
              백링크를 통해 지식을 서로 연관지어 보세요 처음이라 어려우시다면
              AI가 도와드립니다
            </p>
          </GridItem>
          <GridItem>
            내 문서 기반 AI 챗봇
            <p>내가 작성한 문서들과 대화해보세요.</p>
          </GridItem>
          <GridItem>
            노드뷰
            <p>지식이 서로 어떻게 연결되어 있는지 확인해보세요</p>
          </GridItem>
          <GridItem>
            에디터
            <p>마크다운을 지원하는 에디터로 손쉽게 글을 작성하세요</p>
          </GridItem>
        </GridContainer>
      </div>
      {/* 주요기능 끝 */}

      <div style={{ height: '100%' }}>
        <h2>AI 백링크 연결</h2>
        <p>
          백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
          가장 연관있는 데이터를 추천해드립니다
        </p>
      </div>
      <div style={{ height: '100%' }}>
        <h2>내 문서 기반 AI 챗봇</h2>
        <p>
          백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
          가장 연관있는 데이터를 추천해드립니다
        </p>
      </div>
      <div style={{ height: '100%' }}>
        <h2>노드뷰</h2>
        <p>
          백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
          가장 연관있는 데이터를 추천해드립니다
        </p>
      </div>
      <div style={{ height: '100%' }}>
        <h2>에디터</h2>
        <p>
          백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
          가장 연관있는 데이터를 추천해드립니다
        </p>
      </div>
    </>
  );
}
