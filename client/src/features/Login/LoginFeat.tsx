import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Input,
  InputBox,
  Label,
  LargeButton,
  _emoji,
} from '../../shared/CommonStyle';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';

// 타입 지정
interface LoginInput {
  email?: string;
  password?: string;
}

// 스타일 지정
const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  transform: translateY(50%);
`;

const ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 12px;
  padding-top: 2px;
`;

// 유효성 검사 schema
const schema = z.object({
  email: z.string().email({ message: '이메일을 올바르게 입력해주세요' }),

  password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
});

// RegisterForm
function LoginForm() {
  const navigate = useNavigate();
  const myNickname = localStorage.getItem('nickname');
  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit 이벤트 시 호출
    watch,
    formState: { errors }, // 폼 상태 객체 (그 안에 에러 객체)
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'gogil@navdfe.com',
      password: '1234',
    },
  });

  const onValid = async (data: LoginInput) => {
    console.log('onValid', data);
    //여기에 회원가입 axios 작성

    try {
      const response = await axios.post(
        `http://52.79.228.200:8080/login/post`,
        {
          mail: data.email,
          password: data.password,
        },
      );
      localStorage.setItem('accessToken', response.data.accessToken);

      const cookie = await axios.get(`http://52.79.228.200:8080/cookie`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
        },
      });

      localStorage.setItem('nickname', cookie.data.value);
      alert('로그인 완료');
      navigate(`/user/starwrite/categoryview/${cookie.data.value}`);
    } catch (error) {
      alert('로그인 실패');
      console.error(error);
    }
  };

  //  유효성 검사 error 확인 함수
  //   const onInValid = (err: any) => {
  //     console.log(typeof err);
  //     console.log('onInValid', err);
  //   };
  // 이모지 표시 함수 수정
  const Emoji = (fieldName: keyof LoginInput) => {
    if (watch(fieldName) && !errors[fieldName]) {
      return '✅';
    }
    if (errors[fieldName]) {
      return '❌';
    }
    return '';
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    if (code) {
      sendCodeToBackend(code);
    }
    // 이 부분은 Google 로그인 후 리다이렉션된 URL에 'code' 파라미터가 있는 경우에만 실행됩니다.
  }, []);

  const sendCodeToBackend = async (code) => {
    console.log('code > ', code);
    try {
      // 백엔드에 code를 전송하는 로직...
      const response = await axios.post(
        'http://52.79.228.200:8080/login/oauth',
        { code },
      );
      console.log(
        'Authorization code sent to backend. Response:',
        response.data,
      );
      // 백엔드 응답에 따라 추가적인 처리...
    } catch (error) {
      console.error('Error sending authorization code to backend:', error);
    }
  };

  async function handleGoogleLogin() {
    try {
      // 백엔드에서 Google 로그인 URL을 가져옵니다.
      const response = await axios.post(
        'http://52.79.228.200:8080/login/api/v1/oauth2/google',
      );
      const googleLoginUrl = response.data;
      console.log(`<>>>>>>>>>>>>>>>,${googleLoginUrl}`);

      // 사용자를 Google 로그인 페이지로 리다이렉트합니다.
      window.location.href = googleLoginUrl;
    } catch (error) {
      console.error('Google 로그인 URL 가져오기 실패:', error);
    }
  }

  // window.onload = extractCodeFromUrl;

  // async function handleGoogleData() {
  //   try {
  //     const response = await axios.post(
  //       `http://52.79.228.200:8080/login/oauth2/code/google`,
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const handleSuccess = async (credentialResponse) => {
  //   console.log(credentialResponse);
  //   try {
  //     // credential이 존재하는지 확인합니다.
  //     if (credentialResponse.credential) {
  //       // JWT 토큰 디코드
  //       const decodedToken = jwtDecode(credentialResponse.credential);
  //       console.log('>>>>>>>>', decodedToken);

  //       // 서버에 POST 요청 보내기
  //       const response = await axios.post(
  //         'http://localhost:8080/login/oauth/google/post',
  //         {
  //           access_token: credentialResponse.credential,
  //           decodedToken: decodedToken,
  //         },
  //       );

  //       // 서버 응답 처리
  //       console.log(response);
  //     } else {
  //       console.log('No credentials returned from Google');
  //     }
  //   } catch (error) {
  //     console.error('Login Failed', error);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <RegisterBox>
          <InputBox>
            <Label>E-MAIL</Label>
            <Input
              {...register('email', {
                onChange: async () => await trigger('email'),
              })}
            ></Input>
            <_emoji>{Emoji('email')}</_emoji>
            {errors.email && typeof errors.email.message === 'string' && (
              <ErrorMsg>{errors.email.message}</ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>비밀번호</Label>

            <Input
              type="password"
              {...register('password', {
                onChange: async () => await trigger('password'),
              })}
            ></Input>
            <_emoji>{Emoji('password')}</_emoji>
            {errors.password && typeof errors.password.message === 'string' && (
              <ErrorMsg>{errors.password.message}</ErrorMsg>
            )}
          </InputBox>

          <LargeButton type="submit">로그인</LargeButton>
          {/* <LargeButton onClick={handleTempLogin}>임시 로그인</LargeButton> */}
        </RegisterBox>
        {/* <GoogleOAuthProvider clientId="547835898042-k7ltqkia6kdspu0fjenn79jaenbrj6nj.apps.googleusercontent.com">
          <GoogleLogin
            // /login/oauth/google/post
            onSuccess={handleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </GoogleOAuthProvider> */}
      </form>
      <LargeButton onClick={handleGoogleLogin}>구글 로그인</LargeButton>
      {/* <LargeButton onClick={extractCodeFromUrl}>테스트 </LargeButton> */}
    </>
  );
}

export default LoginForm;
