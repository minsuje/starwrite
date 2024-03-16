import { MypageWid } from '../../widgets/MyPageWid/myPageWid';
import { styled } from 'styled-components';

export function MyPage() {
  const _MypageViewPage = styled.div`
    margin-top: 5%;
  `;
  return (
    <div>
      <_MypageViewPage>
        <MypageWid></MypageWid>
      </_MypageViewPage>
    </div>
  );
}
