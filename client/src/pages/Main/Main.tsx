import { MainPageD3 } from '../../widgets/MainPageD3/MainPageD3';
import { MainPageContent } from '../../shared/MainPageContent';
import {
  _styledMainPageTitle,
  _styledMainPageFirstContentTitle,
} from '../../features/MainPageFeat/ui/MainPageTitle';
import styled from 'styled-components';

const _MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export function MainPage() {
  return (
    <>
      <_MainContainer>
        {/* 상단 */}
        <_styledMainPageTitle>
          <div>
            <h1>당신의 모든 것을 공유하고 기록하세요</h1>
            <p style={{ color: 'gray', paddingTop: '5px' }}>
              당신의 세컨 브레인을 만들어보세요
            </p>
            <button style={{ margin: '30px 0px' }}>
              <a href="/login" style={{ color: 'black' }}>
                시작하기
              </a>
            </button>
          </div>
          <div>
            <MainPageD3></MainPageD3>
          </div>
        </_styledMainPageTitle>
        {/* 상단 끝 */}
        {/* 주요기능 */}
        <_styledMainPageFirstContentTitle>
          <h1 style={{ marginTop: '300px' }}> STARWRITE 주요 기능</h1>
          <MainPageContent></MainPageContent>
        </_styledMainPageFirstContentTitle>
        {/* 주요기능 끝 */}
      </_MainContainer>
    </>
  );
}
