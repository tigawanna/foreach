import React from 'react'
import { Outlet} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { User } from '../../utils/types/types';

interface AuthLayoutProps {
    user?: User | null
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({user}) => {
    // const navigate = useNavigate()
    // // console.log("user ===",user)
    // React.useEffect(() => {
    //     if (user) {
    //         if (user?.email && (user?.bio === "" || user?.avatar === "")) {
    //             navigate('/profile')
    //         }
    //         else {
    //             navigate('/')
    //         }
    //     }

    // }, [user])


return (
<div className='w-full h-full'>
   <Outlet />
</div>
);
}
