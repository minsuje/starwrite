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
import { useEffect, useState } from 'react';
import { baseApi } from '../../shared/api/BaseApi';

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

// 닉네임 유효성 검사
const NicNamePattern = /^[가-힣A-Za-z0-9_]{2,10}$/;

const nicknameSchema = z
  .string()
  .min(2, { message: '닉네임은 최소 2글자 이상 10자 이하여야 합니다.' })
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
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [nicknameAvailabilityMessage, setNicknameAvailabilityMessage] =
    useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [isNicknameTouched, setIsNicknameTouched] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      nickname: nickname,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await baseApi.get(`mypage`);
        setEmail(response.data.mail);

        // Use reset to set the default values
        reset({
          nickname: response.data.nickname,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reset]);

  let errorMessage = '';
  if (errors.nickname && isNicknameTouched) {
    errorMessage = errors.nickname.message;
  } else if (isNicknameTouched && !isNicknameChecked) {
    errorMessage = '중복 검사를 해주세요';
  } else if (nicknameAvailabilityMessage) {
    errorMessage = nicknameAvailabilityMessage;
  }

  const isNicknameInvalid = !!errors.nickname;

  const handleNicknameChange = async () => {
    setIsNicknameTouched(true);
    setIsNicknameChecked(false);
    await trigger('nickname');
  };

  const changeValid = async (data: RegisteringUser) => {
    console.log('changeValid', data);
    try {
      // 서버로 요청을 보냅니다. 여기서는 POST 요청을 예시로 들었습니다.
      // URL과 요청 본문은 실제 서버 API에 맞게 수정해야 합니다.
      const response = await baseApi.patch('/mypage', {
        nickname: data.nickname,
        originPassword: data.qurrentPassword,
        newPassword: data.newPassword,
      });

      // 응답 처리
      console.log('Response:', response.data);
      alert('회원정보 수정 완료');
      // 여기서는 응답에 따른 사용자 인터페이스 업데이트나 경고 메시지 표시 등의 처리를 추가할 수 있습니다.
    } catch (error) {
      // 오류 처리
      console.error('Error updating user info:', error);
      // 사용자에게 오류 메시지를 표시할 수 있습니다.
    }
  };

  const getErrorMessage = () => {
    if (errors.nickname && typeof errors.nickname.message === 'string') {
      return errors.nickname.message;
    }
    if (!nicknameChecked && watch('nickname')) {
      return '중복 검사를 해주세요';
    }
    return nicknameAvailabilityMessage;
  };

  const handleNicknameCheck = async () => {
    const currentNickname = watch('nickname');
    try {
      const response = await baseApi.post(
        `mypage/nickCheck?nickname=${currentNickname}`,
      );
      setIsNicknameChecked(true);
      console.log(response.data);
      if (response.data === 'no change') {
        setNicknameAvailabilityMessage('현재 사용중인 닉네임입니다');
      } else if (response.data === 'unavailable') {
        setNicknameAvailabilityMessage('이미 사용중인 닉네임입니다.');
      } else if (response.data === 'available') {
        setNicknameAvailabilityMessage('사용 가능한 닉네임입니다.');
      }
    } catch (error) {
      console.error('Error checking nickname:', error);
      setNicknameAvailabilityMessage('닉네임 검사 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (name === 'nickname' && type === 'change') {
        setNicknameChecked(false);
        setNicknameAvailabilityMessage('');
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleDeleteAccount = async () => {
    try {
      const response = await baseApi.delete('/mypage');
      localStorage.removeItem('nickname');
      localStorage.removeItem('accessToken');
      console.log(response.data);
      alert('회원 탈퇴 완료');
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('회원 탈퇴에 실패했습니다.');
    }
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
          <_emaliinput
            placeholder="이메일"
            value={email} // Set the value to the state variable
            disabled
          ></_emaliinput>
        </InputBox>

        <InputBox>
          <Label>
            닉네임
            <_emoji>{Emoji('nickname')}</_emoji>
          </Label>
          <Input
            {...register('nickname', {
              onChange: handleNicknameChange,
            })}
          ></Input>
          <InputBox>
            <_registerbtn
              type="button"
              bgcolor="#1361d7"
              onClick={handleNicknameCheck}
              disabled={isNicknameInvalid} // Disable button if nickname is invalid
            >
              중복확인
            </_registerbtn>
          </InputBox>
          {errorMessage && <_ErrorMsg>{errorMessage}</_ErrorMsg>}
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
        <button type="submit">회원 정보 수정</button>
      </form>
      <button type="button" onClick={handleDeleteAccount}>
        회원 탈퇴
      </button>
    </>
  );
}
