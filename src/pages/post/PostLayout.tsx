import React from 'react'
import { Outlet } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

interface PostLayoutProps {
user:PBUser
}

export const PostLayout = ({}:PostLayoutProps) => {
return (
 <div className='w-full h-full'>
        <Outlet />
 </div>
);
}
