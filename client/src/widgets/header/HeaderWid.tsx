import { Profile } from '../../shared/Profile';
// import { Title } from '../../shared/Title';
import { SmallButton } from '../../shared/CommonStyle';
// import { SearchFeat } from '../../features/index';
import { SearchTypes } from '../../pages/NodeView/index';
import { TitleFeat } from '../../features/index';

interface HeaderProps {
  onSearch: SearchTypes['onSearch'];
}

export function Header({}: HeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <div>
        <TitleFeat />
      </div>
      <div>
        <SmallButton bgcolor="#212121">카테고리뷰</SmallButton>
        <SmallButton bgcolor="#212121">노드 뷰</SmallButton>
      </div>
      <div style={{ display: 'flex' }}>
        <Profile />
      </div>
    </div>
  );
}
