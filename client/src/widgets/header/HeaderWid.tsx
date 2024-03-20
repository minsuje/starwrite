import { ProfileShard } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { _StyledLinkDiv } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
// import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { _StyledLink } from '../../shared/CommonStyle';
import { useState, useEffect, userLocation } from 'react';
import { useLocation } from 'react-router-dom';

export function HeaderWid() {
  const location = useLocation();
  console.log(location.pathname); // 현재 경로
  console.log(location.search); // URL의 쿼리 스트링
  console.log(location.hash); // URL의 해시 (예: #something)

  const { nickname, category } = useParams();
  const useParam = useParams();
  console.log('header param', nickname, category);
  console.log('header param', useParam);

  const navigate = useNavigate();
  const myNickname = localStorage.getItem('nickname');

  // const [nodeViewPage, setNodeViewPage] = useState();

  // if (nickname && category) {
  //   const NodeView = `nodeview/${nickname}/${category}`;
  //   setNodeViewPage(NodeView);
  // }

  function handleNodeViewPage() {
    if (nickname && category) {
      navigate(`/user/starwrite/nodeview/${nickname}/${category}`);
    } else if (category === '전체') {
      navigate(`/user/starwrite/categoryview/${nickname}`);
    } else {
      navigate(`/user/starwrite/categoryview/${myNickname}`);
    }
  }

  function handleNodeViewListPage() {
    if (category) {
      navigate(`/user/starwrite/listview/main/${nickname}/${category}`);
    } else if (nickname) {
      navigate(`/user/starwrite/listview/main/${nickname}/전체`);
    } else {
      navigate(`/user/starwrite/listview/main/${myNickname}/전체`);
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '50px',
        paddingBottom: '13px',
        marginTop: '20px',
        borderBottom: '1px solid #383737',
      }}
    >
      <div>
        <TitleFeat />
      </div>
      <div>
        <_StyledLinkDiv>
          {/* <_StyledLink to={`${nodeViewPage}`}>노드 뷰</_StyledLink> */}
          {location.pathname === '/' ? null : (
            <button onClick={handleNodeViewPage}>노드뷰</button>
          )}
          {location.pathname === '/' ? null : (
            <button onClick={handleNodeViewListPage}>리스트뷰</button>
          )}
        </_StyledLinkDiv>
      </div>
      <div style={{ display: 'flex' }}>
        {myNickname ? (
          <Link to={`/user/starwrite/mypage/nickname/`}>
            <ProfileShard />
          </Link>
        ) : (
          <Link to={`/login`}>
            <div>LOGIN</div>
          </Link>
        )}
      </div>
    </div>
  );
}
