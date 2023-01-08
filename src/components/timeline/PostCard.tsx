import React from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { VscComment } from 'react-icons/vsc'
import { FcComments } from 'react-icons/fc'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Record, Admin } from 'pocketbase';
import { pb_url } from '../../utils/env';
import { CustomPostType, PBUser } from '../../utils/types/types';
import { client } from './../../utils/pb/config';
import { concatErrors } from './../../utils/utils';
import { TheIcon } from '../../shared/wrappers/TheIcon';




interface PostCardProps {
    item: CustomPostType
    user: Record | Admin | null | undefined
}


export const PostsCard: React.FC<PostCardProps> = ({ item, user }) => {
    // console.log("url === ", makeUrl('posts', item.post_id, item.post_media))
console.log("creator image  === ",item.creator_image)
    return (
        <div className='w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
          dark:border-[1px]  dark:border-white rounded-lg gap-3'>
            <div className='w-full flex justify-start itemscenter gap-[1px]'>
                <div className='w-10 h-10 '>
                    {item.creator_image ?
                    <img 
                    src={item.creator_image}
                    // src={makeUrl('devs', item.creator_id, item.creator_image)}
                        className=' w-fit h-10 rounded-full aspect-square' /> : null}
                </div>
                <div className='flex items-center text-blue-700 justifycenter text-md font-bold px-2'>
                    {item.creator_name}
                </div>
                {/* <div className='flex text-sm font-bold text-blue-900 dark:text-blue-300'>
                    @{item.expand?.emp?.username}
                </div>  */}

            </div>
            <div className='w-full  flex  text-sm '>
                {item.post_body}
            </div>
            <div className='w-full  flex items-center justify-center '>
                {item.post_media ? <img src={makeUrl('posts', item.post_id, item.post_media)}
                    className=' w-fit max-h-80 rounded-lg' /> : null}
            </div>
            {/* <div className='w-full  flex font-serif text-sm font-normal'>
               emp id:  {item.creator_id}
            </div>
            <div className='w-full  flex font-serif text-sm font-normal'>
                post id :  {item.post_id}
            </div> */}
            <div className='w-full  flex'>
                <PostReactionsCard user={user} item={item} />
            </div>
        </div>
    );
}



const makeUrl = (coll_name: string, coll_id: string, media: string) => {
    if (media) {
        return `${pb_url}/api/files/${coll_name}/${coll_id}/${media}`
    }
    return
}
interface PostReactionsCardProps {
    user: PBUser
    item: CustomPostType
}
interface ReactionRequest {
    reaction?: string
    post: string,
    emp: string;
    liked: "yes" | "no";
}

export const PostReactionsCard: React.FC<PostReactionsCardProps> = ({ user, item }) => {
    // console.log("post ids === ",user?.id,item.id)
    // console.log("user ====", user?.id)
    // console.log("item ===== ", item)
    const queryClient = useQueryClient()
    const [liked, setLiked] = React.useState(item.mylike === "yes")

    const updateReactionMutation = useMutation(async (vars: CustomPostType) => {
       const updatevars = {liked: item.mylike === "yes" ? "no" : "yes"}
        console.log("update mutation vars=== ", updatevars, vars.reaction_id)
        try {
            const response = await client.collection('reactions')
                .update(vars?.reaction_id as string, updatevars)
            console.log("update reaction response === ", response)
        }
        catch (err: any) {
            console.log("error updating ===> ", concatErrors(err))
            // setError({ name: "main", message: err?.messge })
            throw err
        }
    },
        {
            onSettled: () => {
            queryClient.invalidateQueries(['custom-posts']);
            // queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {
                console.log("error updating ===> ", concatErrors(err))
            },
        
        }
    )
    const newReactionMutation = useMutation(async (vars: CustomPostType) => {

        const newReaction = {
            post: vars.post_id,
            user: user?.id,
            liked: "yes"
        }
        console.log("create vars =====> ", newReaction)
        try {
            const response = await client.collection('reactions').create(newReaction)
            console.log("new reaction response === ", response)
        }
        catch (err: any) {
            console.log("error liking post", concatErrors(err))
            // setError({ name: "main", message: err?.messge })
            throw err
        }
    },
        {
            onSettled: () => {
                queryClient.invalidateQueries(['posts-list']);
                //     queryClient.invalidateQueries(count_query_key);
            },
            onError: (err: any) => {

                console.log("error liking post", concatErrors(err))
                updateReactionMutation.mutate(item)

            }
        }
    )

    // console.log("total likes  ====== ",total_likes)

    return (
        <div className='w-full p-1'>
            <div className='w-full flex items-center justify-evenly'>
                <div className='w-full flex '>
                    <TheIcon
                        Icon={liked ? AiFillHeart : AiOutlineHeart}
                        size='1.5rem'
                        color={liked ? "red" : ""}
                        iconAction={() => {
                            if (item.mylike !== "virgin" && item.reaction_id && item.reaction_id !== "") {
                                updateReactionMutation.mutate(item)
                                setLiked(prev => !prev)
                            }
                            else {
                                newReactionMutation.mutate(item)
                                setLiked(prev => !prev)
                            }
                        }}
                    />
                    {item.likes ?? 0}
                </div>
                {/* <div className='flex '>
                    <TheIcon Icon={item.my_reply_id !== "virgin" ? FcComments : VscComment}
                        size='1.5rem'
                        color={item.my_reply_id !== "virgin" ? "purple" : ""} />
                    {item.reply_count ?? 0}
                </div> */}

            </div>
        </div>
    );
}
