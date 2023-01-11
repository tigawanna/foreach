import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';

interface AuthLayoutProps {
  user: PBUser;
}

export const AuthLayout = ({user}: AuthLayoutProps) => {
  const navigate = useNavigate();
  // console.log("user ===", user)

  React.useEffect(() => {
    if (user) {
      if (user?.email && user?.displayName === "") {
        navigate('/profile')
      }
      else {
        navigate('/')
      }
    }

  }, [user])


  return (<div className="w-full h-full">
    <Outlet />
  </div>
  )
}

