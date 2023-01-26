import { Outlet } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';



interface RootLayoutProps {
  user: PBUser;
 
}

export const RootLayout = ({user}: RootLayoutProps) => {

  return (
    <div className="w-full h-full dark:bg-slate-900">
 
      <div
        className="h-14 w-full  bg-slate-500 dark:bg-slate-700
         bg-opacity-70 dark:bg-opacity-90 max-h-[50px] p-1 
         sticky top-0 z-40 text-white"
      >
        <Toolbar user={user} />
      </div>
      <main className=" w-full sticky mt-2 top-12 overflow-y-scroll scroll-bar">
        <Outlet />
        {/* <button
          onClick={() => goToTop()}
          className='w-full p-6 rounded-xl bg-red-700'>go to top </button> */}
      </main>

    </div>
  );
};
