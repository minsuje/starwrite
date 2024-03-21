import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import styled from 'styled-components';

import { Link, useParams } from 'react-router-dom';
import { Posts } from '../../../../shared/types/app';
import { postListApi } from '../../api/PostApi';

const _listBox = styled.div`
  overflow: auto;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const _postBox = styled.div`
  padding: 25px 20px;
  background-color: var(--color-zinc-800);
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-decoration: none;
  text-decoration-line: none;
  h1 {
    font-size: 20px;
    color: var(--color-zinc-300);
  }
  p {
    font-size: 13px;
    color: var(--color-zinc-500);
  }
  &:hover {
    opacity: 0.8;
  }
`;

function ListViewMainEnt() {
  const { category } = useParams();
  console.log('category params', category);
  // 글 리스트
  const [postsList, setPostsList] = useState<Posts[]>();
  useEffect(() => {
    const promise = postListApi(category);
    promise.then((Posts) => {
      console.log('PostList data: ', Posts);
      setPostsList(Posts);
    });
  }, [category]);
  console.log(postsList);

  return (
    <>
      <ListHeaderEnt category={category} />
      <_listBox>
        {!(postsList?.length === 0) &&
          postsList?.map((post, idx) => {
            return (
              <div key={idx}>
                <Link
                  to={`/user/starwrite/listview/main/${category}/${post.postId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <_postBox>
                    <h1>제목</h1>
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
