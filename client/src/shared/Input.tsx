import styled from 'styled-components';

const FirstInput = styled.input`
  height: 30px;
  width: 300px;
  background-color: #616161;
  border: none;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 3px;
`;

const DefaultLabel = styled.label`
  color: #c0c0c0;
  padding-bottom: 5px;
`;

export function Input({ func }: { func: () => void }) {
  return (
    <>
      <FirstInput onChange={func}></FirstInput>
    </>
  );
}

export function Label({ children }: { children: string }) {
  return <DefaultLabel>{children}</DefaultLabel>;
}
