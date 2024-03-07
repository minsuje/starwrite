import { Profile } from '../../shared/Profile';
import { Title } from '../../shared/Title';
import Button from '../../shared/Button';
import { SearchFeat } from '../../features/Search/SearchFeat';

export function Header({ onSearch }) {
  return (
    <div>
      <Title />
      <Button name={'노드뷰'} size={'s'} />
      <Button name={'리스트 뷰'} size={'s'} />
      <SearchFeat onSearch={onSearch} />
      <Profile />
    </div>
  );
}
