import styled from 'styled-components';
import { Label } from '../../../shared/Input';
import { Input } from '../../../shared/Input';

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 1px;
`;

function InputPassWord({ func }: { func: () => void }) {
  return (
    <>
      <InputDiv>
        <Label>비밀번호</Label>
        <Input func={func}></Input>
      </InputDiv>
    </>
  );
}

export default InputPassWord;
