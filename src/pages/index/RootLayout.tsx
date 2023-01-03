
import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';



interface RootLayoutProps {
user : PBUser
test_mode:boolean
}

export const RootLayout: React.FC<RootLayoutProps> = ({user,test_mode}) => {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!user?.email&&!test_mode) {
            navigate('/auth')
        }
    }, [user?.email])

return (
    <div className='w-full h-screen max-h-screen dark:bg-slate-900'>
        <div className='h-14 w-full  bg-slate-700 dark:bg-slate-800  
          bg-opacity-30 dark:bg-opacity-90 max-h-[50px] p-1
         sticky top-0 z-40'>
            <Toolbar user={user} />
        </div>
        <main className=' w-full h-full fixed top-12'>
            <Outlet />
        </main>
    </div>
);
}
