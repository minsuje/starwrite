import { MdOutlineScreenSearchDesktop } from 'react-icons/md';
import { styled } from 'styled-components';

export const _styledSearchIcon = styled.span`
  font-size: 25px;
  cursor: pointer;
`;

export function InterGratedSearchIcon() {
  return (
    <>
      <_styledSearchIcon>
        <MdOutlineScreenSearchDesktop />
      </_styledSearchIcon>
    </>
  );
}
