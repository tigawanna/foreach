import React from 'react'
import { Outlet } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
import { useAuthGuard } from '../../utils/hooks/useAuthGuard';

interface TimelineLayoutProps {
user:PBUser
}

export const TimelineLayout = ( {user}: TimelineLayoutProps) => {
    useAuthGuard(user,false)
return (
 <div className='w-full h-fit'>
  <Outlet/>
 </div>
);
}
