import { Link } from 'react-router-dom';
import { _Title } from '../../shared/CommonStyle';
export function TitleFeat() {
  return (
    <>
      <_Title>
        <Link to="/starwrite/categoryview/:userid_num">StarWrite</Link>
      </_Title>
    </>
  );
}
