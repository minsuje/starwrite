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
  });

  const onValid = (data: LoginInput) => {
    console.log('onValid', data);
    //여기에 회원가입 axios 작성
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

  async function handleTempLogin() {
    try {
      const response = await axios.post(
        `http://52.79.228.200:8080/login/post`,
        {
          mail: 'gogil@navdfe.com',
          password: '1234',
        },
      );
      console.log(response.data);
      localStorage.setItem('accessToken', response.data.accessToken);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        {/* <RegisterBox>
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
          </InputBox> */}

        <LargeButton type="submit">로그인</LargeButton>
        <LargeButton onClick={handleTempLogin}>임시 로그인</LargeButton>
        {/* </RegisterBox> */}
      </form>
    </>
  );
}

export default LoginForm;
