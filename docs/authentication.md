## Authentication
In this first part we'll implement user authentication with the pocketbase social OAUTH providers 
I'll use google and GitHub but they support a dozen more.

1. Obtaining client id and  client secret from the providers
[setting up GitHub OAUTH](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app)
    
[setting up google OAUTH](https://support.google.com/cloud/answer/6158849?hl=en)

then enable the respective providers in the pocketbase admin dashboard

![enabling GitHub OAUTH](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/12jn3sgjgqpbewentr5l.png)
![enabling Google OAUTH](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1mklmx38egzps9zlkpan.png)

2. frontend integration
using the pocketbase client 
```ts
const authData = await pb.collection('devs').authWithOAuth2(
    'google',
    'CODE',
    'VERIFIER',
    'REDIRECT_URL',
    // optional data that will be used for the new account on OAuth2 sign-up
    {
      'name': 'test',
    },
);


```
to get the required arguments we need to fetch the enabled providers

the start function

first we get some icons for the respective providers
```ts
import { TheIcon } from '@denniskinuthia/tiny-pkgs';
import { FaGithub,FaGoogle } from 'react-icons/fa'

const providerIcons={
github:FaGithub,
google:FaGoogle
}
```
then

```ts
const providers = await client.collection("devs").listAuthMethods()
```
initiate login function using:
```ts
const startLogin = (prov:ProvType) => {
   localStorage.setItem("provider",JSON.stringify(prov));
  const redirectUrl = "http://localhost:3000/redirect";
  const url = prov.authUrl + redirectUrl;
      // //no-console("prov in button === ", prov)
      // //no-console("combined url ==== >>>>>>  ",url)
  
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };
```
> note: the redirect URL should match what you provided in the setup process: once you've hosted your website you can use your actual domain instead of localhost

then we'll map over them and render out a button for each provider

```ts

    <div className="w-full h-fit md:h-full flex flex-wrap items-center justify-center gap-2 ">

      {provs &&
        provs?.map((item:any) => {
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
            size={'30'}
            />
              {item.name}
            </div>
          );
        })}
    </div>
```

finally the redirect component
> remember to define a route for it in your react router config
<details>
<summary>Click to expand Redirect.tsx</summary>

```ts
Redirect.tsx



import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { client } from './../../utils/pb/config';
import { LoadingRipples } from '@denniskinuthia/tiny-pkgs';
import { redirect_url } from '../../utils/env';
import { login_url } from './../../utils/env';

interface RedirectProps {
user?:PBUser
}

export const Redirect: React.FC<RedirectProps> = ({user}) => {
const queryClient = useQueryClient()
const navigate = useNavigate()
const local_prov = JSON.parse(localStorage.getItem('provider') as string)
const url = new URL(window.location.href);
const code = url.searchParams.get('code') as string
const state = url.searchParams.get('state') as string


// this hasto match what you orovided in the oauth provider , in tis case google
let redirectUrl = redirect_url
useEffect(()=>{
    const pbOauthLogin=async()=>{
   client.autoCancellation(false)
    const oauthRes = await client.collection('devs')
    .authWithOAuth2(local_prov.name, code, local_prov.codeVerifier, redirectUrl)
        await client.collection('devs').update(oauthRes?.record.id as string, {
            avatar: oauthRes.meta?.avatarUrl,
            accessToken: oauthRes.meta?.accessToken
        })
    queryClient.setQueryData(['user'], client.authStore.model)
    navigate('/')

    }


    if (local_prov.state !== state) {
      const url = login_url
     if (typeof window !== 'undefined') {
            window.location.href = url;
        }
    }
    else {
    pbOauthLogin().catch((e) => {
    //no-console("error logging in with provider  == ", e)
    })
    }

},[])





return (
 <div className='w-full h-full flex items-center justify-center'>
<LoadingRipples/>
</div>
);
}

```
</details>

> Note:  I used   client.autoCancellation(false) to avoid the OAUTH request getting auto cancelled in dev mode because of react strict mode 

finally we can put in place route AUTH guards , I prefer to do it at the root layout level inside which every other route is nested

<details>
<summary>Click to expand RootLayout.tsx</summary>

```ts
RootLayout.tsx


import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { Toolbar } from '../../components/toolbar/Toolbar';
import { PBUser } from '../../utils/types/types';



interface RootLayoutProps {
user : PBUser
test_mode:boolean
}

export const RootLayout: React.FC<RootLayoutProps> = ({user,test_mode}) => {
    const navigate = useNavigate()
    React.useEffect(() => {
        if (!user?.email&&!test_mode) {
            navigate('/auth')
        }
    }, [user?.email])

return (
    <div className='w-full h-screen max-h-screen dark:bg-slate-900'>
        <div className='h-14 w-full  bg-slate-700 dark:bg-slate-800  
          bg-opacity-30 dark:bg-opacity-90 max-h-[50px] p-1
         sticky top-0 z-40'>
        <Toolbar user={user} />
        </div>
        <main className=' w-full h-full fixed top-12'>
            <Outlet />
        </main>
    </div>
);
}

```
</details>

[complete code](https://github.com/tigawanna/devhub)
[AUTH guarding](https://dev.to/tigawanna/auth-guarding-in-react-392o)
