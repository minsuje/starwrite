import styled from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
import { z } from 'zod';
import { newCategoryApi } from '../api/CategoryApi';

type closeModal = () => void;

// style 정의
const _Box = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  color: #adadad;
  input {
    background-color: #3b3d41;
    border: none;
    padding: 10px;
  }
  label {
    font-size: 20px;
  }
`;

const _ErrorMsg = styled.p`
  color: #ffafaf;
  font-size: 10px;
  padding-top: 0px;
`;

const _ButtonBox = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 9px;
`;

const _Button = styled.button`
  flex-grow: 1;
  padding: 8px 0;
  color: white;
  border: none;
  border-radius: 4px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }

  background-color: ${(props) => props.color || '#1361D7'};
`;

// 유효성 검사 schema
const schema = z.object({
  category: z
    .string()
    .min(1, { message: '1자 이상 입력해주세요' })
    .max(10, { message: '10자 이내로 작성해주세요' }),
});

function AddCategory({ onclick }: { onclick: closeModal }) {
  // react-hook-form
  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit 이벤트 시 호출
    formState: { errors }, // 폼 상태 객체 (그 안에 에러 객체)
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onValid = (data: { category?: string }) => {
    console.log('onValid', data);
    if (data.category) {
      newCategoryApi(data.category);
    }

    //여기에  axios 작성
  };

  return (
    <>
      <_ModalBg>
        <_Modal>
          <_Box onSubmit={handleSubmit(onValid)}>
            <label htmlFor="newCategory">카테고리 추가</label>
            <input placeholder="카테고리 명" {...register('category')}></input>
            {errors.category && typeof errors.category.message === 'string' ? (
              <_ErrorMsg>{errors.category.message}</_ErrorMsg>
            ) : (
              <_ErrorMsg></_ErrorMsg>
            )}

            <_ButtonBox>
              <_Button type="submit">추가</_Button>

              <_Button
                color="#ffffff1d"
                onClick={() => {
                  onclick();
                }}
              >
                취소
              </_Button>
            </_ButtonBox>
          </_Box>
        </_Modal>
      </_ModalBg>
    </>
  );
}

export default AddCategory;
