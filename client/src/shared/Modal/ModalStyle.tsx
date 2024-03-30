import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const _ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  right: 0%;
  bottom: 0;
  z-index: 10;
  width: 100vw;
  height: 100vh;
`;

export const _Modal = styled.div`
  background-color: var(--color-zinc-800);
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: absolute;
  z-index: 100;
  width: 360px;
  height: 270px;
  bottom: 40%;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
`;

export const _GlobalModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100; // 다른 요소보다 상위에 위치하도록 z-index 설정
`;

// 통합검색 모달창
export const _GlobalSearchModal = styled.input`
  background-color: var(--color-zinc-800);
  line-height: 16px;
  padding: 16px 20px;
  color: #ffff;
  /* padding-bottom: 10px; */
  /* display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  z-index: 100;
  height: 100%;
  bottom: 50%;
  left: 50%;
  top: -50px;
  border-radius: 10px;
  transform: translateX(-50%); */
  border: none;
  /* padding: 0px; */
  width: 100%;
  height: 100%;
  position: relative;
`;

export const _GlovalSearchBox = styled.div`
  background-color: #ffff;
  max-height: 70vh; /* 뷰포트 높이의 70%로 최대 높이를 제한 */
  width: 100%;
  background-color: var(--color-zinc-800);
  padding: 15px 20px;
  margin-top: 10px;
  overflow-y: auto; /* 내용이 넘칠 경우 스크롤바 생성 */
`;

export const _GlovalSearchResult = styled.div`
  margin-bottom: 20px;
`;

export const _GlovalSearchTitle = styled.div`
  display: flex;
  align-items: end;
  font-weight: bold;
  padding-bottom: 20px;
  font-size: 20px;
  width: 100%;
`;

export const _GlovalSearchContnet = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
`;

export const _GlobalLink = styled(Link)`
  display: block;
  padding: 0px 15px;
  /* background-color: #212121; */
  color: #ffffff;
  text-decoration: none;

  /* &:hover {
    background-color: #333;
  } */
`;
export const _Globalname = styled.p`
  display: block;
  padding: 0px 20px;
  color: #656262;
  text-decoration: none;
  margin-bottom: 15px;
`;
export const _Globaldate = styled.p`
  width: 80%;
  display: flex;
  justify-content: flex-end;
  color: #656262;
  text-decoration: none;
  font-size: 13px;
  text-align: end;
`;
