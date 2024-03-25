import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
import { ProfileShard } from '../../shared/Profile';
import { _StyledLink } from '../../shared/CommonStyle';
import { GlobalSearch } from '../../features/InterGratedSearchIconFeat/GlobalSearch';
// import { InterGratedSearchIconFeat } from '../../features/InterGratedSearchIconFeat/InterGratedSearchIconFeat';

const _StyledHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between; // 컨테이너의 내용을 양 끝과 중앙으로 분배
  align-items: center;
  /* background-color: #f8f8f8; */
  padding: 10px 50px;
  margin-bottom: 50px;
  border-bottom: 2px solid #a29e9e;
`;

const _StyledNavigation = styled.div`
  display: flex;
  justify-content: center; // 네비게이션 요소를 중앙에 위치
  align-items: center;
  gap: 15px;
  padding-right: 0px;
`;

const _StyledButton = styled.button`
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  background-color: #18181b;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    background-color: #333;
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

  function handleNodeViewPage() {
    if (category === 'all') {
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
    } else if (nickname) {
      navigate(`/user/starwrite/listview/main/${nickname}/all`);
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
            <_StyledButton onClick={handleNodeViewPage}>노드 뷰</_StyledButton>
            <_StyledButton onClick={handleNodeViewListPage}>
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
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <GlobalSearch />
            <_StyledLink to={`/user/starwrite/mypage/${myNickname}/`}>
              <ProfileShard />
            </_StyledLink>
          </div>
        </>
      ) : (
        <_StyledLink to={`/login`}>LOGIN</_StyledLink>
      )}
    </_StyledHeaderContainer>
  );
}
