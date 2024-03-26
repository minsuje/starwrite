import { Annotation } from '../../../../shared/model/types';
import NewComment from '../../lib/newComment';
import { MyBlock } from '../../model/type';
import Comment from './Comment';

function CommentList({
  selectedLine,
  annotations,
}: {
  selectedLine: MyBlock;
  annotations: Annotation[];
}) {
  console.log(annotations);
  return (
    <>
      <NewComment selectedLine={selectedLine} />
      <Comment
        content={annotations[0].content}
        nickName={annotations[0].nickName}
      ></Comment>
    </>
  );
}

export default CommentList;
