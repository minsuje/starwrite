import { useEffect, useState } from 'react';
import { _NewCommentBox } from '../ui/style';
import { newCommentApi } from '../api/CommentApi';
import { MyBlock } from '../model/type';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../shared/model';
import { commentState, commentStateActions } from '../model/CommentSlice';
import { _ErrorMsg } from '../../../shared/CommonStyle';

function NewComment({ selectedLine }: { selectedLine: MyBlock | undefined }) {
  // const [text, setText] = useState<string>();
  const [selectedId, setSelected] = useState<string>();
  const { postId } = useParams();

  const schema = z.object({
    content: z.string().min(1, { message: '댓글 내용을 입력해주세요' }),
  });

  const dispatch = useAppDispatch();
  const reset = useAppSelector(commentState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onValid = async (comment: { content?: string }) => {
    //console.log('data', comment);
    if (comment.content) {
      const data = {
        annotation: {
          position: selectedId,
          content: comment.content,
          type: 'comment',
        },
        postId: Number(postId),
      };
      await newCommentApi(data);
      dispatch(commentStateActions.reset(!reset));
    } else {
      alert('오류가 발생했습니다. 다시 시도해주세요');
    }
  };

  useEffect(() => {
    // for문으로 검사
    if (selectedLine && selectedLine.content) {
      // setText(selectedLine.content[0]?.text);
      setSelected(selectedLine.id);
    } else {
      setSelected('none');
      // setText('선택된 내용 없음');
    }
  }, [selectedLine, selectedId]);
  return (
    <>
      <_NewCommentBox>
        <form onSubmit={handleSubmit(onValid)}>
          <h1>댓글 </h1>
          <div>
            <textarea
              placeholder="댓글을 입력하세요"
              {...register('content')}
              style={{ padding: '10px' }}
            />
            <button type="submit">작성</button>
          </div>
          {errors.content && typeof errors.content.message === 'string' ? (
            <_ErrorMsg>{errors.content.message}</_ErrorMsg>
          ) : (
            <div></div>
          )}
        </form>
      </_NewCommentBox>
    </>
  );
}

export default NewComment;
