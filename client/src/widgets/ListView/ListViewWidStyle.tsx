import styled from 'styled-components';
//sidebar + contentBox
const _ListViewBox = styled.div`
  display: flex;
  height: 85vh;
`;

const _CategoryBar = styled.div`
  width: 30%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const _CategoryContent = styled.div`
  width: 100%;
  background-color: #42424266;
  padding: 20px 30px;
`;

const _AddCategoryButton = styled.div`
  width: 80%;
  text-align: center;
  padding: 15px 0px;

  &:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }
  background-color: #42424266;
  margin: 0;
`;

export { _AddCategoryButton, _CategoryBar, _CategoryContent, _ListViewBox };
