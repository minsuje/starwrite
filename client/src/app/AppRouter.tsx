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

export const AppRouter = createBrowserRouter([
  {
    children: [
      // 렌딩 페이지
      {
        path: '/',
        element: (
          <>
            <div>렌딩페이지인디요 ?</div>
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
        path: '/:user/starwrite',
        element: (
          <>
            <HeaderWid />
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'mypage/:userid_num/',
            element: (
              <>
                <MyPage></MyPage>
              </>
            ),
          },
          // 카테고리 페이지
          {
            path: 'categoryview/:userid_num',
            element: (
              <>
                <CategoryViewPage></CategoryViewPage>
              </>
            ),
          },
          // 노드 뷰 페이지
          {
            path: 'nodeview/:userid_num/:category',
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
        element: <p>404에러페이지인디요?</p>,
      },
    ],
  },
]);
