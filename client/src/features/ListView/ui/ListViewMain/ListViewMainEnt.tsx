import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import styled from 'styled-components';
import { Posts } from '../../../../shared/types/app';
import { PostList } from '../../model/listViewData';

const _listBox = styled.div`
  overflow: auto;
  height: 90%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const _postBox = styled.div`
  padding: 25px 20px;
  background-color: #343434;
  display: flex;
  flex-direction: column;
  gap: 20px;
  h1 {
    font-size: 20px;
    color: #dfdfdf;
  }
  p {
    font-size: 13px;
    color: #9f9d9d;
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
              <_postBox key={idx}>
                <h1>제목</h1>
                <p>{post.content}</p>
              </_postBox>
            );
          })}
      </_listBox>
    </>
  );
}

export default ListViewMainEnt;
