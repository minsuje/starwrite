import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DataSpinnerSh } from './DataSpinner';

const _CenteredComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 20px;
  text-align: center;
`;

const _StyledLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: #4a90e2;
  color: white;
  text-decoration: none;
  font-weight: bold;
  transition:
    background-color 0.3s,
    transform 0.3s;

  &:hover {
    background-color: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
interface NoDataComponentProps {
  category: string; //
}

export function NoDataComponent({ category }: NoDataComponentProps) {
  const nickName = localStorage.getItem('nickname');
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataSpinnerSh></DataSpinnerSh>
      <_CenteredComponent>
        <p>{category}가 존재하지 않습니다.</p>
        <_StyledLink to={`/user/starwrite/listview/main/${nickName}/all`}>
          데이터 생성하기
        </_StyledLink>
      </_CenteredComponent>
    </div>
  );
}
