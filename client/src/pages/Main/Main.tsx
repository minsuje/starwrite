import { MainPageD3 } from '../../widgets/MainPageD3/MainPageD3';
import { MainPageContent } from '../../shared/MainPageContent';
import {
  _styledMainPageTitle,
  _styledMainPageFirstContentTitle,
} from '../../features/MainPageFeat/ui/MainPageTitle';

export function MainPage() {
  return (
    <>
      {/* 상단 */}
      <_styledMainPageTitle>
        <div>
          <h1>당신의 모든 것을 공유하고 기록하세요</h1>
          <p style={{ color: 'gray', paddingTop: '5px' }}>
            - 당신의 세컨 브레인을 그려보세요
          </p>

          <button>
            <a href="/user/starwrite/writenewpost" style={{ color: 'black' }}>
              내 그래프 뷰 만들기
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
        <h1> 주요기능</h1>
        <MainPageContent></MainPageContent>
      </_styledMainPageFirstContentTitle>

      {/* 주요기능 끝 */}
    </>
  );
}
