import { ProfileShard } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { _SmallButton } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
// import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/CategorySearchFeat/index';
import { Link, useParams } from 'react-router-dom';





export function HeaderWid() {
  const useparam = useParams();

  return (
    <div
      style={{
        border: '1px solid white',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '30px',
        marginTop: '30px',
      }}
    >
      <div>
        <TitleFeat />
      </div>
      <div>
        <_SmallButton bgcolor="#212121">
          <Link to={`/user/starwrite/nodeview/${useparam}/과학`}>노드 뷰</Link>
        </_SmallButton>
        <_SmallButton bgcolor="#212121">
          <Link to="/user/starwrite/listview/main/전체">리스트 뷰</Link>
        </_SmallButton>
      </div>
      <div style={{ display: 'flex' }}>
        <Link to={`/user/starwrite/mypage/:userid_num/`}>
          <ProfileShard />
        </Link>
      </div>
    </div>
  );
}
