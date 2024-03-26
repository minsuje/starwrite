import styled from 'styled-components';

const CommentBox = styled.div`
  width: 100%;
  background-color: var(--color-zinc-800);
`;

function Comment({ content, nickName }: { content: string; nickName: string }) {
  return (
    <>
      <CommentBox>
        <div>{nickName}</div>
        <div>{content}</div>
        <div>작성 날짜</div>
      </CommentBox>
    </>
  );
}

export default Comment;
