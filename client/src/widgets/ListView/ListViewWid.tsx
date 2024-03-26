import { AddCategory, ListCategory } from '../../features/ListView';
import { Outlet, useParams } from 'react-router';
import {
  _AddCategoryButton,
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from './ListViewWidStyle';
import { useEffect, useState } from 'react';

function ListViewWid() {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [updateCategory, setUpdateCategory] = useState<boolean>(true);
  const [myNickname, setMyNickname] = useState<string | null>();
  const [isMine, setIsMine] = useState<boolean>();
  const { category, nickname } = useParams();

  useEffect(() => {
    setMyNickname(localStorage.getItem('nickname'));
    if (nickname === myNickname) {
      setIsMine(true);
    } else {
      setIsMine(false);
    }
  }, [myNickname, nickname]);

  return (
    <_ListViewBox>
      <_CategoryBar>
        <ListCategory
          updateCategory={updateCategory}
          category={category}
          nickname={nickname}
        ></ListCategory>
        {isMine && (
          <_AddCategoryButton onClick={() => setCategoryModal(true)}>
            + 카테고리
          </_AddCategoryButton>
        )}

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
