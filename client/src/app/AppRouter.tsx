import { Outlet, createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register/RegisterPage';

import NodeViewPage from '../pages/NodeView/ui/NodeViewPage/NodeViewPage';
import ListView from '../pages/ListView/ListViewPage';
import { Header } from '../widgets/header/HeaderWid';
import { ListViewMainEnt } from '../features/ListView';
import NewPostPage from '../pages/NewPost/NewPostPage';

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
            <div>로그인페이지인디요 ?</div>
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
        path: '/starwrite',
        element: (
          <>
            <Header />
            <Outlet />
          </>
        ),
        children: [
          {
            path: 'mypage/:userid_num',
            element: (
              <>
                <div>마이페이지인디요 ?</div>
              </>
            ),
          },
          // 카테고리 페이지
          {
            path: 'categoryview/:userid_num',
            element: (
              <>
                <div>카테고리 뷰인디요 ?</div>
              </>
            ),
          },
          // 노드 뷰 페이지
          {
            path: 'nodeview/:userid_num/:category',
            element: (
              <>
                <NodeViewPage></NodeViewPage>
                <div></div>
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
            path: 'listview',
            element: (
              <>
                <ListView />
              </>
            ),
            children: [
              {
                path: 'main/:category',
                element: (
                  <>
                    <ListViewMainEnt></ListViewMainEnt>
                  </>
                ),
              },
              {
                path: 'detail/:postId',
                element: (
                  <>
                    <div>글 하나 상세 조회</div>
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
