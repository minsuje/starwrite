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
  // 여기서 재렌더링 값 변할 떄 마다  리스트 가져와서 setState 변경

  console.log(annotations);
  return (
    <>
      <NewComment selectedLine={selectedLine} />
      {annotations.map((annotation) => {
        return (
          <Comment
            key={annotation.annotationId}
            content={annotation.content}
            nickName={annotation.nickName}
          ></Comment>
        );
      })}
    </>
  );
}

export default CommentList;
