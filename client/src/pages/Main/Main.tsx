import { MainPageD3 } from '../../widgets/MainPageD3/MainPageD3';
import { MainPageContent } from '../../shared/MainPageContent';

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

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></div>
        <MainPageD3></MainPageD3>
      </div>

      {/* 상단 끝 */}

      {/* 주요기능 */}

      <div
        style={{
          height: '50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
        }}
      >
        <h2> 주요기능</h2>

        <MainPageContent></MainPageContent>
      </div>
      {/* 주요기능 끝 */}
    </>
  );
}
