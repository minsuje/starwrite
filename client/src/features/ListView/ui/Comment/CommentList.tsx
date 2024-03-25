import NewComment from '../../lib/newComment';
import Comment from './Comment';

function CommentList({ selectedLine }) {
  return (
    <>
      <NewComment selectedLine={selectedLine} />
      <Comment></Comment>
    </>
  );
}

export default CommentList;
