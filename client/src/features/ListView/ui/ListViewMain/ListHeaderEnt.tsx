import { useNavigate } from 'react-router';
import { _headBox, _buttonBox } from '../style';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';

function ListHeaderEnt({ category }: { category: string | undefined }) {
  const navigate = useNavigate();

  function editCategoryName() {
    const inputName = document.querySelector<HTMLInputElement>('#categoryName');
    if (inputName !== null) {
      inputName.focus;
      inputName.readOnly = !inputName.readOnly;
      if (inputName.readOnly) {
        category && (inputName.value = category);
      } else {
        inputName.style.backgroundColor = 'var(--color-zinc-700)';
      }
    }
  }

  return (
    <>
      <_headBox>
        <input id="categoryName" placeholder={category} readOnly={true}></input>

        <_buttonBox>
          {category != '전체' && category != '스크랩' && (
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
