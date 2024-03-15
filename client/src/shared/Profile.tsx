import styled from 'styled-components';

export function ProfileShard({ image }: any) {
  const StImg = styled.img.attrs({
    src: '/L.jpeg',
    alt: 'ProfileImg',
  })`
    width: 40px;
    height: 40px;
    border-radius: 50%;
  `;
  return (
    <>
      <StImg />
    </>
  );
}
