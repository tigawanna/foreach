import React from 'react'
import { PBUser } from '../../utils/types/types';
import relativeTime from  'dayjs/plugin/relativeTime'
import dayjs  from 'dayjs';

interface DevDetailsProps {
user:PBUser
}

export const DevDetails = ({user}:DevDetailsProps) => {

  dayjs.extend(relativeTime)
return (
 <div className='h-full w-full flex-center-col'>
 <div className='w-full h-full flex-center'>

    <div className="  rounded-md  flex justify-center items-center w-[150px]  aspect-square m-2">
      <img
        src={user?.avatar}
        alt={""}
        className="rounded-[7%]  w-full
        border-2 border-slate-900 dark:border-slate-100 aspect-square"
        />
    </div>
    
    <div className='h-full flex flex-col items-start justify-center'>
        <div className='w-full flex-start  text-bold text-lg'>{user?.displayname}</div>
        <div className='w-full flex-start text-bold'>@{user?.username}</div>
        <div className='w-full flex-start'>email {user?.email}</div>
        <div className='w-full flex-start'>Joined {dayjs().to(dayjs(user?.created))}</div>
    </div>

 </div>
 </div>
);
}
