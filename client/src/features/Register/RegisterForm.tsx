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

// 타입 지정
interface RegisteringUser {
  email?: string;
  nickname?: string;
  password?: string;
  checkPW?: string;
}

// 스타일 지정
const RegisterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  transform: translateY(50%);
`;

const ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 12px;
  padding-top: 2px;
`;

// 유효성 검사 schema
const schema = z
  .object({
    email: z.string().email({ message: '이메일을 올바르게 입력해주세요.' }),
    nickname: z.string().min(1, { message: '닉네임을 입력해주세요' }),
    password: z.string().min(1, { message: '비밀번호를 입력해주세요' }),
    checkPW: z.string().min(1, { message: '비밀번호를 다시 입력해주세요' }),
  })
  .refine((data) => data.password === data.checkPW, {
    path: ['checkPW'],
    message: '비밀번호가 일치하지 않습니다.',
  });

// RegisterForm
function RegisterForm() {
  // react-hook-form
  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit 이벤트 시 호출
    watch,
    formState: { errors }, // 폼 상태 객체 (그 안에 에러 객체)
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // 입력값이 변경될때마다 실시간으로 유효성 검사 (react hook form)
  });

  const onValid = (data: RegisteringUser) => {
    console.log('onValid', data);
    //여기에 회원가입 axios 작성
  };

  // 이모지 표시 함수 수정
  const Emoji = (fieldName: keyof RegisteringUser) => {
    if (watch(fieldName) && !errors[fieldName]) {
      return '✅';
    }
    if (errors[fieldName]) {
      return '❌';
    }
    return '';
  };

  //  유효성 검사 error 확인 함수
  //   const onInValid = (err: any) => {
  //     console.log(typeof err);
  //     console.log('onInValid', err);
  //   };

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
            <Label>닉네임</Label>
            <Input
              {...register('nickname', {
                onChange: async () => await trigger('nickname'),
              })}
            ></Input>
            <_emoji>{Emoji('nickname')}</_emoji>
            {errors.nickname && typeof errors.nickname.message === 'string' && (
              <ErrorMsg>{errors.nickname.message}</ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>비밀번호</Label>
            <Input
              {...register('password', {
                onChange: async () => await trigger('password'),
              })}
            ></Input>
            <_emoji>{Emoji('password')}</_emoji>
            {errors.password && typeof errors.password.message === 'string' && (
              <ErrorMsg>{errors.password.message}</ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>비밀번호 확인</Label>
            <Input
              {...register('checkPW', {
                onChange: async () => await trigger('checkPW'),
              })}
            ></Input>
            <_emoji>{Emoji('checkPW')}</_emoji>
            {errors.checkPW && typeof errors.checkPW.message === 'string' && (
              <ErrorMsg>{errors.checkPW.message}</ErrorMsg>
            )}
          </InputBox>

          <LargeButton type="submit">회원가입</LargeButton>
        </RegisterBox>
      </form>
    </>
  );
}

export default RegisterForm;
