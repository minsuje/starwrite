import styled from 'styled-components';
import { ListCategory } from '../../entities/ListView';
// import ListViewContentWid from './ListViewContentWid';
import { Outlet } from 'react-router';

import { OneCategory } from '../../entities/ListView/ui/style';

//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  height: 100vh;
`;

const _CategoryBar = styled.div`
  width: 30%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const _CategoryContent = styled.div`
  width: 100%;
  background-color: #1f1f1f;
  height: 85vh;
`;

const _AddCategoryButton = styled(OneCategory)`
  background-color: #3c3c3cb9;
`;

function ListViewWid({ content }: { content: string }) {
  if (content === 'main') {
    return (
      <_ListViewBox>
        <_CategoryBar>
          <ListCategory></ListCategory>
          <_AddCategoryButton>추가</_AddCategoryButton>
        </_CategoryBar>

        <_CategoryContent>
          {/* <ListViewContentWid selected={selected} /> */}
          <Outlet />
        </_CategoryContent>
      </_ListViewBox>
    );
  }
}

export default ListViewWid;
