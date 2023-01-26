import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
import { OAuthLogin } from '../../components/auth/OAuthLogin';

interface LoginProps {
  // eslint-disable-next-line react/require-default-props
  user?: PBUser;
}

export const Login = ({user}: LoginProps) => (
<div
  className="w-full  h-full flex flex-col items-center justify-center dark:bg-black bg-white "
>
  <div
  className="h-[70%] w-[90%] md:w-[40%]  m-2 p-3 flex flex-col
  items-center justify-evenly text-slate-100  border  shadow-slate-600  shadow-lg rounded-xl"
  >
    <div className="w-full text-3xl text-center font-bold p-2 text-slate-900 dark:text-slate-100">
      Login
    </div>
    <OAuthLogin user={user} />
  </div>
</div>);
