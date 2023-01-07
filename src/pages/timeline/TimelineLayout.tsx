import React from 'react'
import { Outlet } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

interface TimelineLayoutProps {
user:PBUser
}

export const TimelineLayout: React.FC<TimelineLayoutProps> = ({user}) => {
return (
 <div className='w-full h-full'>
  <Outlet/>
 </div>
);
}
