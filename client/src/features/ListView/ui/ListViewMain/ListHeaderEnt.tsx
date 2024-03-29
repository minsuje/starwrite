import { useNavigate, useParams } from 'react-router';
import { _headBox, _buttonBox } from '../style';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';
import { useEffect } from 'react';
import { deleteCategoryApi } from '../../api/CategoryApi';
import { useAppDispatch, useAppSelector } from '../../../../shared/model';
import { categoryActions, currentCategory } from '../../model/CategorySlice';
import { resetState, stateActions } from '../../model/StateSlice';
import { EditActions } from '../../model/EditSlice';
import { _Button } from '../style';

function ListHeaderEnt({
  category,
  categoryName,
}: {
  category: string | undefined;
  categoryName: string | undefined;
}) {
  // 현재 선택된 카테고리를 저장
  const selected = useAppSelector(currentCategory);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { nickname } = useParams();
  const reset = useAppSelector(resetState);
  const myNickname = localStorage.getItem('nickname');

  async function deleteCategory() {
    if (category) {
      if (
        confirm(`${categoryName}카테고리를 삭제하시겠습니까?
      카테고리에 포함된 글이 모두 삭제되고 복구할 수 없습니다.`)
      ) {
        await deleteCategoryApi(category);
        dispatch(stateActions.reset(!reset));
        navigate(`/user/starwrite/listview/main/${nickname}/all`);
      }
    }
  }

  useEffect(() => {
    if (category) {
      dispatch(categoryActions.change(category));
      dispatch(categoryActions.name(categoryName));
    }
  }, [category, dispatch, selected, categoryName]);

  return (
    <>
      <_headBox>
        <h1>{categoryName}</h1>

        {nickname === myNickname && (
          <>
            <_buttonBox>
              {category != 'all' && category != 'scrab' && (
                <>
                  <button
                    onClick={() => {
                      dispatch(EditActions.change(true));
                    }}
                  >
                    <LuPencilLine />
                  </button>
                  <button onClick={deleteCategory}>
                    <IoIosTrash />
                  </button>
                </>
              )}

              <_Button
                onClick={() => {
                  navigate(`/user/starwrite/writenewpost`);
                }}
              >
                글쓰기
              </_Button>
            </_buttonBox>
          </>
        )}
      </_headBox>
    </>
  );
}

export default ListHeaderEnt;
