import styled from 'styled-components';

const _CommentBox = styled.div`
  width: 100%;
  border-radius: 2px;
`;

const _CommentNickname = styled.div`
  font-size: 12px;
`;

const _CommentContent = styled.div`
  font-size: 18px;
`;

function Comment({ content, nickName }: { content: string; nickName: string }) {
  return (
    <>
      <_CommentBox>
        <_CommentContent>{content}</_CommentContent>
        <_CommentNickname>{nickName}</_CommentNickname>
      </_CommentBox>
    </>
  );
}

export default Comment;
