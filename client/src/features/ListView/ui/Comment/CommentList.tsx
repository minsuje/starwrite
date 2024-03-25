import NewComment from '../../lib/newComment';
import { MyBlock } from '../../model/type';
import Comment from './Comment';

function CommentList({ selectedLine }: { selectedLine: MyBlock }) {
  return (
    <>
      <NewComment selectedLine={selectedLine} />
      <Comment></Comment>
    </>
  );
}

export default CommentList;
