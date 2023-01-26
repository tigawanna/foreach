import React from 'react'
import { Outlet } from 'react-router-dom';

interface TestLayoutProps {
    user:any
}

export const TestLayout = ({user}: TestLayoutProps) => {
return (
 <div className='w-full h-full  '>
  <Outlet/>
 </div>
);
}
