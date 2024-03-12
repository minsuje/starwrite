import styled from 'styled-components';
import { ListCategory } from '../../features/ListView';
// import ListViewContentWid from './ListViewContentWid';
import { Outlet } from 'react-router';

//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  height: 85vh;
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
  padding: 20px 30px;
`;

const _AddCategoryButton = styled.div`
  width: 80%;
  text-align: center;
  padding: 15px 0px;

  &:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }
  background-color: #3c3c3cb9;
  margin: 0;
`;

function ListViewWid() {
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

export default ListViewWid;
