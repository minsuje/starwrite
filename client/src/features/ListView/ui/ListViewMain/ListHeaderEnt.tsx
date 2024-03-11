import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

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
`;
function ListHeaderEnt() {
  const navigate = useNavigate();
  const { category } = useParams();

  return (
    <>
      <_headBox>
        <h1>{category} </h1>
        <_buttonBox>
          <button>수정</button>
          <button>삭제</button>

          <button
            onClick={() => {
              navigate('/starwrite/writenewpost');
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
