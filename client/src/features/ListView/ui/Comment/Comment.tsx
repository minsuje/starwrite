import styled from 'styled-components';
import { Annotation } from '../../../../shared/model/types';

const _CommentBox = styled.div`
  width: 90%;
  height: 5rem;
  border: 1px solid var(--color-zinc-700);
  margin-bottom: 10px;
  border-radius: 7px;
  background-color: var(--color-zinc-800);
  padding: 10px;
  overflow-x: hidden;
`;

const _CommentNickname = styled.div`
  font-size: 1rem;
  line-height: 1.5rem;
  color: var(--color-zinc-500);
`;

const _CommentContent = styled.div`
  font-size: 1.3rem;
  color: var(--color-zinc-200);
`;

function Comment({ annotation }: { annotation: Annotation }) {
  // const myNickname = localStorage.getItem('nickname');
  console.log('annotation', annotation);
  return (
    <>
      <_CommentBox>
        <_CommentContent>{annotation.content}</_CommentContent>
        <_CommentNickname> {annotation.nickName}</_CommentNickname>
      </_CommentBox>
    </>
  );
}

export default Comment;
