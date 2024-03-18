import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Label,
  Input,
  _emoji,
  _ErrorMsg,
  InputBox,
  _registerbtn,
} from '../../shared/CommonStyle';
import { ProfileShard } from '../../shared/Profile';
import './mypage.css';
import { styled } from 'styled-components';

interface RegisteringUser {
  email?: string;
  nickname?: string;
  qurrentPassword?: string;
  newPassword?: string;
  checkPassword?: string;
}

const _emaliinput = styled.input`
  height: 30px;
  width: 100%;
  max-width: 300px;
  background-color: #616161;
  border: none;
  color: #ffffff;
  opacity: 0.6;
  border-radius: 3px;
  display: inline;
  &::placeholder {
    color: #ffffff; /* 이 부분을 수정 */
  }
`;

const _InputFileButton = styled.label`
  padding: 6px 25px;
  background-color: #464647;
  color: #c0c0c0;
  cursor: pointer;
  position: absolute;
  right: 110px;
  // label이 inline 요소이기 때문에, 필요에 따라 display 값을 조정할 수 있습니다.
`;
const _OverlapCheckBox = styled.label`
  display: flex;
`;

// 닉네임 유효성 검사
const NicNamePattern = /^[가-힣A-Za-z_]{2,10}$/;

const nicknameSchema = z
  .string()
  .min(4, { message: '닉네임은 최소 4글자 이상 10자 이하여야 합니다.' })
  .max(10, { message: '닉네임은 최소 4글자 이상 10자 이하여야 합니다.' })
  .regex(NicNamePattern, {
    message: '닉네임은 한글, 영문, 밑줄(_)만 사용할 수 있습니다.',
  });

// 패스워드 유효성 검사
const NewpasswordPattern =
  /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;

const NewpasswordSchema = z
  .string()
  .min(8, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  })
  .max(15, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  })
  .regex(NewpasswordPattern, {
    message:
      '비밀번호는 영문/숫자/특수문자 조합으로 8자리 이상 15자리 이하입니다',
  });

const schema = z
  .object({
    nickname: nicknameSchema,
    qurrentPassword: z
      .string()
      .min(1, { message: '기존 비밀번호가 일치하지 않습니다.' }),
    newPassword: NewpasswordSchema,
    checkPassword: z
      .string()
      .min(1, { message: '비밀번호를 다시 입력해주세요' }),
  })
  .refine((data) => data.newPassword === data.checkPassword, {
    path: ['checkPassword'],
    message: '새 비밀번호와 일치하지 않습니다.',
  })
  .refine((data) => data.qurrentPassword !== data.newPassword, {
    path: ['newPassword'],
    message: '현재 비밀번호와 새 비밀번호는 같을 수 없습니다.',
  });

export function MyPgaeFeat() {
  const test = '222@naver.com'; // 이메일 예시데이터

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const changeValid = (data: RegisteringUser) => {
    console.log('changeValid', data);
    //여기에 마이페이지 axios 작성
  };

  // const onInvalid = (data: RegisteringUser) => {
  //   console.log('통과 못한 data', data);
  // };
  // 이모지 표시 함수
  const Emoji = (fieldName: keyof RegisteringUser) => {
    if (watch(fieldName) && !errors[fieldName]) {
      return '✅';
    }
    if (errors[fieldName]) {
      return '❌';
    }
    return '';
  };

  return (
    <>
      <form onSubmit={handleSubmit(changeValid)}>
        <InputBox>
          <Label>프로필 사진</Label>
          <ProfileShard />
          <_InputFileButton>
            업로드
            <input
              type="file"
              id="input-file"
              style={{ display: 'none' }}
            ></input>
          </_InputFileButton>
        </InputBox>

        <InputBox>
          <Label>이메일</Label>
          <_emaliinput placeholder={`${test}`} disabled></_emaliinput>
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
          <InputBox>
            <_registerbtn bgcolor="#1361d7">중복확인</_registerbtn>
          </InputBox>

          {errors.nickname && typeof errors.nickname.message === 'string' && (
            <_ErrorMsg>{errors.nickname.message}</_ErrorMsg>
          )}
        </InputBox>

        <InputBox>
          <Label>
            기존 비밀번호
            <_emoji>{Emoji('qurrentPassword')}</_emoji>
          </Label>
          <Input
            {...register('qurrentPassword', {
              onChange: async () => await trigger('qurrentPassword'),
            })}
          ></Input>

          {errors.qurrentPassword &&
            typeof errors.qurrentPassword.message === 'string' && (
              <_ErrorMsg>{errors.qurrentPassword.message}</_ErrorMsg>
            )}
        </InputBox>

        <InputBox>
          <Label>
            새 비밀번호
            <_emoji>{Emoji('newPassword')}</_emoji>
          </Label>
          <Input
            {...register('newPassword', {
              onChange: async () => await trigger('newPassword'),
            })}
          ></Input>

          {errors.newPassword &&
            typeof errors.newPassword.message === 'string' && (
              <_ErrorMsg>{errors.newPassword.message}</_ErrorMsg>
            )}
        </InputBox>

        <InputBox>
          <Label>
            변경 비밀번호 확인
            <_emoji>{Emoji('checkPassword')}</_emoji>
          </Label>
          <Input
            {...register('checkPassword', {
              onChange: async () => await trigger('checkPassword'),
            })}
          ></Input>

          {errors.checkPassword &&
            typeof errors.checkPassword.message === 'string' && (
              <_ErrorMsg>{errors.checkPassword.message}</_ErrorMsg>
            )}
        </InputBox>
        <button type="submit">회원가입</button>
      </form>
    </>
  );
}