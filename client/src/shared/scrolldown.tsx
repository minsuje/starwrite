import Lottie from 'lottie-react';
import scrolldown from './scrolldown.json';

export function PageScrolldown() {
  return (
    <>
      <Lottie
        style={{
          marginTop: '200px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '30px',
        }}
        animationData={scrolldown}
      />
    </>
  );
}
