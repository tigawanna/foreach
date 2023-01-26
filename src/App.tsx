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

      <RouterProvider router={appRoutes(user)} />

   
      </div>
       <div className='w-full fixed bottom-3 flex items-center justify-center'>
          <Notification/>
       </div>
    </QueryStateWrapper>

  );
}

export default App;



