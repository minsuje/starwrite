import styled from 'styled-components';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
import Savings from '../model/Savings';
import { OneCategory } from '../ui/style';
import { useNavigate } from 'react-router';

type closeModal = () => void;

// style 정의
const _Box = styled(_Modal)`
  display: flex;
  width: 80%;
  height: 80%;
  top: 0;
  flex-direction: column;
  gap: 30px;
  color: #adadad;

  label {
    font-size: 20px;
  }
`;

const _postBox = styled.div`
  padding: 25px 20px;
  background-color: var(--color-zinc-700);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-decoration: none;
  text-decoration-line: none;
  h1 {
    font-size: 20px;
    color: var(--color-zinc-300);
  }
  p {
    font-size: 13px;
    color: var(--color-zinc-500);
  }
  &:hover {
    opacity: 0.8;
  }
`;

function GetSavings({ onclick }: { onclick: closeModal }) {
  const navigate = useNavigate();
  return (
    <>
      <_ModalBg>
        <_Box>
          <div>
            <span>임시저장 글 목록</span>
            <button
              onClick={() => {
                onclick();
              }}
            >
              취소
            </button>
          </div>

          {Savings.map((saving) => {
            return (
              <OneCategory
                key={saving.id}
                onClick={() => {
                  navigate(`/user/starwrite/writenewpost/${saving.id}`);
                  onclick();
                }}
              >
                <_postBox>
                  <h1>{saving.title === null ? '제목없음' : saving.title}</h1>
                  <p>작성 날짜 추가</p>
                </_postBox>
              </OneCategory>
            );
          })}
        </_Box>
      </_ModalBg>
    </>
  );
}

export default GetSavings;
