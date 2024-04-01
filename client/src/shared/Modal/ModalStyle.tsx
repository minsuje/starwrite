import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const _ModalBg = styled(motion.div)`
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  /* width: 100vw; */
  /* height: 100vh; */
`;

export const _Modal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-zinc-800);
  display: flex;
  box-shadow: 0px 0px 24px 8px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0px 0px 24px 8px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 0px 24px 8px rgba(0, 0, 0, 0.24);
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 32px;
  z-index: 100;
  border-radius: 8px;
`;

export const _GlobalModalBg = styled(motion.div)`
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
export const _GlobalSearchModal = styled(motion.input)`
  display: flex;
  background-color: var(--color-zinc-800);
  line-height: 16px;
  padding: 16px 20px;
  color: #ffff;
  width: 100%;
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
  height: 100%;
  box-sizing: border-box;
  position: relative;
  border-radius: 6px;
`;

export const _GlovalSearchBox = styled(motion.div)`
  background-color: #ffff;
  max-width: 500px;
  max-height: 60vh;
  width: 100%;
  border-radius: 6px;
  box-sizing: border-box;
  background-color: var(--color-zinc-800);
  padding: 16px 20px;
  padding-right: 0px;
  margin-top: 10px;
  overflow-y: scroll; /* 내용이 넘칠 경우 스크롤바 생성 */
`;

export const _GlovalSearchResult = styled(motion.div)`
  margin-bottom: 20px;
`;

export const _GlovalSearchTitle = styled(motion.div)`
  display: flex;
  align-items: end;
  font-weight: bold;
  padding-bottom: 20px;
  font-size: 20px;
  width: 100%;
`;

export const _GlovalSearchContnet = styled(motion.div)`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 15px;
  color: #b3acac;
  line-height: 1.5;
`;

export const _GlobalLink = styled(Link)`
  display: flex;
  padding: 0px 0px;
  /* background-color: #212121; */
  color: #ffffff;
  text-decoration: none;

  /* &:hover {
    background-color: #333;
  } */
`;
export const _Globalname = styled.p`
  display: block;
  /* padding: 0px 20px; */
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
