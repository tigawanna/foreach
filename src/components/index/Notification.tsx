
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { LocalState} from '../../utils/zustand/store';
import { FaTimes } from 'react-icons/fa'

interface NotificationProps {
    store: LocalState
}

export const Notification = ({store}:NotificationProps) => {
    const notification = store.localValues?.notifocation
return (
 <div className='w-[40%]  h-full '>
   <div className="w-full  flex  flex-col items-center justify-center">
            {notification?.type=== "success"?(
                <div className=" w-[90%] line-clamp-3 p-2 bg-green-100 border-2 border-green-800
                         text-green-900  rounded-xl animate-in fade-in zoom-in">
                 {notification.message}
                </div>
            ) : null}
            {notification?.type === "error" ? (
                <div className="w-[90%] flex  flex-col items-center justify-center">
                <div className=" w-full line-clamp-4 p-2 bg-red-100 border-2 border-red-800
                         text-red-900  rounded-xl animate-in fade-in zoom-in">
                 {notification.message}
                </div>
                <div className='w-full h-full'>
                    <TheIcon Icon={FaTimes} iconAction={()=>store.clearNotification()}/>
                </div>
                </div>
            ) : null}
        </div>
 </div>
);
}



