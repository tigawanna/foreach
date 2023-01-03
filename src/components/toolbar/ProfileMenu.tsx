import React from 'react'
import { PBUser } from '../../utils/types/types';
import { BsSunFill,BsFillMoonFill,} from "react-icons/bs";
import { useQueryClient } from '@tanstack/react-query';
import { client } from '../../utils/pb/config';
import { useTheme } from '../../utils/hooks/themeHook';
import { TheIcon } from '@denniskinuthia/tiny-pkgs';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
user?:PBUser
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({user,setIsOpen}) => {


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
 <div className='w-full h-full rounded-xl 
 dark:text-slate-100 bg-slate-200  dark:bg-slate-800 
 flex flex-col items-center justify-evenly gap-2'>
        

{ user?<div className="  rounded-md  flex flex-col justify-center items-center m-2">  

    <div className="  rounded-md  flex justify-center items-center w-[200px]  aspect-square m-2">
        <img
            src={avatar}
            alt={""}
            className="rounded-[7%]  w-full
              border-2 border-slate-900 dark:border-slate-100 aspect-square"
            // onClick={() => setIsOpen(true)}
        />
        </div>

        <div className='w-full h-fit flex flex-col justify-center items-center p-2'>
            <button
                onClick={() => logout()}
                className='p-2  font-semibold rounded-lg
                    border border-slate-900 dark:border-slate-100
                   hover:scale-110 hover:bg-slate-700 hover:text-slate-100'
            >Sign out</button>
        </div>
        </div>:<Link 
        onClick={()=>setIsOpen(false)}
        className='p-2 border-4 border-purple-900 rounded-xl '
        to='/auth'>
        Login</Link> }



        <div className="w-fit p-1 mx-5 flex justify-center items-center   ">
            <TheIcon
                Icon={mode}
                size={"30"}
           
                iconAction={toggle}
            />
        </div>

 </div>
);
}
