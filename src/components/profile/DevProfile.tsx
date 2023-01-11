import React from 'react'
import { PBUser } from '../../utils/types/types';

interface DevDetailsProps {
user:PBUser
}

export const DevDetails = ({user}:DevDetailsProps) => {

return (
 <div className='h-full w-full flex-center-col'>
 <div className='w-full h-full flex-col'>

    <div className="  rounded-md  flex justify-center items-center w-[200px]  aspect-square m-2">
      <img
        src={user?.avatar}
        alt={""}
        className="rounded-[7%]  w-full
        border-2 border-slate-900 dark:border-slate-100 aspect-square"
        />
    </div>
    
    <div className='w-full h-full flex-col'>
        <div className='w-full h-full flex-col'>@{user?.username}</div>
        <div className='w-full h-full flex-col'>email {user?.email}</div>
        <div className='w-full h-full flex-col'>since {user?.created}</div>
    </div>

 </div>
 </div>
);
}
