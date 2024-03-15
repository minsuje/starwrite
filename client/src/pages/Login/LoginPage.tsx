import styled from 'styled-components';
import LoginForm from '../../features/Login/LoginFeat';

const PageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  align-items: center;
  justify-content: center;
`;

function LoginPage() {
  return (
    <>
      <PageLayout>
        <LoginForm />
      </PageLayout>
    </>
  );
}

export default LoginPage;
