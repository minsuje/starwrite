import { Outlet, createBrowserRouter } from 'react-router-dom';
import RegisterPage from '../pages/Register/RegisterPage';

import NodeViewPage from '../pages/NodeView/ui/NodeViewPage/NodeViewPage';
import ListView from '../pages/ListView/ListViewPage';

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
            <div> 헤더</div>
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
            path: 'wirtenewpost/',
            element: (
              <>
                <div>글쓰기페이진디유? ?</div>
              </>
            ),
          },
          // 리스트뷰 메인 페이지
          {
            path: 'listview/:userid_num',
            element: (
              <>
                <ListView content="main" />
              </>
            ),
          },
          // 하나의 글 페이지
          {
            path: 'listviewdetail/:post_id',
            element: (
              <>
                <div>하나의 글 페이진디유?</div>
              </>
            ),
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
