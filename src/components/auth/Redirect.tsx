import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { PBUser } from '../../utils/types/types';
import { client } from '../../utils/pb/config';
import { redirect_url, login_url } from '../../utils/env';
import { LoaderElipse } from './../../shared/loaders/Loaders';
import { GithubRawUser, OAuthResponse } from './types';
import { Record } from 'pocketbase';

interface RedirectProps {
  user?: PBUser;
}

export const Redirect = ({user}: RedirectProps) => {
  // //no-console("inside Redirect component")
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const local_prov = JSON.parse(localStorage.getItem('provider') as string);
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code') as string;
  const state = url.searchParams.get('state') as string;

  // this hasto match what you orovided in the oauth provider , in tis case google
  const redirectUrl = redirect_url;
  useEffect(() => {
    const pbOauthLogin = async () => {
      client.autoCancellation(false);
      const oauthRes = await client
        .collection('devs')
        .authWithOAuth2(
          local_prov.name,
          code,
          local_prov.codeVerifier,
          redirectUrl
      ) as unknown as OAuthResponse
      
      console.log("oathRes === ",oauthRes)
      const rawUser = oauthRes?.meta?.rawUser as GithubRawUser
      //no-console("rawuser  === ",rawUser)
      // updating user profile with provider metadata
  
      const updateNotOverwrite=(field:keyof typeof oauthRes.record,value:string)=>{
       return  oauthRes.record[field] === "" ? value : oauthRes.record[field]
      }
      
      await client.collection('devs').update(oauthRes?.record.id as string, {
        avatar: updateNotOverwrite('avatar', oauthRes.meta?.avatarUrl),
        accesstoken: oauthRes.meta?.accessToken,
        refreshtoken:oauthRes.meta?.refreshToken,
        displayname: updateNotOverwrite('displayname', rawUser.name),
        bio: updateNotOverwrite('bio',rawUser.bio ),
        githuburl: updateNotOverwrite('githuburl', rawUser.url),
        userame: rawUser.login.split("")[0]
      });
      queryClient.setQueryData(['user'], client.authStore.model);
      ;
    };
    //no-console("redirect logic",local_prov.state , state)
    if (local_prov.state !== state) {
      const auth_url = login_url;
      if (typeof window !== 'undefined') {
        //no-console("redirecting to auth becasu it lacks ")
        window.location.href = auth_url;
      }
    } 
    else {
      pbOauthLogin().catch((e) => {
      // console.log('error logging in with provider  == ', e);
      });
    }
  }, []);
 



  return (
    <div className="w-full h-full flex items-center justify-center">
      {user?.email?"you can go back to main now":<LoaderElipse />}
    </div>
  );
};
