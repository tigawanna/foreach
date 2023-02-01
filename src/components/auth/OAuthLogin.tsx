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
  // const navigate = useNavigate();
  // //no-console("user in Login.tsx  ==  ",user)
  // if (user?.email) {
  //   navigate('/');
  // }
  console.log("redirect url ===", redirect_url)
  const startLogin = (prov: ProvType) => {
    localStorage.removeItem('provider')
    localStorage.setItem('provider', JSON.stringify(prov));
    
    const url = new URL(prov.authUrl + redirect_url);
    const params = url.searchParams;
    // params.set("scope", "myScope1 myScope2");
    url.search = params.toString();
    // //no-console("prov in button === ", prov)
    console.log("combined url ==== >>>>>>  ", url.toString())

    // if (typeof window !== 'undefined') {
    //   window.location.href = url.toString();
    // }
  };
  const providerIcons = {
    github: FaGithub,
    google: FaGoogle,
  };
  const provs  = query.data?.authProviders
 console.log("provs",provs)
  return (
    <div className="w-full  h-full flex flex-wrap items-center justify-center gap-2 ">
      {provs &&
        provs?.map((item) => {
          if(item.name === 'github')
          return (
            <div
              key={item.name}
              onClick={() => startLogin(item)}
              className="p-3 min-w-fit w-[50%]  cursor-pointer
               bg-slate-600 rounded-lg hover:bg-slate-800 
             capitalize text-2xl font-bold flex items-center justify-center gap-2"
            >
              <TheIcon
                iconstyle=""
                Icon={providerIcons[item.name as keyof typeof providerIcons]}
                size="40"
              />
              {item.name}
            </div>
          );
        })}
    </div>
  );
};
