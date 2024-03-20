import { useNavigate } from 'react-router';
import { _headBox, _buttonBox } from '../style';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';
import { useRef } from 'react';

function ListHeaderEnt({ category }: { category: string | undefined }) {
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
        <input value={category} ref={inputRef}></input>

        <_buttonBox>
          {category != '전체' && category != '' && (
            <>
              <button onClick={editCategoryName}>
                <LuPencilLine />
              </button>
              <button>
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
