import React from 'react'
import { PBUser } from '../../utils/types/types';
import { BsSunFill,BsFillMoonFill,} from "react-icons/bs";
import { useQueryClient } from '@tanstack/react-query';
import { client } from '../../utils/pb/config';
import { useTheme } from '../../utils/hooks/themeHook';
import { TheIcon } from '@denniskinuthia/tiny-pkgs';

interface ProfileMenuProps {
user?:PBUser
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({user,setIsOpen}) => {
console.log("user in side panel ",user?.data)
    const queryClient = useQueryClient();
    const theme = useTheme();
    const nextTheme = theme.theme === "dark" ? "light" : "dark";
    const mode = theme.theme === "dark" ? BsSunFill : BsFillMoonFill;
    const toggle = () => { theme.setTheme(nextTheme) };
    const logout = () => {
        client.authStore.clear();
        localStorage.removeItem('provider')
        queryClient.invalidateQueries(["user"]);
        setIsOpen(prev => !prev)
    };

const avatar = user?.avatar
return (
 <div className='w-full h-full rounded-xl bg-slate-800 
 flex flex-col items-center justify-center gap-2
 '>
        
        <div className="  rounded-md  flex justify-center items-center 
         w-[200px]  aspect-square m-2">
        <img
            src={avatar}
            alt={""}
            className="rounded-[50%] hover:rounded-sm w-full
              border-2 border-slate-900 dark:border-slate-100 aspect-square"
            // onClick={() => setIsOpen(true)}
        />
        </div>

        <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
            <button
                onClick={() => logout()}
                className='p-2 text-sm font-semibold rounded-lg
                    
                    border border-slate-900 dark:border-slate-100
                   hover:scale-110 hover:bg-slate-700 hover:text-slate-100'
            >Sign out</button>
        </div>
        <div className="w-fit p-1 mx-5 flex justify-center items-center   ">
            <TheIcon
                Icon={mode}
                size={"25"}
                color={""}
                iconstyle={""}
                iconAction={toggle}
            />
        </div>

 </div>
);
}
