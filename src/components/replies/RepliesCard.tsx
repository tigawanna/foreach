import React from 'react'
import { CustomPostType, CustomRepliesType, PBUser,} from '../../utils/types/types';
import { client, makeUrl } from './../../utils/pb/config';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { concatErrors } from '../../utils/utils';
import { Mutationprops } from '../form/types';
import { Record } from 'pocketbase';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { PostForm } from './../timeline/PostForm';
import { TheIcon } from './../../shared/wrappers/TheIcon';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { REPLIES_KEY } from './Replies';

interface ReplyCardProps {
    reply: CustomPostType
    user: PBUser
  
}

export const ReplyCard = ({reply,user}:ReplyCardProps) => {
    // console.log("reply === ",reply)
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
        <div className="w-full  flex  text-sm p-2">{reply.post_body}</div>
        <div className="w-full  flex items-center justify-center ">
            {reply.post_media ? (
                <img
                    src={makeUrl("posts", reply.post_id, reply.post_media)}
                    className=" w-fit max-h-80 rounded-lg border-t"
                />
            ) : null}
        </div>

        <div className="w-full  flex">
            <ReplyReactionsCard user={user} item={reply} />
        </div>
    </div>
);
}



interface ReplyReactionsCardProps {
    user: PBUser;
    item: CustomPostType;
 
}

export const ReplyReactionsCard = ({ user,item}: ReplyReactionsCardProps) => {


    const [isOpen, setIsOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [liked, setLiked] = React.useState(item.mylike === "yes");

    const updateReactionMutation = useMutation(
        async (vars: CustomPostType) => {
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
                queryClient.invalidateQueries([REPLIES_KEY]);
                // queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error updating ===> ", concatErrors(err));
            }
        }
    );
    const newReactionMutation = useMutation(
        async (vars: CustomPostType) => {
            const newReaction = {
              post: vars.post_id,
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
                queryClient.invalidateQueries([REPLIES_KEY]);
                //     queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error liking post", concatErrors(err));
                // updateReactionMutation.mutate(item);
            }
        }
    );

    const replyMutation = useMutation(async ({ basepayload }: Mutationprops) => {
        const post_depth = item.post_depth === "" ? 0 : parseInt(item.post_depth)
        basepayload.append("depth", (post_depth+1).toString());
        basepayload.append("parent", item.post_id);
        // basepayload.append('parent', null)
        try {
            return await client.collection("posts").create(basepayload);
        } catch (e) {
            throw e;
        }
    }, {
        onSettled: (data: Record | undefined, error: unknown, variables: Mutationprops, context: unknown) => {
            console.log("data after reply", data)
            queryClient.invalidateQueries([REPLIES_KEY]);
        }
    }

    );

return (
<div className="w-full h-full p-2 flex flex-col">
        <div className="w-full flex items-center justify-evenly">
            <ReactModalWrapper
                child={
                    <PostForm
                        user={user}
                        setIsOpen={setIsOpen}
                        mutation={replyMutation}
                        label="reply"
                    />
                }
                closeModal={() => setIsOpen(false)}
                delay={2}
                isOpen={isOpen}
                styles={{
                    overlay_top: "0%",
                    overlay_right: "0%",
                    overlay_left: "0%",
                    overlay_bottom: "0%",
                    content_bottom: "2%",
                    content_right: "2%",
                    content_left: "2%",
                    content_top: "2%"
                }}
            />

            <div className="w-full flex ">
                <TheIcon
                    Icon={liked ? AiFillHeart : AiOutlineHeart}
                    size="1.5rem"
                    color={liked ? "red" : ""}
                    iconAction={() => {
                        if (
                            item.mylike !== "virgin" &&
                            item.reaction_id &&
                            item.reaction_id !== ""
                        ) {
                            updateReactionMutation.mutate(item);
                            setLiked(prev => !prev);
                        } else {
                            newReactionMutation.mutate(item);
                            setLiked(prev => !prev);
                        }
                    }}
                />
                {item.likes ?? 0}
            </div>
            <div className="flex ">
                <TheIcon
                    Icon={VscComment}
                    size="1.5rem"
                    color={item.myreply !== "virgin" ? "purple" : ""}
                    iconAction={() => setIsOpen(true)}
                />
                {item.replies ?? 0}
            </div>
        </div>
 </div>
);
}
