import styled from 'styled-components';

const CommentBox = styled.div`
  width: 100%;
  background-color: var(--color-zinc-800);
`;

function Comment() {
  return (
    <>
      <CommentBox>
        <div>닉네임</div>
        <div>댓글 내용</div>
      </CommentBox>
      <CommentBox>
        <div>닉네임</div>
        <div>댓글 내용</div>
      </CommentBox>
      <CommentBox>
        <div>닉네임</div>
        <div>댓글 내용</div>
      </CommentBox>
    </>
  );
}

export default Comment;
