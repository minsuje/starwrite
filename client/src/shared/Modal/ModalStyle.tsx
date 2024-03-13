import styled from 'styled-components';

export const _ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.75);
  position: fixed;
  right: 0%;
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
  bottom: 50%;
  left: 50%;
  border-radius: 10px;
  transform: translateX(-50%);
`;
