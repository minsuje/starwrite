import { Link, useParams } from 'react-router-dom';
import { _listBox, _postBox, _NoneList } from '../style';
import { Posts } from '../../../../shared/model';
import Badge from '../../../../shared/Badge';

// postList = {
//     content,
//     createdAt,
//     nickname,
//     postId,
//     reventView,
//     title,
//     updatedAt,
//     userId,
//     visible
// }

function ListViewSelectFeat({ postListSelect }: { postListSelect: Posts[] }) {
  const { nickname, category } = useParams();

  if (postListSelect[0] && postListSelect[0].postId) {
    return (
      <div>
        <_listBox>
          {!(postListSelect?.length === 0) &&
            postListSelect?.map((post, idx) => {
              return (
                <div key={idx}>
                  <Link
                    to={`/user/starwrite/listview/main/${nickname}/${category}/${post.postId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <_postBox>
                      <h1>
                        {post.title}
                        {post.nickname !== null && <Badge>스크랩</Badge>}
                        {post.visible === 'false' ? (
                          <Badge>비공개</Badge>
                        ) : (
                          <Badge>공개</Badge>
                        )}
                      </h1>
                      <p>{post.content}</p>
                    </_postBox>
                  </Link>
                </div>
              );
            })}
        </_listBox>
      </div>
    );
  } else {
    return (
      <>
        <_NoneList>글이 없습니다. </_NoneList>
      </>
    );
  }
}

export default ListViewSelectFeat;
