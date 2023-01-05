import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { LoadingRipples } from '@denniskinuthia/tiny-pkgs';
import { PBUser } from '../../utils/types/types';
import { client } from '../../utils/pb/config';
import { redirect_url, login_url } from '../../utils/env';

interface RedirectProps {
  user?: PBUser;
}

export const Redirect: React.FC<RedirectProps> = ({ user }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
        );
      await client.collection('devs').update(oauthRes?.record.id as string, {
        avatar: oauthRes.meta?.avatarUrl,
        accessToken: oauthRes.meta?.accessToken,
      });
      queryClient.setQueryData(['user'], client.authStore.model);
      navigate('/');
    };

    if (local_prov.state !== state) {
      const auth_url = login_url;
      if (typeof window !== 'undefined') {
        window.location.href = auth_url;
      }
    } else {
      pbOauthLogin().catch((e) => {
        console.log('error logging in with provider  == ', e);
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <LoadingRipples />
    </div>
  );
};
