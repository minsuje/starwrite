import { useNavigate } from 'react-router';
import { _headBox, _buttonBox } from '../style';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';
import { useRef } from 'react';
import { deleteCategoryApi } from '../../api/CategoryApi';

function ListHeaderEnt({
  category,
  categoryName,
}: {
  category: string | undefined;
  categoryName: string | undefined;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  function editCategoryName() {
    if (inputRef.current) {
      inputRef.current.readOnly = !inputRef.current.readOnly;
      if (!inputRef.current.readOnly) {
        inputRef.current.focus();
      }
    }
  }

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
                onClick={() => {
                  if (category) {
                    if (
                      confirm(`${categoryName}카테고리를 삭제하시겠습니까?
                    카테고리에 포함된 글이 모두 삭제되고 복구할 수 없습니다.`)
                    ) {
                      deleteCategoryApi(category);
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
              navigate('/user/starwrite/writenewpost');
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
