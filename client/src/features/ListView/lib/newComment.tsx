import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { newCommentApi } from '../api/CommentApi';
import { MyBlock } from '../model/type';

const _NewCommentBox = styled.div`
  width: 100%;
  border: 1px solid var(--color-zinc-100);
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  input {
    width: 60%;
  }
`;

function NewComment({ selectedLine }: { selectedLine: MyBlock | undefined }) {
  // 새 댓글 작성 함수
  function postComment() {
    newCommentApi;
  }

  const [text, setText] = useState<string>();
  useEffect(() => {
    // for문으로 검사
    if (selectedLine && selectedLine.content) {
      setText('나중에 수정');
      console.log('text', selectedLine.content);
    } else {
      setText('선택된 내용 없음');
    }
  }, [selectedLine]);
  return (
    <>
      <_NewCommentBox>
        <div>댓글 작성</div>
        <div>{text}</div>
        <div>
          <input />
          <button onClick={postComment}>작성</button>
        </div>
      </_NewCommentBox>
    </>
  );
}

export default NewComment;
