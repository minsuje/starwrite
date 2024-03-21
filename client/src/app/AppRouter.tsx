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
import { Spinner } from '../shared/spinner';
import { DataSpinnerSh } from '../shared/DataSpinner';
import { MainPage } from '../pages/Main/Main';
import { GoogleOAuth } from '../features/Login/google';

export const AppRouter = createBrowserRouter([
  {
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
            path: 'listview/main/:category',
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
        element: <GoogleOAuth></GoogleOAuth>,
      },
    ],
  },
]);
