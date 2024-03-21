import styled from 'styled-components';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
// import Savings from '../model/Savings';
import { OneCategory } from '../ui/style';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Saving } from '..';
import { savingsApi } from '../api/newPostApi';

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
  const [savings, setSavings] = useState<Saving[]>([]);
  useEffect(() => {
    const promise = savingsApi();
    promise.then((savings) => {
      console.log('임시저장 목록 data: ', savings);
      if (savings) setSavings(savings);
    });
  }, []);

  if (savings.length == 0) {
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

            <div>임시저장 글이 없습니다.</div>
          </_Box>
        </_ModalBg>
      </>
    );
  }

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

          {savings.map((saving) => {
            return (
              <OneCategory
                key={saving.postid}
                onClick={() => {
                  navigate(`/user/starwrite/writenewpost/${saving.postid}`);
                  onclick();
                }}
              >
                <_postBox>
                  <h1>
                    {saving.posts.title === ''
                      ? '제목없음'
                      : saving.posts.title}
                  </h1>
                  <p></p>
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
