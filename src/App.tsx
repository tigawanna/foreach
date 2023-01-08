import './App.css';
import { RouterProvider } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryStateWrapper } from './shared/wrappers/QueryStateWrapper';
import { LoaderElipse } from './shared/loaders/Loaders';
import { appRoutes } from './routes';
import { getUser } from './utils/pb/config';

function App() {
  const query = useQuery(['user'], getUser);
  const user = query.data;
  // console.log('user , ', user);

  // const router = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <RootLayout user={user} test_mode />,
  //     // loader:userLoader(queryClient),
  //     errorElement: <ReactRouterError />,
  //     children: [
  //       { index: true, element: <WelcomePage user={user} /> },

  //       {
  //         path: '/auth',
  //         element: <AuthLayout user={user} />,
  //         children: [
  //           {
  //             index: true,
  //             element: <Login />,
  //             // loader: deferredBlogPostsLoader,
  //           },
  //           {
  //             path: '/auth/signup',
  //             element: <Signup />,
  //             // loader: blogPostLoader,
  //           },
  //         ],
  //       },
  //       {
  //         path: '/redirect',
  //         element: <Redirect />,
  //       },
  //       {
  //         path: '/profile',
  //         element: <ProfileLayout user={user} />,
  //         children: [
  //           {
  //             index: true,
  //             element: <Profile user={user} />,
  //             // loader: deferredBlogPostsLoader,
  //           },
  //         ],
  //       },

  //       {
  //         path: '/test',
  //         element: <TestLayout user={user} />,
  //         children: [
  //           {
  //             index: true,
  //             element: <Test user={user} />,
  //             // loader: deferredBlogPostsLoader,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  return (
    <QueryStateWrapper query={query} loader={<LoaderElipse />}>
      <div className=" dark:bg-slate-900 h-full dark:text-white dark:shadow-white">
      <RouterProvider router={appRoutes(user)} />
      </div>
    </QueryStateWrapper>
  );
}

export default App;
