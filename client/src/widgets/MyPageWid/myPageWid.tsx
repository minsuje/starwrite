import ListCategory from '../../features/ListView/ui/ListCategoryEnt';
import { ProfileShard } from '../../shared/Profile';
import { Label } from '../../shared/CommonStyle';
import {
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from '../ListView/ListViewWidStyle';
import { RegisteringUser } from '../../features/Register/RegisterForm';
import { _RegisterBox } from '../../features/Register/RegisterForm';

export function MypageWid() {
  return (
    <>
      <_ListViewBox>
        <_CategoryBar>
          <ListCategory></ListCategory>
        </_CategoryBar>
        <_CategoryContent>
          <Label>프로필 사진</Label>
          <ProfileShard />
          <Label>프로필 사진</Label>
        </_CategoryContent>
      </_ListViewBox>
    </>
  );
}
