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
  <div className="w-full  h-[70%] flex flex-col items-center 
  justify-center 

  ">
    <div className="h-full w-[90%] md:w-[60%]  m-2 p-2 flex flex-col 
    items-center justify-start ">
    <OAuthLogin user={user}/>
    </div>
    <Link
    className="text-blue-500"
    to={'/auth/signup'}>
      Create new account
    </Link>
    </div>
  );
};
