import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';

const _StyledSearchIcon = styled(IoIosSearch)`
  position: absolute;
  right: 20px;
  top: 22px;
  font-size: 20px;
  transform: translateY(-50%);
  color: #ffff;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;

  &:hover {
    color: #ffff;
    background-color: #333;
  }
`;

export function SearchIcon() {
  return <_StyledSearchIcon />;
}
