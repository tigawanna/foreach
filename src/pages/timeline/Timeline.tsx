import React from 'react'
import { PBUser } from '../../utils/types/types';
import dayjs from 'dayjs';
import { pb_url } from './../../utils/env';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInfiniteCustom } from './../../utils/hooks/useInfiniteCustom';
interface TimelineProps {
    user: PBUser
}
interface Deps {
    pageParam: {
        created: string, id: string
    }
}

export interface CustomPostType {
    creator_id: string
    creator_name: string
    creator_image: string
    post_id: string
    post_body: string
    post_media: string
    created_at: string
    likes: number
    mylike: "yes"|"no"|"virgin"
    reaction_id: string
}

export const Timeline: React.FC<TimelineProps> = ({user}) => {


const customPostsQuery = useInfiniteCustom<CustomPostType>('custom=posts',user,{
    getNextPageParam: (lastPage, allPages) => {
        // console.log("last page ==== ",lastPage,allPages)
        if (lastPage && lastPage[lastPage.length - 1]) {
            return {
             created: lastPage[lastPage?.length - 1]?.created_at,
             id: lastPage[lastPage?.length - 1]?.post_id
            };
        }
        return;
    }
})

  console.log("custom query === ",customPostsQuery.data)

return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
<div className='text-4xl font-bold font-serif'>
    timeline
</div>
 </div>
);
}
