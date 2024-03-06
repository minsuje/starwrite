import styled from 'styled-components';
import { Input, Label } from '../../../shared/Input';

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 1px;
`;

function InputLabel({ name, func }: { name: string; func: () => void }) {
  return (
    <>
      <InputDiv>
        <Label>{name}</Label>
        <Input func={func}></Input>
      </InputDiv>
    </>
  );
}

export default InputLabel;
