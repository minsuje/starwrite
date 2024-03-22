import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import { Link, useParams } from 'react-router-dom';
import { Posts } from '../../../../shared/types/app';
import { postListApi, postListAllApi } from '../../api/PostApi';
import { _listBox, _postBox } from '../style';

function ListViewMainEnt() {
  const { nickname, category } = useParams();
  console.log('category params', category);
  // 글 리스트
  const [postsList, setPostsList] = useState<Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string>();

  useEffect(() => {
    if (category == 'all') {
      setCategoryName('전체');
      const promise = postListAllApi(nickname);
      promise
        .then((Posts) => {
          setPostsList(Posts.categoryPosts);
        })
        .catch(() => {
          setPostsList([]);
        });
    } else if (category == 'scrab') {
      setCategoryName('스크랩');
      const promise = postListAllApi('all');
      promise
        .then((Posts) => {
          setPostsList(Posts.categoryPosts);
        })
        .catch(() => {
          setPostsList([]);
        });
    } else {
      const promise = postListApi(category);
      promise.then((Posts) => {
        setPostsList(Posts.categoryPosts);
        setCategoryName(Posts.categoryName);
      });
    }
  }, [category, nickname]);
  if (postsList[0]) {
    if (postsList[0].title) {
      return (
        <>
          <ListHeaderEnt categoryName={categoryName} category={category} />
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
    } else {
      return (
        <>
          <ListHeaderEnt categoryName={categoryName} category={category} />
          <_listBox style={{ textAlign: 'center', paddingTop: '20px' }}>
            등록된 글이 없습니다.
          </_listBox>
        </>
      );
    }
  } else {
    return (
      <>
        <ListHeaderEnt categoryName={categoryName} category={category} />
        <_listBox style={{ textAlign: 'center', paddingTop: '20px' }}>
          등록된 글이 없습니다.
        </_listBox>
      </>
    );
  }
}

export default ListViewMainEnt;
