import { useEffect, useState } from 'react';
import { ListHeaderEnt } from '../..';
import { useParams } from 'react-router-dom';
import {
  postListApi,
  postListAllApi,
  postListScrapApi,
} from '../../api/PostApi';
import { Posts, useAppSelector } from '../../../../shared/model';
import { resetState } from '../../model/StateSlice';
import ListViewAllFeat from './ListViewAllFeat';
import ListViewScrapFeat from './ListViewScrapFeat';
import ListViewSelectFeat from './ListViewSelectFeat';

function ListViewMainEnt() {
  const { nickname, category } = useParams();
  const [postsList, setPostsList] = useState<Posts[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const reset = useAppSelector(resetState);

  useEffect(() => {
    setPostsList([]);

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

  if (categoryName === '전체') {
    return (
      <>
        <ListHeaderEnt categoryName={categoryName} category={category} />
        <ListViewAllFeat postListAll={postsList}></ListViewAllFeat>
      </>
    );
  } else if (categoryName === '스크랩') {
    return (
      <>
        <ListHeaderEnt categoryName={categoryName} category={category} />
        <ListViewScrapFeat postListScrap={postsList}></ListViewScrapFeat>
      </>
    );
  } else {
    return (
      <>
        <ListHeaderEnt categoryName={categoryName} category={category} />
        <ListViewSelectFeat postListSelect={postsList}></ListViewSelectFeat>
      </>
    );
  }
}

export default ListViewMainEnt;
