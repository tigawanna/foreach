import './App.css';
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { QueryStateWrapper } from './shared/wrappers/QueryStateWrapper';
import { LoaderElipse } from './shared/loaders/Loaders';
import { appRoutes } from './routes';
import { getUser } from './utils/pb/config';
import { Notification } from './components/index/Notification';
import { AuthLayout } from './pages/auth/AuthLayout';
import { Login } from './pages/auth/Login';
import { RootLayout } from './pages/index/RootLayout';
import { Redirect } from './components/auth/Redirect';
import { TestLayout } from './components/test/TestLayout';
import { Post } from './pages/post/Post';
import { PostLayout } from './pages/post/PostLayout';
import { Profile } from './pages/profile/Profile';
import { ProfileLayout } from './pages/profile/ProfileLayout';
import { Timeline } from './pages/timeline/Timeline';
import { Test } from './components/test/Test';



function App() {


const query = useQuery(['user'], getUser);

   const user = query.data;
   const test_mode =false
    // //no-console("notification in App === ",notificationSignal.value.message)
   return (

    <QueryStateWrapper query={query} loader={<LoaderElipse />}>
      
      <div className=" dark:bg-slate-900 h-full dark:text-white dark:shadow-white">
{/* 
      <RouterProvider router={appRoutes(user)} /> */}
            <BrowserRouter >
               <Routes >

                  <Route path="/" element={<RootLayout user={user} test_mode={test_mode} />}>
                     <Route index element={<Timeline user={user} profile='general' />} />
                  </Route>


                     {/* auth routes */}
                     <Route path="/auth" element={<AuthLayout user={user} />}>
                     <Route index element={<Login user={user} />} />
                     <Route path="/auth/redirect" element={<Redirect/>} />
                  </Route>

                  {/* post route  */}
                  <Route path="/post" element={<PostLayout user={user} />}>
                     <Route path=":id" element={<Post user={user} />} />
                  </Route>

                  {/* profile route  */}
                  <Route path="/profile" element={<ProfileLayout user={user} />}>
                     <Route path=":id" element={<Profile user={user} />} />
                  </Route>

                  <Route path="/test" element={<TestLayout user={user}  />}>
                     <Route index element={<Test user={user} />} />
                  </Route>

               </Routes>
            </BrowserRouter>
   
      </div>
       <div className='w-full fixed bottom-3 flex items-center justify-center'>
          <Notification/>
       </div>
    </QueryStateWrapper>

  );
}

export default App;



{/* <RootLayout user={user} test_mode={test_mode}>
   <Switch>

      <Route path="/" exact >
         <TimelineLayout user={user}>
            <Route path="/" exact>
               <Timeline user={user} profile="general" />
            </Route>
         </TimelineLayout>
      </Route>

      <Route path="/post">
         <PostLayout user={user}>
            <Route path="/post/:id" exact>
               <Post user={user} />
            </Route>
         </PostLayout>
      </Route>

      <Route path="/auth">
         <AuthLayout user={user}>
            <Route path="/auth" exact>
               <Login />
            </Route>
            <Route path="/auth/signup" exact>
               <Signup />
            </Route>
            <Route path="/auth/redirect" exact>
               <Redirect />
            </Route>
         </AuthLayout>
      </Route>
      <Route path="/profile">
         <ProfileLayout user={user}>
            <Route path="/profile/:id" exact>
               <Profile user={user} />
            </Route>
         </ProfileLayout>
      </Route>
      <Route path="/test">
         <TestLayout user={user}>
            <Route path="/test" exact>
               <Test user={user} />
            </Route>
         </TestLayout>
      </Route>
      <Route>
         <ReactRouterError />
      </Route>
   </Switch>
</RootLayout> */}
