// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import jwtDecode from 'jwt-decode';

// export function GoogleOAuth() {
//   const clientId =
//     '547835898042-k7ltqkia6kdspu0fjenn79jaenbrj6nj.apps.googleusercontent.com';

//   return (
//     <>
//       <GoogleOAuthProvider clientId='547835898042-k7ltqkia6kdspu0fjenn79jaenbrj6nj.apps.googleusercontent.com'>
//         <GoogleLogin
//           onSuccess={(credentialResponse) => {
//             // credential이 존재하는지 확인합니다.
//             if (credentialResponse.credential) {
//               //console.log(jwtDecode(credentialResponse.credential));
//             }
//           }}
//           onError={() => {
//             //console.log('Login Failed');
//           }}
//         />
//       </GoogleOAuthProvider>
//     </>
//   );
// }
