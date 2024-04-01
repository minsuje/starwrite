import { Outlet, createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register/RegisterPage';
import ListView from '../pages/ListView/ListViewPage';
import { NodeViewPage } from '../pages/NodeView/NodeViewPage';
import { HeaderWid } from '../widgets/header/index';
import { CategoryViewPage } from '../pages/CartegoryView/CategoryViewPage';
import { ListDetailFeat, ListViewMainEnt } from '../features/ListView';
import NewPostPage from '../pages/NewPost/NewPostPage';
import LoginPage from '../pages/Login/LoginPage';
import { MyPage } from '../pages/MyPage/MyPage';
import { MainPage } from '../pages/Main/Main';
import Chatbot from '../widgets/Chat/Chatbot';
import styled from 'styled-components';
// import { GoogleOAuth } from '../features/Login/google';
// import { InterGratedSearchpage } from '../pages/IntergatedSerach/InterGratedSearchpage';
import { Page404Error } from '../shared/404';

const _Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 auto;
  /* padding: 0 40px; */
  /* margin-top: 40px; */
  padding-top: 90px;
  align-items: center;
  max-width: 880px;
  /* height: calc(100vh); */
`;

export const AppRouter = createBrowserRouter([
  {
    element: (
      <>
        {/* <HeaderWid /> */}
        <Chatbot />
        <_Container>
          <Outlet />
        </_Container>
      </>
    ),
    children: [
      // 렌딩 페이지
      {
        path: '/',
        element: (
          <>
            <HeaderWid />
            <MainPage></MainPage>
          </>
        ),
      },
      // 로그인 페이지
      {
        path: '/login',
        element: (
          <>
            <LoginPage />
          </>
        ),
      },
      // 회원가입 페이지
      {
        path: '/register',
        element: (
          <>
            <RegisterPage />
          </>
        ),
      },
      {
        path: '/user/starwrite',
        element: (
          <>
            <HeaderWid />
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'mypage/:nickname/',
            element: (
              <>
                <MyPage></MyPage>
              </>
            ),
          },
          // 카테고리 페이지
          {
            path: 'categoryview/:nickname',
            element: (
              <>
                <CategoryViewPage></CategoryViewPage>
              </>
            ),
          },
          // 노드 뷰 페이지
          {
            path: 'nodeview/:nickname/:category',
            element: (
              <>
                <NodeViewPage></NodeViewPage>
              </>
            ),
          },
          // 글쓰기 페이지
          {
            path: 'writenewpost',
            element: (
              <>
                <NewPostPage />
              </>
            ),
            children: [
              {
                path: ':postId',
                element: (
                  <>
                    <NewPostPage />
                  </>
                ),
              },
            ],
          },

          // 리스트뷰 메인 페이지
          {
            path: 'listview/main/:nickname/:category',
            element: (
              <>
                <ListView />
              </>
            ),
            children: [
              {
                path: '',
                element: (
                  <>
                    <ListViewMainEnt></ListViewMainEnt>
                  </>
                ),
              },
              {
                path: ':postId',
                element: (
                  <>
                    <ListDetailFeat />
                  </>
                ),
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: (
          <>
            <Page404Error></Page404Error>
          </>
        ),
      },
    ],
  },
]);
