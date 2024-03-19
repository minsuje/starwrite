import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Input,
  InputBox,
  Label,
  LargeButton,
  _emoji,
  _RegisterBox,
  _ErrorMsg,
  _registerbtn,
} from '../../shared/CommonStyle';

// 타입 지정
interface RegisteringUser {
  email?: string;
  nickname?: string;
  password?: string;
  checkPW?: string;
}
// 닉네임 유효성 검사
const NicNamePattern = /^[가-힣A-Za-z0-9_]{2,10}$/;

const nicknameSchema = z
  .string()
  .min(4, { message: '닉네임은 최소 4글자 이상 10자 이하여야 합니다.' })
  .max(10, { message: '닉네임은 최소 4글자 이상 10자 이하여야 합니다.' })
  .regex(NicNamePattern, {
    message: '닉네임은 한글, 영문, 밑줄(_)만 사용할 수 있습니다.',
  });

// 패스워드 유효성 검사
const passwordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

const passwordSchema = z
  .string()
  .min(8, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  })
  .max(15, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  })
  .regex(passwordPattern, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  });

// 유효성 검사 schema
const schema = z
  .object({
    email: z.string().email({ message: '이메일을 올바르게 입력해주세요.' }),
    nickname: nicknameSchema,
    password: passwordSchema,
    checkPW: passwordSchema,
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
        <_RegisterBox>
          <InputBox>
            <Label>
              E-MAIL
              <_emoji>{Emoji('email')}</_emoji>
            </Label>
            <Input
              {...register('email', {
                onChange: async () => await trigger('email'),
              })}
            ></Input>
            <_registerbtn bgcolor="#1361d7">중복확인</_registerbtn>

            {errors.email && typeof errors.email.message === 'string' && (
              <_ErrorMsg>{errors.email.message}</_ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>
              닉네임
              <_emoji>{Emoji('nickname')}</_emoji>
            </Label>
            <Input
              {...register('nickname', {
                onChange: async () => await trigger('nickname'),
              })}
            ></Input>
            <_registerbtn bgcolor="#1361d7">중복확인</_registerbtn>

            {errors.nickname && typeof errors.nickname.message === 'string' && (
              <_ErrorMsg>{errors.nickname.message}</_ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>
              비밀번호<_emoji>{Emoji('password')}</_emoji>
            </Label>
            <Input
              {...register('password', {
                onChange: async () => await trigger('password'),
              })}
            ></Input>

            {errors.password && typeof errors.password.message === 'string' && (
              <_ErrorMsg>{errors.password.message}</_ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>
              비밀번호 확인
              <_emoji>{Emoji('checkPW')}</_emoji>
            </Label>
            <Input
              {...register('checkPW', {
                onChange: async () => await trigger('checkPW'),
              })}
            ></Input>

            {errors.checkPW && typeof errors.checkPW.message === 'string' && (
              <_ErrorMsg>{errors.checkPW.message}</_ErrorMsg>
            )}
          </InputBox>

          <LargeButton type="submit">회원가입</LargeButton>
        </_RegisterBox>
      </form>
    </>
  );
}

export default RegisterForm;
