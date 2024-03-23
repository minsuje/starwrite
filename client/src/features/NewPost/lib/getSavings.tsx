import styled from 'styled-components';
import { _ModalBg } from '../../../shared/Modal/ModalStyle';
import { OneCategory } from '../ui/style';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { Saving } from '..';
import { savingsApi } from '../api/newPostApi';
import { _Box, _postBox } from '../ui/style';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

type closeModal = () => void;

const _SavingListTitle = styled.div`
  font-size: 2rem;
`;

function GetSavings({ onclick }: { onclick: closeModal }) {
  const navigate = useNavigate();
  const [savings, setSavings] = useState<Saving[]>([]);
  useEffect(() => {
    const promise = savingsApi();
    promise.then((savings) => {
      if (savings) setSavings(savings);
    });
  }, []);

  if (savings.length == 0) {
    return (
      <>
        <_ModalBg>
          <_Box>
            <_SavingListTitle>
              <span>임시저장 목록</span>
            </_SavingListTitle>

            <div>임시저장 글이 없습니다.</div>
            <button
              onClick={() => {
                onclick();
              }}
            >
              취소
            </button>
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
                  <p>
                    {saving.posts.createdAt
                      ? format(saving.posts.createdAt, 'PPP EEE요일', {
                          locale: ko,
                        })
                      : '날짜정보없음'}
                  </p>
                </_postBox>
              </OneCategory>
            );
          })}
          <button
            onClick={() => {
              onclick();
            }}
          >
            취소
          </button>
        </_Box>
      </_ModalBg>
    </>
  );
}

export default GetSavings;
