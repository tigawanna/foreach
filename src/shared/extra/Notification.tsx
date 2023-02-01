
import { TheIcon } from '../wrappers/TheIcon';
import { FaTimes } from 'react-icons/fa'
import { useStroreValues } from '../../utils/zustand/store';

interface NotificationProps {
}

export const Notification = ({}:NotificationProps) => {
    const store = useStroreValues()
    const notification = store.localValues?.notifocation

 if (!store.localValues.hasNotification ){
    return null
 }  

return (
 <div className='w-[40%]  h-full '>
        <div className="w-full  flex  flex-col items-center justify-center 
        animate-in fade-in slide-in-from-right 
     
        ">
            {notification?.type=== "success"?(
                <div className=" w-[90%] line-clamp-3 p-2 bg-green-100 border-2 border-green-800
                         text-green-900  rounded-xl 
                       
                         ">
                 {notification.message}
                </div>
            ) : null}
            {notification?.type === "error" ? (
                <div className="w-[90%] flex  items-center justify-center
                bg-red-100 border-2 border-red-800 text-red-900  rounded-xl 
                ">
                <div className=" w-full line-clamp-4 p-2 ">
                 {notification.message}
                </div>
                <div className='h-full p-3 text-white'>
                    <TheIcon Icon={FaTimes} iconAction={()=>store.clearNotification()}/>
                </div>
                </div>
            ) : null}
        </div>
 </div>
);
}



