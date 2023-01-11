import { createBrowserRouter} from 'react-router-dom';
import { RootLayout } from './pages/index/RootLayout';
import { TestLayout } from './components/test/TestLayout';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { Test } from './components/test/Test';
import { Redirect } from './components/auth/Redirect';
import { ProfileLayout } from './pages/profile/ProfileLayout';
import { Profile } from './pages/profile/Profile';
import { ReactRouterError } from './shared/errorboundary/ReactRouterError';
import { PBUser } from './utils/types/types';
import { TimelineLayout } from './pages/timeline/TimelineLayout';
import { Timeline } from './pages/timeline/Timeline';


export const appRoutes=(user:PBUser)=>{
  const test_mode = false
   return createBrowserRouter([
        {
          path: '/',
          element: <RootLayout user={user}  test_mode={test_mode}/>,
          // loader:userLoader(queryClient),
          errorElement: <ReactRouterError />,
          children: [
            { 
              element: <TimelineLayout user={user}/>,
              children:[
              {
                index:true,
                element:<Timeline user={user}/>
              }
            ]
            },

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
              element: <Redirect />,
            },
            {
              path: '/profile',
              element: <ProfileLayout user={user} />,
              children: [
                {
                  index: true,
                  element: <Profile user={user} />,
                  // loader: deferredBlogPostsLoader,
                },
              ],
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
}
