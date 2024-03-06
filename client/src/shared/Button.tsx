import styled from 'styled-components';

const SmallButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

const MediumButton = styled.button`
  width: 200px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

const LargeButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #1361d7;
  color: white;
  border: none;
  &:hover {
    background-color: #0353cb;
  }
`;

function Button({
  name,
  size,
  func,
}: {
  name: string;
  size: string;
  func?: () => void;
}) {
  if (size === 's') {
    return <SmallButton onClick={func}>{name}</SmallButton>;
  }

  if (size === 'm') {
    return <MediumButton onClick={func}>{name}</MediumButton>;
  }

  if (size === 'l') {
    return <LargeButton onClick={func}>{name}</LargeButton>;
  }
}

export default Button;
