import { _Box, _ErrorMsg, _ButtonBox, _Button } from '../ui/style';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { _ModalBg, _Modal } from '../../../shared/Modal/ModalStyle';
import { z } from 'zod';
import { newCategoryApi } from '../api/CategoryApi';
import { Category, useAppSelector } from '../../../shared/model';
import { collectCategories } from '../model/CategoriesSlice';
// import { AnimatePresence } from 'framer-motion';

type closeModal = () => void;

function AddCategory({
  onclick,
  setUpdateCategory,
}: {
  onclick: closeModal;
  setUpdateCategory: closeModal;
}) {
  // 유효성 검사 schema
  const schema = z
    .object({
      category: z
        .string()
        .min(1, { message: '1자 이상 입력해주세요' })
        .max(10, { message: '10자 이내로 작성해주세요' }),
    })
    .refine(
      (data) =>
        categories.find(
          (category: Category) => category.name === data.category,
        ) === undefined,
      {
        path: ['category'],
        message: '이미 존재하는 카테고리입니다.',
      },
    );
  // store에서 가져온 카테고리 리스트
  const categories = useAppSelector(collectCategories);

  const {
    register, // input 할당, value 변경 감지
    handleSubmit, // form submit 이벤트 시 호출
    formState: { errors }, // 폼 상태 객체 (그 안에 에러 객체)
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onValid = async (data: { category?: string }) => {
    if (data.category) {
      await newCategoryApi(data.category);
      onclick();
      setUpdateCategory();
    }
  };

  return (
    <_ModalBg
      key="modalBg"
      transition={{ duration: 0.2, ease: 'easeOut' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <_Modal
        key="modal"
        transition={{ duration: 0.2, ease: 'easeOut' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <_Box onSubmit={handleSubmit(onValid)}>
          <label htmlFor="newCategory">카테고리 추가</label>
          <input
            style={{ color: 'var(--color-zinc-100)' }}
            placeholder="카테고리 명"
            {...register('category')}
          ></input>
          {errors.category && typeof errors.category.message === 'string' ? (
            <_ErrorMsg>{errors.category.message}</_ErrorMsg>
          ) : null}
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
  );
}

export default AddCategory;
