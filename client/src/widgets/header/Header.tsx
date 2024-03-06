import { Search } from '../../shared/Search';
import { Profile } from '../../shared/Profile';
import { Title } from '../../shared/Title';

export function Header() {
  return (
    <>
      <Search />
      <Profile />
      <Title />
    </>
  );
}
