import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Record, Admin } from "pocketbase";
import { pb_url } from "../../utils/env";
import { CustomPostType, PBUser } from "../../utils/types/types";
import { client } from "./../../utils/pb/config";
import { concatErrors } from "./../../utils/utils";
import { TheIcon } from "../../shared/wrappers/TheIcon";
import { ReactModalWrapper } from "../../shared/wrappers/ReactModalWrapper";
import { PostForm } from "./PostForm";

import { POSTS_KEY } from './../../pages/timeline/Timeline';
import { useStroreValues } from "../../utils/zustand/store";
import { useNavigate } from 'react-router-dom';
import { Mutationprops } from "../../utils/types/form";



interface PostCardProps {
    item: CustomPostType;
    user: Record | Admin | null | undefined;
}

export const PostsCard = ({ item, user }: PostCardProps) => {
    // console.log("url === ", makeUrl('posts', item.post_id, item.post_media))
    // console.log("creator image  === ",item.creator_image)
const navigate = useNavigate()
    return (
        <div className="w-full h-full p-2 flex flex-col">
       
            <div className="w-full flex justify-start items-center gap-[1px]">
            <div
            onClick={(event: React.MouseEvent<HTMLElement>)=>{
            event.stopPropagation();
            navigate('../../profile/' + item.creator_id)
             }}
                className="w-fit px-1 flex justify-start itemscenter gap-[1px]
                 cursor-pointer hover:bg-purple-100 rounded-full"
                 >
                <div className=" h-8 w-8 md:w-10 md:h-10 ">
                    {item?.creator_image ? (
                        <img
                            src={item?.creator_image}
                            // src={makeUrl('devs', item.creator_id, item.creator_image)}
                            className=" w-full h-full rounded-full aspect-square"
                        />
                    ) : null}
                </div>
                <div className="flex items-center text-blue-700 justifycenter text-md font-bold px-2">
                    {item?.creator_name}
                </div>
            </div>
            </div>   
         

            <div className="w-full  flex items-center justify-start p-2 ">{item?.post_body}</div>
            <div className="w-full  flex items-center justify-center ">
                {item?.post_media ? (
                    <img
                        src={makeUrl("posts", item?.post_id, item?.post_media)}
                        className=" w-fit max-h-80 rounded-lg"
                    />
                ) : null}
            </div>

            <div className="w-full  flex">
                <PostReactionsCard user={user} item={item} />
            </div>
        </div>
    );
};

const makeUrl = (coll_name: string, coll_id: string, media: string) => {
    if (media) {
        return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`;
    }
    return;
};
interface PostReactionsCardProps {
    user: PBUser;
    item: CustomPostType;
}
interface ReactionRequest {
    reaction?: string;
    post: string;
    emp: string;
    liked: "yes" | "no";
}

export const PostReactionsCard = ({ user, item }: PostReactionsCardProps) => {
    const store = useStroreValues()
    const [isOpen, setIsOpen] = React.useState(false);
    const queryClient = useQueryClient();
    const [liked, setLiked] = React.useState(item?.mylike === "yes");

    const updateReactionMutation = useMutation(
        async (vars: CustomPostType) => {
            const updatevars = { liked: item.mylike === "yes" ? "no" : "yes" };
            console.log("update mutation vars=== ", updatevars, vars.reaction_id);
            try {
            const response = await client.collection("reactions").update(vars?.reaction_id as string, updatevars);
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
                queryClient.invalidateQueries([POSTS_KEY]);
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
                queryClient.invalidateQueries([POSTS_KEY]);
                //     queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error liking post", concatErrors(err));
                updateReactionMutation.mutate(item);
            }
        }
    );

    const replyMutation = useMutation(async ({ basepayload }: Mutationprops) => {
        basepayload.append("depth", "1");
        basepayload.append("parent", item.post_id);
        // basepayload.append('parent', null)
        try {
        return await client.collection("posts").create(basepayload);
        } catch (e) {
        throw e;
        }
    },{
        onSuccess:()=>{
            store.updateNotification({ message: "reply sent", type: "success" })
        },
        onSettled: (data) => {
            queryClient.invalidateQueries([POSTS_KEY]);
            //     queryClient.invalidateQueries(count_query_key);
        },
    }
    
    );

    // console.log("total likes  ====== ",total_likes)

    return (
        <div className="w-full p-1">
            <div className="w-full flex items-center justify-evenly">



                <div className="w-full flex ">
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
                        delay={0}
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
                    <TheIcon
                        Icon={liked ? AiFillHeart : AiOutlineHeart}
                        size="1.5rem"
                        color={liked ? "red" : ""}
                        iconAction={() => {
                            if (
                                item?.mylike !== "virgin" &&
                                item?.reaction_id &&
                                item?.reaction_id !== ""
                            ) {
                                updateReactionMutation.mutate(item);
                                setLiked(prev => !prev);
                            } else {
                                newReactionMutation.mutate(item);
                                setLiked(prev => !prev);
                            }
                        }}
                    />
                    {item?.likes ?? 0}
                </div>
                <div className="flex ">
                    <TheIcon
                        Icon={VscComment}
                        size="1.5rem"
                        color={item?.myreply !== "virgin" ? "purple" : ""}
                        iconAction={() => setIsOpen(true)}
                    />
                    {item?.replies ?? 0}
                </div>
            </div>
 
        </div>
    );
};

