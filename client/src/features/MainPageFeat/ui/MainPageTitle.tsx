import styled from 'styled-components';

// 페이지 상단 디자인
export const _styledMainPageTitle = styled.div`
  height: 100%;
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 페이지 첫번째 주요기능 컨텐츠
export const _styledMainPageFirstContentTitle = styled.div`
  margin-top: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

// 첫번째 주요기능 목록
export const _styledMainPageFirstContent = styled.div`
  display: gird;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 설정 */
  gap: 20px;
  width: 90%;
  height: 100%;
  padding: 30px;
`;

export const _GridItem = styled.div`
  padding: 50px;
  text-align: center;
`;
export function MainPageTitle() {
  return <></>;
}
