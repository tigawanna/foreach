import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { PBUser } from "../../utils/types/types";
import { OAuthLogin } from "../../components/auth/OAuthLogin";


interface LoginProps {
user?: PBUser
}

export const Login: React.FC<LoginProps> = ({user}) => {

  // const navigate = useNavigate()
  // React.useEffect(() => {
  //   if (user?.email) {
  //     navigate('/')
  //   }
  // }, [user?.email])


return (
  <div className="w-full  h-full flex flex-col items-center 
  justify-center ">

    <div className="h-[70%] w-[90%] md:w-[60%]  m-2 p-3 flex flex-col 
    items-center justify-evenly text-slate-100  border  shadow-slate-600  shadow-lg rounded-xl">
      <div className="w-full text-3xl text-center font-bold p-2 text-slate-900 dark:text-slate-100">
        Login
      </div>
    <OAuthLogin user={user}/>
    </div>

    </div>
  );
};
