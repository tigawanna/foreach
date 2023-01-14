import React from 'react'
import { CustomRepliesType, PBUser, RepliesType } from '../../utils/types/types';
import { client, makeUrl } from './../../utils/pb/config';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { concatErrors } from '../../utils/utils';
import { Mutationprops } from '../form/types';
import { Record } from 'pocketbase';

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
    user: PBUser;
    item: CustomRepliesType;
}

export const ReplyReactionsCard = ({ user,item}: ReplyReactionsCardProps) => {


    const [isOpen, setIsOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [liked, setLiked] = React.useState(item.mylike === "yes");

    const updateReactionMutation = useMutation(
        async (vars: CustomRepliesType) => {
            const updatevars = { liked: item.mylike === "yes" ? "no" : "yes" };
            console.log("update mutation vars=== ", updatevars, vars.reaction_id);
            try {
                const response = await client.collection("reactions").update(
                    vars?.reaction_id as string, updatevars);
                console.log("update reaction response === ", response);
                return response
            } catch (err: any) {
                console.log("error updating ===> ", concatErrors(err));
                // setError({ name: "main", message: err?.messge })
                throw err;
            }
        },
        {
            onSettled: () => {
                queryClient.invalidateQueries(["custom-posts"]);
                // queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error updating ===> ", concatErrors(err));
            }
        }
    );
    const newReactionMutation = useMutation(
        async (vars: CustomRepliesType) => {
            const newReaction = {
                post: vars.reply_id,
                user: user?.id,
                liked: "yes"
            };
            console.log("create vars =====> ", newReaction);
            try {
                const response = await client.collection("reactions").create(newReaction);
                console.log("new reaction response === ", response);
                return response
            } catch (err: any) {
                console.log("error liking post", concatErrors(err));
                // setError({ name: "main", message: err?.messge })
                throw err;
            }
        },
        {
            onSettled: (data) => {
                queryClient.invalidateQueries(["custom-posts"]);
                //     queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error liking post", concatErrors(err));
                updateReactionMutation.mutate(item);
            }
        }
    );

    const replyMutation = useMutation(async ({ basepayload }: Mutationprops) => {
        basepayload.append("depth", (parseInt(item.reply_depth)+1).toString());
        basepayload.append("post", item.reply_id);
        // basepayload.append('parent', null)
        try {
            return await client.collection("replies").create(basepayload);
        } catch (e) {
            throw e;
        }
    }, {
        onSettled: (data: Record | undefined, error: unknown, variables: Mutationprops, context: unknown) => {
            console.log("data after reply", data)
            queryClient.invalidateQueries(["custom-posts"]);
        }
    }

    );

return (
<div className="w-full h-full p-2 flex flex-col">

 </div>
);
}
