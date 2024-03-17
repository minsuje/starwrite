import { MypageWid } from '../../widgets/MyPageWid/myPageWid';
import { styled } from 'styled-components';

const _MypageViewPage = styled.div`
  margin-top: 5%;
`;
export function MyPage() {
  return (
    <div>
      <_MypageViewPage>
        <MypageWid></MypageWid>
      </_MypageViewPage>
    </div>
  );
}
