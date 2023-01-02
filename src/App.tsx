import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RootLayout } from './pages/index/RootLayout';
import { WelcomePage } from './pages/index/WelcomePage';
import { TestLayout } from './components/test/TestLayout';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Test } from './components/test/Test';
import { QueryStateWrapper,LoadingElipse } from '@denniskinuthia/tiny-pkgs';
import { useQuery } from '@tanstack/react-query';
import { ReactRouterError } from './shared/ReactRouterError';
import { getUser } from './utils/pb/config';
import { Redirect } from './components/auth/Redirect';

function App() {

   const user = useQuery(['user'],getUser)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout user={user} test_mode={true} />,
      // loader:userLoader(queryClient),
      errorElement: <ReactRouterError/>,
      children: [
        { index: true, element: <WelcomePage user={user} /> },

        {
          path: '/auth',
          element: <AuthLayout user={user} />,
          children: [
            {
              index: true,
              element: <Login />,
              // loader: deferredBlogPostsLoader,
            },
            {
              path: '/auth/signup',
              element: <Signup />,
              // loader: blogPostLoader,
            },
          ],
        },
         {
          path: '/redirect',
          element: <Redirect/>,
         },

        {
          path: '/test',
          element: <TestLayout user={user} />,
          children: [
            {
              index: true,
              element: <Test user={user} />,
              // loader: deferredBlogPostsLoader,
            },

          ],
        },

      ],
    },

  ]);


  return (
    <QueryStateWrapper
    // @ts-ignore
      query={user}
      loader={<LoadingElipse />}
    >
      <div className=" dark:bg-slate-900 h-full max-h-screen
       dark:text-white dark:shadow-white">
        <RouterProvider router={router} />
      </div>
    </QueryStateWrapper>
  )
}

export default App
