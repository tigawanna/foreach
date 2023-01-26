import React, { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
import { useAuthGuard } from '../../utils/hooks/useAuthGuard';

interface TimelineLayoutProps {
user:PBUser
}

export const TimelineLayout = ( {user}: TimelineLayoutProps) => {
    const params = useParams()

    useAuthGuard(user,false)


return (
 <div className='w-full h-fit'>
  <Outlet/>

 </div>
);
}
