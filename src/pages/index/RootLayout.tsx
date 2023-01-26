import { Outlet, useLocation } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';
import { useScrollToTop } from '../../shared/extra/useScrollToTop';


interface RootLayoutProps {
  user: PBUser;
  test_mode: boolean;
}

export const RootLayout = ({user,test_mode}: RootLayoutProps) => {
  useScrollToTop()
  // const goToTop = () => {
  //   console.log("window  ==== ", window)

  //   if (typeof window !== 'undefined') {
  //     window.scrollTo({
  //       top: 0,
  //       // behavior: 'smooth',
  //     });
  //   } else {
  //     console.log("window undefind", window)
  //     document.documentElement.scrollTop = 0;
  //   }

  // };
  return (
    <div className="w-full h-full dark:bg-slate-900">
 
      <div
        className="h-14 w-full  bg-slate-700 dark:bg-slate-800
          bg-opacity-30 dark:bg-opacity-90 max-h-[50px] p-1
         sticky top-0 z-40"
      >
        <Toolbar user={user} />
      </div>
      <main className=" w-full h-[90%] fixed top-12 overflow-y-scroll scroll-bar">
        <Outlet />
        {/* <button
          onClick={() => goToTop()}
          className='w-full p-6 rounded-xl bg-red-700'>go to top </button> */}
      </main>

    </div>
  );
};
