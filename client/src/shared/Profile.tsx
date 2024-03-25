import styled from 'styled-components';

const StImg = styled.img.attrs({
  src: '/L.jpeg',
  alt: 'ProfileImg',
})`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
`;
export function ProfileShard() {
  return (
    <>
      <StImg />
    </>
  );
}
