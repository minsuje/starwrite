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
  const [updateCategory, setUpdateCategory] = useState<boolean>(true);
  const { category, nickname } = useParams();

  return (
    <_ListViewBox>
      <_CategoryBar>
        <ListCategory
          updateCategory={updateCategory}
          category={category}
          nickname={nickname}
        ></ListCategory>
        <_AddCategoryButton onClick={() => setCategoryModal(true)}>
          + 카테고리
        </_AddCategoryButton>
        {categoryModal && (
          <AddCategory
            setUpdateCategory={() => {
              setUpdateCategory(!updateCategory);
            }}
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
