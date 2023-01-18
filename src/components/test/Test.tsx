import React from 'react'
import { PBUser } from '../../utils/types/types';
import { useStroreValues } from '../../utils/zustand/store';




interface TestProps {
    user: PBUser
}


export const Test = ({user}: TestProps) => {
 
const store = useStroreValues()
 

return (
  <div className=" w-full  h-full px-2">
    <button
    className='bg-purple-700 p-2'
    onClick={()=>{store.updateNotification({message:"deez",type:"error"}) }}
    >add message</button>
 </div>

);
}



