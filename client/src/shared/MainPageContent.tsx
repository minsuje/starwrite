import { useRef, RefObject, useState } from 'react';
import styled from 'styled-components';
import { MainPageSlider } from './MainPageSlider';
import { GoChevronDown } from 'react-icons/go';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
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
  width: 90%;
  height: 100%;
`;

// 그리드 아이템 스타일링
const GridItem = styled.div`
  /* border: 1px solid #ffff;  */
  padding: 20px; /* 안쪽 여백 설정 */
  text-align: center;
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
    box-shadow:
      inset 0 0 20px rgba(255, 255, 255, 0.5),
      0 0 20px rgba(255, 255, 255, 0.2);
    outline-color: rgba(255, 255, 255, 0);
    outline-offset: 15px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
`;
const StyledBox = styled.div`
  height: 50%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border: 1px solid #ffff;

  margin-top: 300px;
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

  // console.log(scrollRef);

  const toggleShowBox = (divKey) => {
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
            AI 백링크 연결 추천
            <p>
              백링크를 통해 지식을 서로 연관지어 보세요 처음이라 어려우시다면
              AI가 도와드립니다
            </p>
            <button onClick={scrollToFirstRef}>자세히보기</button>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            내 문서 기반 AI 챗봇
            <p>내가 작성한 문서들과 대화해보세요.</p>
            <button onClick={scrollSecondRef}>자세히보기</button>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            노드뷰
            <p>지식이 서로 어떻게 연결되어 있는지 확인해보세요</p>
            <button onClick={scrollThirdRef}>자세히보기</button>
          </GridItem>
        </StyledLink>

        <StyledLink>
          <GridItem>
            에디터
            <p>마크다운을 지원하는 에디터로 손쉽게 글을 작성하세요</p>
            <button onClick={scrollFourthRef}>자세히보기</button>
          </GridItem>
        </StyledLink>
      </GridContainer>

      <div style={{ height: '100%' }}>
        <StyledBox>
          <div ref={fristScrollRef}>
            <h2>AI 백링크 연결</h2>
          </div>
          <MainPageSlider></MainPageSlider>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </StyledBox>
        <StyledBox>
          <div ref={secondScrollRef}>
            <h2>내 문서 기반 AI 챗봇</h2>
          </div>
          <MainPageSlider></MainPageSlider>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </StyledBox>
        <StyledBox>
          <div ref={ThirdRef}>
            <h2>노드뷰</h2>
          </div>
          <MainPageSlider></MainPageSlider>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </StyledBox>
        <StyledBox>
          <div ref={FourthdRef}>
            <h2>에디터</h2>
          </div>
          <MainPageSlider></MainPageSlider>
          <p>
            백링크 연결이 어려울땐 자비스를 불러보세요 여러분의 문서를 분석해서
            가장 연관있는 데이터를 추천해드립니다
          </p>
        </StyledBox>
        <StyledBox>
          <h2>자주 묻는 질문</h2>

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
                왜 별이 흐려지나요{' '}
                <GoChevronDown
                  style={{
                    transform: visibility.div1
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div1 && <_AnswerBox>망각곡선을 이용한~~</_AnswerBox>}

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
                왜 별이 흐려지나요{' '}
                <GoChevronDown
                  style={{
                    transform: visibility.div2
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div2 && <_AnswerBox>망각곡선을 이용한~~</_AnswerBox>}

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
                왜 별이 흐려지나요{' '}
                <GoChevronDown
                  style={{
                    transform: visibility.div3
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </_QuestionBox>
              {visibility.div3 && <_AnswerBox>망각곡선을 이용한~~</_AnswerBox>}

              {/* 이하 동일한 패턴으로 div2, div3에 대한 부분 추가 */}
            </div>
          </div>
        </StyledBox>
        <StyledBox>
          <footer>
            <div>
              <p>주식회사: (주)파워레인저</p>
              <p>전화번호: 010-5173-8080</p>
              <p>이메일 주소: contact@powerrangers.com</p>
              <p>주소 : 서울특별시 강남구 테헤란로 123, 45층</p>
            </div>

            <div className="social-media">
              <p>Follow us</p>
              <a href="https://www.facebook.com/yourpage" target="_blank">
                <FaFacebook />
              </a>
              <a href="https://www.twitter.com/yourpage" target="_blank">
                <FaSquareXTwitter />
              </a>
              <a href="https://www.instagram.com/yourpage" target="_blank">
                <FaGithubAlt />
              </a>
              <a href="https://www.instagram.com/" target="_black">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/" target="_black">
                <FaYoutube />
              </a>
              <p>@ 2024 Starwrite</p>
            </div>
          </footer>
        </StyledBox>
      </div>
    </>
  );
}
