import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import { Link, useParams } from 'react-router-dom';
import {
  postListApi,
  postListAllApi,
  postListScrapApi,
} from '../../api/PostApi';
import { _listBox, _postBox } from '../style';
import { Posts, useAppSelector } from '../../../../shared/model';
import Badge from '../../../../shared/Badge';
import { resetState } from '../../model/StateSlice';

function ListViewMainEnt() {
  const { nickname, category } = useParams();
  const [postsList, setPostsList] = useState<Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const reset = useAppSelector(resetState);

  useEffect(() => {
    if (category == 'all') {
      setCategoryName('전체');
      const promise = postListAllApi(nickname);
      promise
        .then((Posts) => {
          console.log('Posts>>>>>>', Posts);
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
    } else if (category == 'scrab') {
      setCategoryName('스크랩');
      const promise = postListScrapApi(nickname);
      promise
        .then((Posts) => {
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
    } else {
      const promise = postListApi(category);
      promise.then((Posts) => {
        if (Posts.categoryPosts) {
          setPostsList(Posts.categoryPosts);
        } else {
          setPostsList([]);
          console.log('데이터에 categoryPosts 없음');
        }
        if (Posts.categoryName) {
          setCategoryName(Posts.categoryName);
        } else {
          setCategoryName('찾을 수 없음');
          console.log('데이터에 categoryName 없음');
        }
      });
    }
  }, [category, nickname, reset]);

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
                        <h1>
                          {post.title}
                          {post.nickname !== nickname &&
                            post.nickname !== null && <Badge>스크랩</Badge>}
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
        </>
      );
    } else if (categoryName === '전체' || categoryName === '스크랩') {
      if (postsList[0]) {
        return (
          <>
            <ListHeaderEnt categoryName={categoryName} category={category} />
            <_listBox>
              {!(postsList?.length === 0) &&
                postsList?.map((post, idx) => {
                  return (
                    <div key={idx}>
                      <Link
                        to={`/user/starwrite/listview/main/${nickname}/${category}/${post.postIdentifier}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <_postBox>
                          <h1>
                            {post.postTitle}
                            {(categoryName === '스크랩' || post.scrap) && (
                              <Badge>스크랩</Badge>
                            )}
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
