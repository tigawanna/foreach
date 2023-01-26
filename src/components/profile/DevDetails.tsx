import React, { useState } from 'react'
import { PBUser } from '../../utils/types/types';
import dayjs  from 'dayjs';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { ProfileForm } from './ProfileForm';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { FaPlus,FaRegEdit } from 'react-icons/fa';

interface DevDetailsProps {
user:PBUser

}

export const DevDetails = ({user}:DevDetailsProps) => {
const [isOpen, setIsOpen] = useState(false);



return (
 <div className='h-full w-full flex items-center justify-center'>
 <div className='w-fit min-w-[50%] h-full flex flex-col items-center justify-center gap-1
   rounded-lg'>

    <div className="  flex justify-center items-center w-[200px]  aspect-square m-2 ">
      <img
        src={user?.avatar}
        alt={""}
        className="rounded-full  w-full
        border-2 border-slate-900 dark:border-slate-100 aspect-square"
        />
    </div>
    
    <div className='h-full  flex flex-col items-center justify-center text-sm p-2'>
        <div className='w-full flex items-center justify-center  text-bold text-lg'>{user?.displayname}</div>
        <div className='w-full flex items-center justify-center text-bold '>@{user?.username}</div>
        <div className='w-full flex items-center justify-center '>email {user?.email}</div>
        <div className='w-full flex items-center justify-center'>
          Joined : {dayjs(user?.created).format('DD-MMM-YYYY')}</div>
        <div className='w-fit flex-center rounded-full aspect-square  m-1'>
          <TheIcon Icon={FaRegEdit} size={'20'} iconAction={() => setIsOpen(true)} />
        </div>
    </div>

 </div>




    <ReactModalWrapper
      child={
        <div
          // onClick={(event) => event.stopPropagation()}
          className='z-50'>
          <ProfileForm
            user={user}
            setIsOpen={setIsOpen}
      
            label='post'
          />
        </div>
      }
      closeModal={() => setIsOpen(false)}
      delay={0}
      isOpen={isOpen}

      styles={{
        overlay_top: '0%',
        overlay_right: '0%',
        overlay_left: '0%',
        overlay_bottom: '0%',
        content_bottom: '2%',
        content_right: '2%',
        content_left: '2%',
        content_top: '2%',


      }} />




 </div>
);
}
