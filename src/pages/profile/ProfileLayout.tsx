import React from 'react'
import { Outlet } from 'react-router-dom';

interface ProfileLayoutProps {

}

export const ProfileLayout: React.FC<ProfileLayoutProps> = ({}) => {
return (
    <div className='w-full h-full'>
        <Outlet />
    </div>
);
}
