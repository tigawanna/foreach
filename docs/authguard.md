# AUTH guarding

after we authenticate we might want to guard certain routes and redirect to the login page if not authenticated

the most common way to do it is 

```ts
import { Navigate } from 'react-router-dom';

export const ProtectedRoute = ({ user,children }) => {
  if (!user) {
   return <Navigate to="/login" replace />;
    }
  return children;
  };

```

and wrap the children like this
```ts
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute user={user}>
                  <Home user={user} />
                </ProtectedRoute>
              }
            />
            </Routes>
```

but with the react-router v6+ routes can be nested inside layouts which unlocks new patterns like this 

```ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

export const useAuthGuard = (user:PBUser,test_mode:boolean) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.email && !test_mode) {
            navigate("/auth");
        }
    }, [user?.email]);
};
```
and use it in the main layout or layout for whichever route you want to guard

```ts
import { Outlet} from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';
import { useAuthGuard } from './../../shared/hooks/useAuthGuard';

interface RootLayoutProps {
  user: PBUser;
  test_mode: boolean;
}

export const RootLayout = ({user,test_mode}: RootLayoutProps) => {

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

```
