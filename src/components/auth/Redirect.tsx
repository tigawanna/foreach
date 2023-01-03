
import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { PBUser } from '../../utils/types/types';
import { useQueryClient } from '@tanstack/react-query';
import { client } from './../../utils/pb/config';
import { LoadingElipse } from '@denniskinuthia/tiny-pkgs';
import { redirect_url } from '../../utils/env';
import { login_url } from './../../utils/env';



interface RedirectProps {
user?:PBUser
}

export interface OAuthResponse {
    meta: Meta
    record: Record
    token: string
}
export interface Meta {
    id: string
    name: string
    username: string
    email: string
    avatarUrl: string
    rawUser: RawUser
    accessToken: string
}
export interface RawUser {
    avatar_url: string
    bio: string
    blog: string
    collaborators: number
    company: any
    created_at: string
    disk_usage: number
    email: string
    events_url: string
    followers: number
    followers_url: string
    following: number
    following_url: string
    gists_url: string
    gravatar_id: string
    hireable: any
    html_url: string
    id: number
    location: string
    login: string
    name: string
    node_id: string
    organizations_url: string
    owned_private_repos: number
    plan: Plan
    private_gists: number
    public_gists: number
    public_repos: number
    received_events_url: string
    repos_url: string
    site_admin: boolean
    starred_url: string
    subscriptions_url: string
    total_private_repos: number
    twitter_username: any
    two_factor_authentication: boolean
    type: string
    updated_at: string
    url: string
}
export interface Plan {
    collaborators: number
    name: string
    private_repos: number
    space: number
}
export interface Record {
    avatar: string
    collectionId: string
    collectionName: string
    created: string
    email: string
    emailVisibility: boolean
    id: string
    updated: string
    username: string
    verified: boolean
    expand: {}
}


export const Redirect: React.FC<RedirectProps> = ({user}) => {
// const [loading, setLoading] = React.useState(true)
const queryClient = useQueryClient()
const navigate = useNavigate()
// const [searchParams] = useSearchParams();
// const code = searchParams.get('code') as string
const local_prov = JSON.parse(localStorage.getItem('provider') as string)
const url = new URL(window.location.href);
const code = url.searchParams.get('code') as string
const state = url.searchParams.get('state') as string


// this hasto match what you orovided in the oauth provider , in tis case google
let redirectUrl = redirect_url
useEffect(()=>{
    const pbOauthLogin=async()=>{

    console.table("oauth params passed to pb",[local_prov.name, code, local_prov.codeVerifier, redirectUrl])   
    client.autoCancellation(false)
    const oauthRes = await client.collection('devs')
    .authWithOAuth2(local_prov.name, code, local_prov.codeVerifier, redirectUrl
    , undefined)
    const meta = oauthRes.meta as Meta
    console.log("oauth response === ",oauthRes)
    await client.collection('devs').update(oauthRes.record.id, {
            avatar: meta?.avatarUrl,
            accessToken: meta?.accessToken
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

        // client.collection('devs').authWithOAuth2(
        //     local_prov.name,code,local_prov.codeVerifier,redirectUrl)
        //     .then((response) => {
        //     // console.log("redirect block ::: authentication data === ", response)
        //     const meta = response.meta as Meta
        //     client.collection('devs').update(response.record.id,{
        //     avatar: meta?.avatarUrl,
        //     accessToken: meta?.accessToken
        //     })
        //     .catch((e) => {
        //     console.log("error updating profile  == ", e)
        //     })
        //     // setLoading(false)
        //     // console.log("client modal after logg   == ", client.authStore.model)
        //     queryClient.setQueryData(['user'], client.authStore.model)
        //     navigate('/')
        //     })
        pbOauthLogin().catch((e) => {
                console.log("error logging in with provider  == ", e)
            })
    }

},[])

if (user) {
    return <Navigate to="/" replace />;
}
    if (!user) {
        return <Navigate to="/auth" replace />;
    }
return (
 <div className='w-full h-full '>
        {/* {loading ? <LoadingElipse/>:null} */}
        authing ...
 </div>
);
}
