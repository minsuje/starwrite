import styled from 'styled-components';
import { motion } from 'framer-motion';

//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  /* height: calc(100vh); */
  height: 100%;

  /* background-color: #fff; */
  /* height: 80vh; */
`;

const _CategoryBar = styled(motion.div)`
  /* margin-top: 5rem; */
  width: 240px;
  padding: 16px;
  /* height: 100%; */
  display: flex;
  gap: 16px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const _CategoryContent = styled(motion.div)`
  width: 100%;
  border-radius: 6px;
  padding: 24px;
  background: linear-gradient(
    90deg,
    rgba(24, 24, 24, 1) 0%,
    rgba(14, 14, 14, 1) 100%
  );
  overflow-y: scroll;
`;

const _AddCategoryButton = styled(motion.div)`
  width: calc(100%);
  padding: 16px;
  border-radius: 4px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  /* font-size: 1.5rem; */
  color: var(--color-zinc-200);
  background-color: #ffffff20;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */

  &:hover {
    color: var(--color-zinc-300);
    cursor: pointer;
  }
`;

export { _AddCategoryButton, _CategoryBar, _CategoryContent, _ListViewBox };
