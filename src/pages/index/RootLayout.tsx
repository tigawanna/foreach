import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';
import { useAuthGuard } from './../../shared/hooks/useAuthGuard';

interface RootLayoutProps {
  user: PBUser;
  test_mode: boolean;
}

export const RootLayout = ({user,test_mode}: RootLayoutProps) => {
  // const navigate = useNavigate();
  // React.useEffect(() => {
  //   if (!user?.email && !test_mode) {
  //     navigate('/auth');
  //   }
  // }, [user?.email]);
  useAuthGuard(user,test_mode)

  return (
    <div className="w-full h-full dark:bg-slate-900">
      <div
        className="h-14 w-full  bg-slate-700 dark:bg-slate-800
          bg-opacity-30 dark:bg-opacity-90 max-h-[50px] p-1
         sticky top-0 z-40"
      >
        <Toolbar user={user} />
      </div>
      <main className=" w-full h-[90%] fixed top-12 overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};
