import Lottie from 'lottie-react';
import DataSpinner from './DataSpinner.json';
import { _Background } from './CommonStyle';

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
      </_Background>
    </>
  );
}
