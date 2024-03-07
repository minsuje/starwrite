import { Input, InputBox, Label, LargeButton } from '../../shared/CommonStyle';
import styled from 'styled-components';

const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

function RegisterForm() {
  return (
    <>
      <form>
        <RegisterBox>
          <InputBox>
            <Label>E-MAIL</Label>
            <Input></Input>
          </InputBox>

          <InputBox>
            <Label>닉네임</Label>
            <Input></Input>
          </InputBox>

          <InputBox>
            <Label>비밀번호</Label>
            <Input></Input>
          </InputBox>

          <InputBox>
            <Label>비밀번호 확인</Label>
            <Input></Input>
          </InputBox>

          <LargeButton type="submit">회원가입</LargeButton>
        </RegisterBox>
      </form>
    </>
  );
}

export default RegisterForm;
