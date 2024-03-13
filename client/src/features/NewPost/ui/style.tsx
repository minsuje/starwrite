import styled from 'styled-components';
// 스타일
export const OneCategory = styled.div`
  width: 80%;
  margin: 0px auto;
  text-align: center;
  padding: 15px 0px;
  background-color: #3c3c3c;
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
`;

export const _SelectedCategory = styled.div`
  width: 80%;
  margin: 0px auto;
  text-align: center;
  padding: 15px 0px;
  background-color: #3c3c3c;

  &:hover {
    background-color: #3c3c3c;
    cursor: pointer;
  }
`;

export const ListCategories = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
