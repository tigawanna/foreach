import React from 'react'
import { Hero } from '../../components/index/Hero';
import { Navigate, useNavigate } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
interface WelcomePageProps {
user?:PBUser
}

export const WelcomePage: React.FC<WelcomePageProps> = ({user}) => {
    // const navigate = useNavigate()
    // React.useEffect(() => {
    //     if (user?.email) {
    //         navigate('/')
    //     }
    // }, [user])

return (
    <div className='w-full h-full flex flex-col justify-start items center dark:bg-slate-900'>

        <Hero />

    </div>
);
}
