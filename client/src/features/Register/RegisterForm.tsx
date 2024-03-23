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
import axios from 'axios';
import { useState } from 'react';

// 타입 지정
interface RegisteringUser {
  email?: string;
  nickname?: string;
  role?: string;
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
    role: z.string().optional().default('USER'),
    password: passwordSchema,
    checkPW: passwordSchema,
  })
  .refine((data) => data.password === data.checkPW, {
    path: ['checkPW'],
    message: '비밀번호가 일치하지 않습니다.',
  });

// RegisterForm
function RegisterForm() {
  const [authCode, setAuthCode] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // react-hook-form
  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit 이벤트 시 호출
    watch,
    formState: { errors }, // 폼 상태 객체 (그 안에 에러 객체)
    trigger,
    getValues,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // 입력값이 변경될때마다 실시간으로 유효성 검사 (react hook form)
    defaultValues: {
      role: 'USER', // 기본값으로 'USER' 설정
    },
  });

  const onValid = async (data: RegisteringUser) => {
    try {
      // 회원가입 요청 전송
      const response = await axios.post(
        `http://localhost:8080/register/user`,
        data,
      );

      // 성공 응답 처리
      if (response.status === 200) {
        // 여기에 성공 시 로직 추가 (예: 로그인 페이지로 리다이렉트)
        console.log('회원가입 성공:', response.data);
      }
    } catch (error) {
      // 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        // 서버에서 받은 에러 메시지 출력
        console.log('회원가입 실패:', error.response.data);
      } else {
        // 기타 에러 처리
        console.log('에러:', error);
      }
    }
  };

  const checkValidEmail = async (mail: string) => {
    setIsSendingEmail(true);
    try {
      // 이메일 유효성 검사 요청 전송
      const response = await axios.post(`http://localhost:8080/mail/send`, {
        mail,
      });

      // 성공 응답 처리
      if (response.status === 200) {
        console.log('이메일 유효성 검사 성공:', response.data);
        // 추가적인 성공 로직 (예: 메시지 표시 등)
      }
    } catch (error) {
      // 에러 처리
      if (axios.isAxiosError(error) && error.response) {
        // 중복된 이메일 에러 감지
        if (error.response.data.fail === 'duplicated Email') {
          console.log('중복된 이메일입니다.');
          // 추가적인 중복 이메일 처리 로직 (예: 사용자에게 알림 등)
        } else {
          // 다른 서버 에러 메시지 처리
          console.log('이메일 유효성 검사 실패:', error.response.data);
        }
      } else {
        // 기타 에러 처리
        console.log('에러:', error);
      }
    }
    setIsSendingEmail(false);
  };

  // 인증 코드 검증 함수
  const checkAuthCode = async () => {
    try {
      // 서버에 인증 코드 검증 요청
      const response = await axios.get(
        `http://localhost:8080/mail/check?userNumber=${authCode}`,
      );

      // 인증 성공 처리
      if (response.status === 200) {
        console.log('인증 성공:', response.data);
        setIsEmailVerified(true); // 인증 상태 업데이트
        // 추가적인 성공 로직 (예: 회원가입 버튼 활성화)
      }
    } catch (error) {
      // 인증 실패 처리
      if (axios.isAxiosError(error) && error.response) {
        console.log('인증 실패:', error.response.data);
      } else {
        console.log('에러:', error);
      }
    }
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
            <_registerbtn
              bgcolor="#1361d7"
              type="button"
              onClick={() => checkValidEmail(getValues('email'))}
            >
              인증 메일 보내기
            </_registerbtn>
            {isSendingEmail && <span>전송중...</span>}
            {errors.email && typeof errors.email.message === 'string' && (
              <_ErrorMsg>{errors.email.message}</_ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>인증 번호 입력</Label>
            <Input onChange={(e) => setAuthCode(e.target.value)}></Input>
            <_registerbtn bgcolor="#1361d7" onClick={checkAuthCode}>
              인증하기
            </_registerbtn>
          </InputBox>

          <InputBox>
            <Label>
              닉네임
              <_emoji>{Emoji('nickname')}</_emoji>
            </Label>
            <Input
              disabled={!isEmailVerified}
              {...register('nickname', {
                onChange: async () => await trigger('nickname'),
              })}
            ></Input>
            <_registerbtn bgcolor="#1361d7" type="button">
              중복확인
            </_registerbtn>

            {errors.nickname && typeof errors.nickname.message === 'string' && (
              <_ErrorMsg>{errors.nickname.message}</_ErrorMsg>
            )}
          </InputBox>

          <InputBox>
            <Label>
              비밀번호<_emoji>{Emoji('password')}</_emoji>
            </Label>
            <Input
              disabled={!isEmailVerified}
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
              disabled={!isEmailVerified}
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
