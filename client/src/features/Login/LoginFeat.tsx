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
  // react-hook-form
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

  async function handleGoogleLogin() {
    try {
      const response = await axios.post(
        `http://52.79.228.200:8080/login/oauth2/code/google`,
      );
    } catch (error) {
      console.error(error);
    }
  }

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
          <LargeButton onClick={handleGoogleLogin}>구글 로그인</LargeButton>
        </RegisterBox>
      </form>
    </>
  );
}

export default LoginForm;
