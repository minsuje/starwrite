import styled from 'styled-components';
//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  height: 80vh;
`;

const _CategoryBar = styled.div`
  margin-top: 5rem;
  width: 150px;
  height: fit-content;
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const _CategoryContent = styled.div`
  width: 80%;
  height: 85%;
  background-color: var(--color-zinc-900);
  padding: 20px 30px;
`;

const _AddCategoryButton = styled.div`
  width: fit-content;
  border-radius: 10px;
  text-align: center;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  &:hover {
    color: var(--color-zinc-300);
    cursor: pointer;
  }
  color: var(--color-zinc-200);
  margin: 0;
`;

export { _AddCategoryButton, _CategoryBar, _CategoryContent, _ListViewBox };
