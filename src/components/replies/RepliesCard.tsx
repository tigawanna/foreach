import React from 'react'
import { PBUser, RepliesType } from '../../utils/types/types';
import { makeUrl } from './../../utils/pb/config';

interface RepliesCardProps {
    reply:RepliesType
    user:PBUser
}

export const RepliesCard = ({reply}:RepliesCardProps) => {
    const image =reply?.expand?.user?.avatar
    console.log("reply === ",reply)
return (
    <div className="w-full h-full p-2 flex flex-col">
        {reply.body}
        <div className="w-full flex justify-start itemscenter gap-[1px]">
            <div className="w-7 h-7 ">
                {reply?.expand?.user?.avatar ? (
                    <img
                        src={reply?.expand?.user?.avatar}
                        // src={makeUrl('devs', item.creator_id, item.creator_image)}
                        className=" w-full h-full rounded-full aspect-square"
                    />
                ) : null}
            </div>
            <div className="flex items-center text-blue-700 justifycenter text-md font-bold px-2">
                {reply?.expand?.user?.username}
            </div>
        </div>
        <div className="w-full  flex  text-sm ">{reply.body}</div>
        <div className="w-full  flex items-center justify-center ">
            {reply?.media ? (
                <img
                    src={makeUrl("replies", reply.id, reply?.media)}
                    className=" w-fit max-h-80 rounded-lg"
                />
            ) : null}
        </div>

        {/* <div className="w-full  flex">
            <PostReactionsCard user={user} item={item} />
        </div> */}
    </div>
);
}
