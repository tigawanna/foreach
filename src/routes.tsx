import { BrowserRouter, Route, Routes, createBrowserRouter} from 'react-router-dom';
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

import { Post } from './pages/post/Post';
import { PostLayout } from './pages/post/PostLayout';


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
                element:<Timeline user={user} profile='general'/>
              }
            ]
            },
            {
              path: '/post',
              element: <PostLayout user={user} />,
              children: [
                {
                  path: ':id',
                  element: <Post user={user} />,
                  
                  // loader: deferredBlogPostsLoader,
                },
              ],
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
                {
                  path: '/auth/redirect',
                  element: <Redirect />,
                }
              ],
            },
   
            {
              path: '/profile',
              element: <ProfileLayout user={user} />,
              children: [
                {
                 path:':id',
                  element: <Profile user={user} />,
     
                },
              ],
            }
            ,

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


// const oldRoutesWithBrowserRouter=(user:PBUser)=>{
//   return (
//     <BrowserRouter >
//       <Routes >

//         <Route path="/" element={<RootLayout user={user} test_mode={false} />}>
//           <Route index element={<Timeline user={user} profile='general' />} />
//         </Route>


//         {/* auth routes */}
//         <Route path="/auth" element={<AuthLayout user={user} />}>
//           <Route index element={<Login user={user} />} />
//           <Route path="/auth/redirect" element={<Redirect />} />
//         </Route>

//         {/* post route  */}
//         <Route path="/post" element={<PostLayout user={user} />}>
//           <Route path=":id" element={<Post user={user} />} />
//         </Route>

//         {/* profile route  */}
//         <Route path="/profile" element={<ProfileLayout user={user} />}>
//           <Route path=":id" element={<Profile user={user} />} />
//         </Route>

//         <Route path="/test" element={<TestLayout user={user} />}>
//           <Route index element={<Test user={user} />} />
//         </Route>

//       </Routes>
//     </BrowserRouter>
//   )
// }
