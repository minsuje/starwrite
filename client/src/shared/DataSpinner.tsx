import Lottie from 'lottie-react';
import DataSpinner from './DataSpinner.json';
import { styled } from 'styled-components';
import { _Background } from './CommonStyle';
const _spinnerTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

export function DataSpinnerSh() {
  return (
    <>
      <_Background>
        <Lottie
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
          animationData={DataSpinner}
        />
        <_spinnerTitle>Non Data</_spinnerTitle>
      </_Background>
    </>
  );
}
