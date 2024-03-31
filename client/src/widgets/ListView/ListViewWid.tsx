import {
  AddCategory,
  EditCategory,
  ListCategory,
} from '../../features/ListView';
import { Outlet, useParams } from 'react-router';
import {
  _AddCategoryButton,
  _CategoryBar,
  _CategoryContent,
  _ListViewBox,
} from './ListViewWidStyle';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/model';
import {
  EditActions,
  EditState,
} from '../../features/ListView/model/EditSlice';
import { FiPlus } from 'react-icons/fi';

function ListViewWid() {
  const [categoryModal, setCategoryModal] = useState<boolean>(false);
  const [updateCategory, setUpdateCategory] = useState<boolean>(true);
  const [myNickname, setMyNickname] = useState<string | null>();
  const [isMine, setIsMine] = useState<boolean>();
  const { category, nickname } = useParams();

  const EditOpen = useAppSelector(EditState);
  const dispatch = useAppDispatch();

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
            <FiPlus color="#fff" />
            카테고리 추가
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
        {EditOpen && (
          <EditCategory
            category={category}
            onclick={() => {
              dispatch(EditActions.change(false));
            }}
          ></EditCategory>
        )}
      </_CategoryBar>

      <_CategoryContent>
        <Outlet />
      </_CategoryContent>
    </_ListViewBox>
  );
}

export default ListViewWid;
