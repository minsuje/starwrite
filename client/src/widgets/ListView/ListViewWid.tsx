import { AddCategory, ListCategory } from '../../features/ListView';
import { Outlet, useParams } from 'react-router';
import {
  _AddCategoryButton,
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from './ListViewWidStyle';

import { useState } from 'react';

function ListViewWid() {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const { category, nickname, postId } = useParams();

  console.log('widget에서 찍어본 params : ', category, nickname, postId);

  return (
    <_ListViewBox>
      <_CategoryBar>
        <ListCategory category={category} nickname={nickname}></ListCategory>
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
