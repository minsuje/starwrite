import { ProfileShard } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { _StyledLinkDiv } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
// import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
import { Link, useParams } from 'react-router-dom';
import { _StyledLink } from '../../shared/CommonStyle';

export function HeaderWid() {
  const useparam = useParams();

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
          <_StyledLink to={`/user/starwrite/nodeview/${useparam}/과학`}>
            노드 뷰
          </_StyledLink>

          <_StyledLink to="/user/starwrite/listview/main/전체">
            리스트 뷰
          </_StyledLink>
        </_StyledLinkDiv>
      </div>
      <div style={{ display: 'flex' }}>
        <Link to={`/user/starwrite/mypage/:userid_num/`}>
          <ProfileShard />
        </Link>
      </div>
    </div>
  );
}
