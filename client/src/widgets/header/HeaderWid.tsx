import { Profile } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { _SmallButton } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
// import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/index';

export function HeaderWid() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: '50px',
      }}
    >
      <div>
        <TitleFeat />
      </div>
      <div>
        <_SmallButton bgcolor="#212121">리스트 뷰</_SmallButton>
        <_SmallButton bgcolor="#212121">노드 뷰</_SmallButton>
      </div>
      <div style={{ display: 'flex' }}>
        <Profile />
      </div>
    </div>
  );
}
