import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
// import { ProfileShard } from '../../shared/Profile';
import { _StyledLink, _StyledLinkOut } from '../../shared/CommonStyle';
import { GlobalSearch } from '../../features/InterGratedSearchIconFeat/GlobalSearch';
// import { InterGratedSearchIconFeat } from '../../features/InterGratedSearchIconFeat/InterGratedSearchIconFeat';

interface StyledButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}

const _StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; // 컨테이너의 내용을 양 끝과 중앙으로 분배
  align-items: center;
  /* background-color: #f8f8f8; */
  width: 100%;
  top: 0;

  padding: 4px 32px;
  /* margin-bottom: 50px; */
  position: fixed;
  /* border-bottom: 1px solid #2d2d2d; */
  /* background-color: var(--color-zinc-900); */
  z-index: 9999;
`;

const _StyledNavigation = styled.div`
  display: flex;
  justify-content: center; // 네비게이션 요소를 중앙에 위치
  align-items: center;
  gap: 8px;
  padding: 8px;
  background-color: #0000002e;
  border-radius: 16px;
`;

const _StyledButton = styled.button<StyledButtonProps>`
  padding: 12px 20px;
  border-radius: 8px;
  border: none;
  background-color: ${(props) =>
    props.isActive ? '#76767632' : 'transparent'};
  color: ${(props) => (props.isActive ? '#f3f3f3' : '#a0a0a0')};
  font-weight: bold;
  transition: all 0.3s ease;
  -webkit-app-region: no-drag;
  cursor: pointer;

  &:hover {
    background-color: #76767632;
    transition: all 0.3s ease;
  }
`;

// const _StyledLink = styled(Link)`
//   padding: 0 30px;
//   color: #61dafb;
//   text-decoration: none;
//   &:hover {
//     text-decoration: underline;
//   }
// `;

export function HeaderWid() {
  const location = useLocation();
  const { nickname, category } = useParams();
  const navigate = useNavigate();
  const myNickname = localStorage.getItem('nickname');

  // 현재 경로가 '/user/starwrite/categoryview' 인지 확인
  const isCategoryView = location.pathname.startsWith(
    '/user/starwrite/categoryview',
  );

  // 현재 경로가 '/user/starwrite/listview/main/' 인지 확인
  const isListViewMain = location.pathname.startsWith(
    '/user/starwrite/listview/main/',
  );

  function handleNodeViewPage() {
    if (category === 'all' || category === 'scrab') {
      navigate(`/user/starwrite/categoryview/${nickname}`);
    } else if (category && nickname) {
      navigate(`/user/starwrite/nodeview/${nickname}/${category}`);
    } else {
      navigate(`/user/starwrite/categoryview/${myNickname}`);
    }
  }

  function handleNodeViewListPage() {
    if (category) {
      navigate(`/user/starwrite/listview/main/${nickname}/${category}`);
    }
    // 기존코드
    // else if (nickname) {
    //   navigate(`/user/starwrite/listview/main/${nickname}/all`);
    // }
    else if (nickname) {
      navigate(`/user/starwrite/listview/main/${myNickname}/all`);
    } else {
      navigate(`/user/starwrite/listview/main/${myNickname}/all`);
    }
  }

  return (
    <_StyledHeaderContainer>
      <TitleFeat />
      <_StyledNavigation>
        {/* 중앙 정렬 */}
        {location.pathname !== '/' && (
          <>
            <_StyledButton
              onClick={handleNodeViewPage}
              isActive={isCategoryView}
            >
              노드 뷰
            </_StyledButton>
            <_StyledButton
              onClick={handleNodeViewListPage}
              isActive={isListViewMain}
            >
              리스트뷰
            </_StyledButton>
          </>
        )}
        {myNickname && location.pathname === '/' && (
          <_StyledLink to={`user/starwrite/categoryview/${myNickname}`}>
            {myNickname}의 카테고리 돌아가기
          </_StyledLink>
        )}
      </_StyledNavigation>
      {myNickname ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <GlobalSearch />
            <_StyledLink to={`/user/starwrite/mypage/${myNickname}/`}>
              {/* <ProfileShard /> */}
              {myNickname} 님
            </_StyledLink>
          </div>
        </>
      ) : (
        <_StyledLinkOut to={`/login`}>LOGIN</_StyledLinkOut>
      )}
    </_StyledHeaderContainer>
  );
}
