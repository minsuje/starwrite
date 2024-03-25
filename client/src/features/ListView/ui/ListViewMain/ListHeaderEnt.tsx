import { useNavigate, useParams } from 'react-router';
import { _headBox, _buttonBox } from '../style';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';
import { useEffect, useRef } from 'react';
import { deleteCategoryApi } from '../../api/CategoryApi';
import { useAppDispatch, useAppSelector } from '../../../../shared/model';
import { categoryActions, currentCategory } from '../../model/CategorySlice';
import { resetState, stateActions } from '../../model/StateSlice';

function ListHeaderEnt({
  category,
  categoryName,
}: {
  category: string | undefined;
  categoryName: string | undefined;
}) {
  // store
  const selected = useAppSelector(currentCategory);
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { nickname } = useParams();
  const reset = useAppSelector(resetState);

  function editCategoryName() {
    if (inputRef.current) {
      inputRef.current.readOnly = !inputRef.current.readOnly;
      if (!inputRef.current.readOnly) {
        inputRef.current.focus();
      }
    }
  }

  useEffect(() => {
    if (category) {
      dispatch(categoryActions.change(category));
    }
  }, [category, dispatch, selected]);

  return (
    <>
      <_headBox>
        <input value={categoryName} ref={inputRef}></input>

        <_buttonBox>
          {category != '전체' && category != '' && (
            <>
              <button onClick={editCategoryName}>
                <LuPencilLine />
              </button>
              <button
                onClick={async () => {
                  if (category) {
                    if (
                      confirm(`${categoryName}카테고리를 삭제하시겠습니까?
                    카테고리에 포함된 글이 모두 삭제되고 복구할 수 없습니다.`)
                    ) {
                      await deleteCategoryApi(category);
                      dispatch(stateActions.reset(!reset));
                      console.log('헤더', reset);
                      navigate(`/user/starwrite/listview/main/${nickname}/all`);
                    }
                  }
                }}
              >
                <IoIosTrash />
              </button>
            </>
          )}

          <button
            onClick={() => {
              navigate(`/user/starwrite/writenewpost`);
            }}
          >
            글 추가하기
          </button>
        </_buttonBox>
      </_headBox>
    </>
  );
}

export default ListHeaderEnt;
