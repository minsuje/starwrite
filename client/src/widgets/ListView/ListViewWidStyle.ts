import styled from 'styled-components';
//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  height: 85vh;
`;

const _CategoryBar = styled.div`
  width: 30%;
  height: fit-content;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const _CategoryContent = styled.div`
  width: 60%;
  height: 100%;

  background-color: var(--color-zinc-900);
  padding: 20px 30px;
`;

const _AddCategoryButton = styled.div`
  width: 72%;
  text-align: center;
  padding: 15px 0px;
  &:hover {
    background-color: var(--color-zinc-800);
    cursor: pointer;
  }
  background-color: var(--color-zinc-900);
  margin: 0;
`;

export { _AddCategoryButton, _CategoryBar, _CategoryContent, _ListViewBox };
