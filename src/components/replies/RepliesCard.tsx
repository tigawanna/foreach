import React from 'react'
import { CustomRepliesType, PBUser, RepliesType } from '../../utils/types/types';
import { makeUrl } from './../../utils/pb/config';

interface ReplyCardProps {
    reply:CustomRepliesType
    user:PBUser
}

export const ReplyCard = ({reply}:ReplyCardProps) => {
    console.log("reply === ",reply)
return (
    <div className="w-full h-full p-2 flex flex-col">
   
        <div className="w-full flex justify-start itemscenter gap-[1px]">
            <div className="w-7 h-7 ">
                {reply.creator_image ? (
                    <img
                        src={reply.creator_image}
                        // src={makeUrl('devs', item.creator_id, item.creator_image)}
                        className=" w-full h-full rounded-full aspect-square"
                    />
                ) : null}
            </div>
            <div className="flex items-center text-blue-700 justifycenter text-md font-bold px-1">
                {reply.creator_name}
            </div>
        </div>
        <div className="w-full  flex  text-sm p-2">{reply.reply_body}</div>
        <div className="w-full  flex items-center justify-center ">
            {reply.reply_media ? (
                <img
                    src={makeUrl("replies", reply.reply_id, reply.reply_media)}
                    className=" w-fit max-h-80 rounded-lg border-t"
                />
            ) : null}
        </div>

        {/* <div className="w-full  flex">
            <ReplyReactionsCard user={user} item={item} />
        </div> */}
    </div>
);
}



interface ReplyReactionsCardProps {

}

export const ReplyReactionsCard = ({ }: ReplyReactionsCardProps) => {
return (
<div className="w-full h-full p-2 flex flex-col">

 </div>
);
}
