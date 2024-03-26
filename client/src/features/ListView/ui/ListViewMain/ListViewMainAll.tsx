import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import { Link, useParams } from 'react-router-dom';
import { postListAllApi } from '../../api/PostApi';
import { _listBox, _postBox } from '../style';
import { Posts } from '../../../../shared/model';

function ListViewMainAll() {
  const { nickname, category } = useParams();
  console.log('params', nickname, category);
  const [postsList, setPostsList] = useState<Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string>();

  useEffect(() => {
    if (category == 'all') {
      setCategoryName('전체');
      const promise = postListAllApi(nickname);
      promise
        .then((Posts) => {
          console.log('Posts', Posts);
          if (Posts) {
            setPostsList(Posts);
          } else {
            setPostsList([]);
            console.log('데이터에 categoryPosts 없음');
          }
        })
        .catch(() => {
          setPostsList([]);
        });
    }
  }, [category, nickname]);

  if (postsList[0]) {
    if (categoryName === '전체') {
      return (
        <>
          <ListHeaderEnt categoryName={categoryName} category={category} />
          {!(postsList?.length === 0) &&
            postsList?.map((post, idx) => {
              return (
                <div key={idx}>
                  <Link
                    to={`/user/starwrite/listview/main/${nickname}/${category}/${post.postIdentifier}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <_postBox>
                      <h1>{post.postTitle}</h1>
                      <p>{post.content}</p>
                    </_postBox>
                  </Link>
                </div>
              );
            })}
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
  }
}

export default ListViewMainAll;
