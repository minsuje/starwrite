import { useRef, RefObject, useState } from 'react';
import styled from 'styled-components';
import { MainPageSlider } from './MainPageSlider';
import { GoChevronDown } from 'react-icons/go';
import { FaFacebook } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaGithubAlt } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { TiSocialInstagram } from 'react-icons/ti';
import './mainPageSilder.css';

// 그리드 컨테이너 스타일링
const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2개의 컬럼으로 설정 */
  gap: 20px; /* 그리드 아이템 간의 간격 설정 */
  height: 100%;
  padding: 30px;
`;

// 그리드 아이템 스타일링
const GridItem = styled.div`
  /* border: 1px solid gray; */
  padding: 50px; /* 안쪽 여백 설정 */
  text-align: center;

  p {
    font-size: 1rem;
    line-height: 1.4;
    color: #c0c0c0;
  }
`;

const StyledLink = styled.div`
  border: 0 solid;
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0);
  /* outline: 1px solid; */
  outline-color: rgba(255, 255, 255, 0.5);
  outline-offset: 0px;
  text-shadow: none;
  transition: all 125ms cubic-bezier(0.19, 1, 0.22, 1);

  &:hover {
    border: 1px solid;
    margin: -1px;
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;
const StyledBox = styled.div`
  /* height: 50%; */
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  /* border: 1px solid #ffff; */

  margin-top: 300px;
`;

const MainPageContentTitle = styled.h1`
  padding-bottom: 30px;
  width: 100%;
`;

const _favicon = styled.div`
  height: 15%;
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: start;
  align-items: center;
  /* border: 1px solid #ffff; */
`;

const _SnsBox = styled.div`
  display: flex;
  /* justify-content: ; */
  align-items: center;
  padding: 10px;
  /* border: 1px solid #ffff; */
`;

const _sideFooterBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
  /* border: 1px solid #ffff; */
`;

const _QuestionBox = styled.div`
  width: 90%;
  padding: 15px 20px;
  margin-bottom: 10px;

  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e9e9e9;
    color: black;
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const _AnswerBox = styled.div`
  width: 90%;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  line-height: 1.6;
  color: #6d6868;
`;

const _Footercontent = styled.p`
  /* border: 1px solid #ffff; */
  margin: 14px;
`;

const _MainPageBtn = styled.button`
  color: #fff;
  line-height: 42px;
  padding: 30px 30px;
  border: none;
  background: none;
  cursor: pointer;

  &::before,
  &::after {
    position: absolute;
    content: '';
    height: 0%;
    width: 2px;
  }

  &::before {
    right: 0;
    top: 0;
    transition: all 500ms ease;
  }

  &::after {
    left: 0;
    bottom: 0;
    transition: all 500ms ease;
  }

  &:hover {
    color: #fff;
    background: transparent;

    &::before,
    &::after {
      height: 100%;
    }
  }
`;

const _MainPageBtnContent = styled.span`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;

  &::before,
  &::after {
    position: absolute;
    content: '';
    background: #ffff;
  }

  &::before {
    left: 0;
    top: 0;
    width: 0%;
    height: 2px;
    transition: all 500ms ease;
  }

  &::after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    transition: all 500ms ease;
  }

  ${_MainPageBtn}:hover & {
    &::before,
    &::after {
      width: 100%;
    }
  }
`;

export function MainPageContent() {
  const fristScrollRef: RefObject<HTMLDivElement> = useRef(null);
  const secondScrollRef: RefObject<HTMLDivElement> = useRef(null);
  const ThirdRef: RefObject<HTMLDivElement> = useRef(null);
  const FourthdRef: RefObject<HTMLDivElement> = useRef(null);

  const [visibility, setVisibility] = useState({
    div1: false,
    div2: false,
    div3: false,
  });

  // //console.log(scrollRef);

  type VisibilityKeys = 'div1' | 'div2' | 'div3';
  const toggleShowBox = (divKey: VisibilityKeys) => {
    setVisibility((prevState) => ({
      ...prevState,
      [divKey]: !prevState[divKey],
    }));
  };

  function scrollToFirstRef() {
    if (fristScrollRef.current) {
      fristScrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  function scrollSecondRef() {
    if (secondScrollRef.current) {
      secondScrollRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  function scrollThirdRef() {
    if (ThirdRef.current) {
      ThirdRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }
  function scrollFourthRef() {
    if (FourthdRef.current) {
      FourthdRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  return (
    <>
      <GridContainer>
        <StyledLink>
          <GridItem>
            <MainPageContentTitle> 백링크 연결 </MainPageContentTitle>
            <p>
              백링크를 통해 지식을 서로 연관지어 보세요 처음이라 어려우시다면
              AI가 도와드립니다
            </p>
            <_MainPageBtn onClick={scrollToFirstRef}>
              <_MainPageBtnContent>자세히 보기</_MainPageBtnContent>
            </_MainPageBtn>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            <MainPageContentTitle>내 문서 기반 AI 챗봇</MainPageContentTitle>
            <p>
              내가 작성한 문서들을 참고하여 다양한 아이디어를 AI와 함께
              만들어가세요.
            </p>
            <_MainPageBtn onClick={scrollSecondRef}>
              <_MainPageBtnContent>자세히보기</_MainPageBtnContent>
            </_MainPageBtn>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            <MainPageContentTitle>노드뷰</MainPageContentTitle>
            <p>지식이 서로 어떻게 연결되어 있는지 확인해보세요</p>
            <_MainPageBtn onClick={scrollThirdRef}>
              <_MainPageBtnContent>자세히보기</_MainPageBtnContent>
            </_MainPageBtn>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            <MainPageContentTitle>에디터</MainPageContentTitle>
            <p>마크다운을 지원하는 에디터로 손쉽게 글을 작성하세요</p>
            <_MainPageBtn onClick={scrollFourthRef}>
              <_MainPageBtnContent>자세히보기</_MainPageBtnContent>
            </_MainPageBtn>
          </GridItem>
        </StyledLink>
      </GridContainer>
      <div style={{ height: '100%' }}>
        <StyledBox>
          <div ref={FourthdRef}>
            <h1 style={{ padding: '30px' }}>에디터</h1>
          </div>
          <MainPageSlider
            contentImg={['EditorMainpage.png']}
            contentText={[
              '우리는 강력한 에디터를 지원합니다. 당신만의 노트를 만들고 백링크를 통해 지식을 연관지어보세요 ',
            ]}
          />
        </StyledBox>

        <StyledBox>
          <div ref={fristScrollRef}>
            <h1 style={{ padding: '30px' }}> 백링크 연결</h1>
          </div>
          <MainPageSlider
            contentImg={[
              '/BackLink.png',
              '/BackLinkNode.png',
              '/BackLinkNode2.png',
            ]}
            contentText={[
              '당신의 카테고리 데이터를 먼저 만드세요',
              '카테고리 데이터 생성 후, 노드 데이터를 생성하세요',
              '노드 생성 후, 글쓰기를 통해 본인의 별들을 만들어보세요.',
            ]}
          />
        </StyledBox>

        <StyledBox>
          <div ref={ThirdRef}>
            <h1 style={{ padding: '30px' }}>노드뷰</h1>
          </div>
          <MainPageSlider
            contentImg={['/MainPage2.png']}
            contentText={[
              '사용자들의 많은 데이터를 한눈에 보기 쉽게 우리는 강력한 UI를 제공합니다.',
            ]}
          />
        </StyledBox>

        <StyledBox>
          <div ref={secondScrollRef}>
            <h1 style={{ padding: '30px' }}>내 문서 기반 AI 챗봇</h1>
          </div>
          <MainPageSlider
            contentImg={['/MainPageAI.png']}
            contentText={[
              '당신의 많은 자료들은 우리의 AI "헤이민수"가 도와드립니다. ',
            ]}
          />
        </StyledBox>

        <StyledBox>
          <h1 style={{ padding: '30px' }}>자주 묻는 질문</h1>

          <div
            style={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <_QuestionBox onClick={() => toggleShowBox('div1')}>
                STARWRITE는 무엇을 하는 사이트 인가요?
                <GoChevronDown
                  style={{
                    transform: visibility.div1
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div1 && (
                <_AnswerBox>
                  <p>
                    사용자들의 지식을 서로 공유하여 공유된 지식들을 서로
                    연결하여 창의적인 아이디어를 얻을수 있도록 도와드립니다.
                  </p>
                  <p>
                    당신의 지식을 작성하여 다른사람들과 공유하여 더 많은
                    창의적인 아이디어를 얻어보세요.
                  </p>
                </_AnswerBox>
              )}

              {/* 이하 동일한 패턴으로 div2, div3에 대한 부분 추가 */}
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <_QuestionBox onClick={() => toggleShowBox('div2')}>
                별들의 색상이 점점 흐려지는 이유가 무엇인가요 ?
                <GoChevronDown
                  style={{
                    transform: visibility.div2
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div2 && (
                <_AnswerBox>
                  <p>
                    저희 STARWRITE는 여러분의 잊혀져가는 기억속에 메모를 다시
                    상기시켜주기 위해 망각곡선을 사용하고있습니다.
                  </p>
                  <p>조회 날짜에 따라 노드뷰는 다시 밝아 질 수 있습니다.</p>
                </_AnswerBox>
              )}

              {/* 이하 동일한 패턴으로 div2, div3에 대한 부분 추가 */}
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <_QuestionBox onClick={() => toggleShowBox('div3')}>
                제 별들 옆에 노란색은 무엇인가요 ?
                <GoChevronDown
                  style={{
                    transform: visibility.div3
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div3 && (
                <_AnswerBox>
                  <p>누군가가 당신의 매력적인 글을 스크랩 했다는 표시입니다.</p>
                </_AnswerBox>
              )}

              {/* 이하 동일한 패턴으로 div2, div3에 대한 부분 추가 */}
            </div>
          </div>
        </StyledBox>

        <footer
          style={{
            marginTop: '300px',
            display: 'flex',
            height: '50%',
            justifyContent: 'space-between',
            borderTop: '1px solid gray',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'center',
            }}
          >
            <_favicon>
              <img src="/star_fav_dark.svg" alt="favicon" />
              <h2>STARWRITE</h2>
            </_favicon>

            <_SnsBox>
              <p style={{ color: 'gray' }}>Follow us</p>
            </_SnsBox>
            <_SnsBox>
              <a href="https://www.facebook.com/yourpage" target="_blank">
                <FaFacebook
                  style={{ marginRight: '10px', fontSize: '1.3rem' }}
                />
              </a>
              <a href="https://www.twitter.com/yourpage" target="_blank">
                <FaSquareXTwitter
                  style={{ marginRight: '10px', fontSize: '1.3rem' }}
                />
              </a>
              <a href="https://www.instagram.com/yourpage" target="_blank">
                <FaGithubAlt
                  style={{ marginRight: '10px', fontSize: '1.3rem' }}
                />
              </a>
              <a href="https://www.instagram.com/" target="_black">
                <TiSocialInstagram
                  style={{ marginRight: '10px', fontSize: '1.3rem' }}
                />
              </a>
              <a href="https://www.youtube.com/" target="_black">
                <FaYoutube
                  style={{ marginRight: '10px', fontSize: '1.3rem' }}
                />
              </a>
            </_SnsBox>

            <_SnsBox>
              <p>@ 2024 Starwrite</p>
            </_SnsBox>
          </div>
          <_sideFooterBox>
            <div>
              <_Footercontent>주식회사: (주)파워레인저</_Footercontent>
              <_Footercontent>전화번호: 010-5173-8080</_Footercontent>
              <_Footercontent>
                이메일 주소: contact@powerrangers.com
              </_Footercontent>
              <_Footercontent>
                주소 : 서울특별시 강남구 테헤란로 123, 45층
              </_Footercontent>
            </div>
          </_sideFooterBox>
          <_sideFooterBox>
            <div>
              <_Footercontent>
                <a href="/terms">이용 약관</a>
              </_Footercontent>
              <_Footercontent>
                <a href="/privacy">개인정보 처리방침</a>
              </_Footercontent>
              <_Footercontent>
                <a href="/cookie-policy">쿠키 정책</a>
              </_Footercontent>
              {/* <_Footercontent>
                주소 : 서울특별시 강남구 테헤란로 123, 45층
              </_Footercontent> */}
            </div>
          </_sideFooterBox>
        </footer>
      </div>
    </>
  );
}
