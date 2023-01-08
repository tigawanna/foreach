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
   
   return (
    <QueryStateWrapper query={query} loader={<LoaderElipse />}>
      <div className=" dark:bg-slate-900 h-full dark:text-white dark:shadow-white">
      <RouterProvider router={appRoutes(user)} />
      </div>
    </QueryStateWrapper>
  );
}

export default App;
