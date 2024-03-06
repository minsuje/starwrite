import styled from 'styled-components';
import RegisterForm from '../../features/Register/RegisterForm';

const PageLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function RegisterPage() {
  return (
    <>
      <PageLayout>
        <RegisterForm />
      </PageLayout>
    </>
  );
}

export default RegisterPage;
