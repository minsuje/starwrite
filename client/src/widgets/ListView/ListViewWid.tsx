import { AddCategory, ListCategory } from '../../features/ListView';
import { Outlet } from 'react-router';
import {
  _AddCategoryButton,
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from './ListViewWidStyle';

import { useState } from 'react';

function ListViewWid() {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  return (
    <_ListViewBox>
      <_CategoryBar>
        <ListCategory></ListCategory>
        <_AddCategoryButton onClick={() => setCategoryModal(true)}>
          추가
        </_AddCategoryButton>
        {categoryModal && (
          <AddCategory
            onclick={() => {
              setCategoryModal(false);
            }}
          ></AddCategory>
        )}
      </_CategoryBar>

      <_CategoryContent>
        <Outlet />
      </_CategoryContent>
    </_ListViewBox>
  );
}

export default ListViewWid;
