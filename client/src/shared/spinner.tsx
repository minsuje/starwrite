import Lottie from 'lottie-react';
import spinnerpage from './spinner.json';
import { styled } from 'styled-components';

const _spinnerTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  border: '1px solid #383737';
`;
export function Spinner() {
  return (
    <>
      <Lottie animationData={spinnerpage} />
      <_spinnerTitle>별빛 가득한 데이터를 수집 중...</_spinnerTitle>
    </>
  );
}
