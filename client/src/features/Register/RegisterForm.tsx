import InputLabel from '../../entities/register/ui/InputLabel';
import styled from 'styled-components';
import Button from '../../shared/Button';
import { useState } from 'react';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

function RegisterForm() {
  const [name, setName] = useState<string>();
  const [id, setId] = useState<string>();

  const [email, setEmail] = useState<string>();

  const [password, setPassword] = useState<string>();

  return (
    <>
      <Form>
        <InputLabel name="이름"></InputLabel>
        <InputLabel name="ID"></InputLabel>
        <InputLabel name="E-MAIL"></InputLabel>
        <InputLabel name="비밀번호"></InputLabel>
        <Button size="l" name="회원가입"></Button>
      </Form>
    </>
  );
}

export default RegisterForm;
