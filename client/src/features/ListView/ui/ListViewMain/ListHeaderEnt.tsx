import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { IoIosTrash } from 'react-icons/io';
import { LuPencilLine } from 'react-icons/lu';

const _headBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 10px 40px 10px;

  h1 {
    font-size: 20px;
    font-weight: 700;
  }
`;

const _buttonBox = styled.div`
  display: flex;
  justify-content: end;
  gap: 10px;

  button {
    background-color: #3f3f3f;
    color: white;
    box-shadow: none;
  }
`;
function ListHeaderEnt({ category }: { category: string | undefined }) {
  const navigate = useNavigate();

  return (
    <>
      <_headBox>
        <h1>{category} </h1>

        <_buttonBox>
          {category != '전체' &&
            category != '임시저장' &&
            category != '스크랩' && (
              <>
                <button>
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
