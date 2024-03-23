import React, { useState, useEffect } from 'react';

// 모달 컴포넌트 예시
// const ModalComponent = () => (
//   <div
//     style={{
//       position: 'fixed',
//       top: '20%',
//       left: '20%',
//       backgroundColor: 'white',
//       width: '50%',
//       height: '50%',
//       zIndex: 100,
//     }}
//   >
//     <span>하이</span>
//   </div>
// );

// export const InterGratedSearchpage = () => {
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       // Ctrl + F 키 조합을 감지합니다.
//       if (event.ctrlKey && event.key === 'f') {
//         event.preventDefault(); // 브라우저 기본 이벤트를 방지합니다.
//         setShowModal(true); // 모달 컴포넌트를 보여줍니다.
//       }
//     };

//     // 키 다운 이벤트 리스너를 등록합니다.
//     document.addEventListener('keydown', handleKeyDown);

//     // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거합니다.
//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);

//   return (
//     <div>
//       <h1>안녕하세요! 메인 컨텐츠입니다.</h1>
//       {showModal && <ModalComponent />}
//     </div>
//   );
// };

export function InterGratedSearchpage() {
  return (
    <>
      <div>디브ㅂ</div>
    </>
  );
}
