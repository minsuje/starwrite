import { Link } from 'react-router-dom';
import { Title } from '../../shared/CommonStyle';
export function TitleFeat() {
  return (
    <>
      <Title>
        <Link to="/categoryview/:userid_num">StarWrite</Link>
      </Title>
    </>
  );
}
