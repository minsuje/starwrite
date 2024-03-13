import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import styled from 'styled-components';
import { Posts } from '../../../../shared/types/app';
import { PostList } from '../../model/listViewData';
import { Link } from 'react-router-dom';

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
  // 글 리스트
  const [postsList, setPostsList] = useState<Posts[]>();
  useEffect(() => {
    setPostsList(PostList);
  }, []);

  return (
    <>
      <ListHeaderEnt />
      <_listBox>
        {!(postsList?.length === 0) &&
          postsList?.map((post, idx) => {
            return (
              <div key={idx}>
                <Link
                  to={`/starwrite/listview/detail/${post.id}`}
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
