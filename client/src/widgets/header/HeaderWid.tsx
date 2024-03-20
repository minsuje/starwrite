import { ProfileShard } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { _StyledLinkDiv } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
// import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { _StyledLink } from '../../shared/CommonStyle';
import { useState, useEffect } from 'react';

export function HeaderWid() {
  const { nickname, category } = useParams();
  const useParam = useParams();
  console.log('header param', nickname, category);
  console.log('header param', useParam);

  const navigate = useNavigate();

  // const [nodeViewPage, setNodeViewPage] = useState();

  // if (nickname && category) {
  //   const NodeView = `nodeview/${nickname}/${category}`;
  //   setNodeViewPage(NodeView);
  // }

  function handleNodeViewPage() {
    if (nickname && category && category !== '전체') {
      navigate(`nodeview/${nickname}/${category}`);
    } else if (category === '전체') {
      navigate(`categoryview/${nickname}`);
    }
  }

  function handleNodeViewListPage() {
    if (category) {
      navigate(`listview/main/${nickname}/${category}`);
    } else if (nickname) {
      navigate(`listview/main/${nickname}/전체`);
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
          <button onClick={handleNodeViewPage}>노드뷰</button>
          <button onClick={handleNodeViewListPage}>리스트뷰</button>
          {/* <_StyledLink to="/user/starwrite/listview/main/전체">
            리스트 뷰
          </_StyledLink> */}
        </_StyledLinkDiv>
      </div>
      <div style={{ display: 'flex' }}>
        <Link to={`/user/starwrite/mypage/nickname/`}>
          <ProfileShard />
        </Link>
      </div>
    </div>
  );
}
