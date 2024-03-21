import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import { Link, useParams } from 'react-router-dom';
import { Posts } from '../../../../shared/types/app';
import { postListApi } from '../../api/PostApi';
import { _listBox, _postBox } from '../style';

function ListViewMainEnt() {
  const { nickname, category } = useParams();
  console.log('category params', category);
  // 글 리스트
  const [postsList, setPostsList] = useState<Posts[]>();
  const [categoryName, setCategoryName] = useState<string>();

  useEffect(() => {
    const promise = postListApi(category);
    promise.then((Posts) => {
      setPostsList(Posts.categoryPosts);
      setCategoryName(Posts.categoryName);
    });
  }, [category]);

  return (
    <>
      <ListHeaderEnt category={categoryName} />
      <_listBox>
        {!(postsList?.length === 0) &&
          postsList?.map((post, idx) => {
            return (
              <div key={idx}>
                <Link
                  to={`/user/starwrite/listview/main/${nickname}/${category}/${post.postId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <_postBox>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                  </_postBox>
                </Link>
              </div>
            );
          })}
      </_listBox>
    </>
  );
}

export default ListViewMainEnt;
