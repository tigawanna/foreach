import React from 'react'
import { Outlet } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

interface ProfileLayoutProps {
user:PBUser
}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({}) => {
return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
);
}
