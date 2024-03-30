import { Link, useParams } from 'react-router-dom';
import { _listBox, _postBox, _NoneList } from '../style';
import { Posts } from '../../../../shared/model';
import Badge from '../../../../shared/Badge';
// postList = {
//   categoryId,
//   categoryName,
//   content,
//   createdAt,
//   img,
//   originAuthor,
//   originAuthorId,
//   postIdentifier,
//   postTitle,
//   reventView,
//   updatedAt,
//   userId,
//   userNickname,
//   visible,
// };

function ListViewScrapFeat({ postListScrap }: { postListScrap: Posts[] }) {
  const { nickname, category } = useParams();
  if (postListScrap.length !== 0) {
    return (
      <div>
        <_listBox>
          {!(postListScrap?.length === 0) &&
            postListScrap?.map((post, idx) => {
              return (
                <div key={idx}>
                  <Link
                    to={`/user/starwrite/listview/main/${nickname}/${category}/${post.postIdentifier}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <_postBox>
                      <h1>
                        {post.postTitle}
                        <Badge>스크랩</Badge>
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

export default ListViewScrapFeat;
