import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { PBUser } from '../../utils/types/types';
import { getProviders} from '../../utils/pb/config';
import { useQuery } from '@tanstack/react-query';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { redirect_url } from '../../utils/env';

interface OAuthLoginProps {
  user?: PBUser;
}
interface ProvType {
  name: string;
  state: string;
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: string;
  authUrl: string;
}

export const OAuthLogin = ({user}: OAuthLoginProps) => {
// //no-console("inside OAuthLogin component")

  const query = useQuery(['providers'],getProviders)
  const navigate = useNavigate();
  // //no-console("user in Login.tsx  ==  ",user)
  // if (user?.email) {
  //   navigate('/');
  // }
  const startLogin = (prov: ProvType) => {
    localStorage.setItem('provider', JSON.stringify(prov));
    const url = prov.authUrl + redirect_url;
    // //no-console("prov in button === ", prov)
    // //no-console("combined url ==== >>>>>>  ",url)

    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
  };
  const providerIcons = {
    github: FaGithub,
    google: FaGoogle,
  };
  const provs  = query.data?.authProviders
 //no-console("provs",provs)
  return (
    <div className="w-full h-fit md:h-full flex flex-wrap items-center justify-center gap-2 ">
      {provs &&
        provs?.map((item) => {
          if(item.name === 'github')
          return (
            <div
              key={item.name}
              onClick={() => startLogin(item)}
              className="p-2 w-[50%] md:w-[30%] cursor-pointer
               bg-slate-600 rounded-lg hover:bg-slate-800 
             capitalize text-xl font-bold flex items-center justify-center gap-2"
            >
              <TheIcon
                iconstyle=""
                Icon={providerIcons[item.name as keyof typeof providerIcons]}
                size="30"
              />
              {item.name}
            </div>
          );
        })}
    </div>
  );
};
