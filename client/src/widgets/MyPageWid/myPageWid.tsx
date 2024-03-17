
import ListCategory from '../../features/ListView/ui/ListCategoryEnt';

import {
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from '../ListView/ListViewWidStyle';

import { MyPgaeFeat } from '../../features/Mypage/MypageFeat';

export function MypageWid() {
  return (
    <>
      <_ListViewBox>
        <_CategoryBar>
          <ListCategory sort={'myPage'}></ListCategory>
        </_CategoryBar>
        <_CategoryContent>
          <MyPgaeFeat></MyPgaeFeat>
        </_CategoryContent>
      </_ListViewBox>
    </>
  );
}
