import React from 'react'
import { PBUser, RepliesType } from '../../utils/types/types';
import { makeUrl } from './../../utils/pb/config';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { concatErrors } from './../../utils/utils';

interface ReplyCardProps {
    reply:RepliesType
    user:PBUser
}

export const ReplyCard = ({reply}:ReplyCardProps) => {
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
            <ReplyReactionsCard user={user} item={item} />
        </div> */}
    </div>
);
}



// interface ReplyReactionProps {
//     user:PBUser
//     reply: RepliesType
// }

// export const ReplyReactionCard = ({user,reply}:ReplyReactionProps) => {


//     const [isOpen, setIsOpen] = React.useState(false);
//     const queryClient = useQueryClient();
//     const [liked, setLiked] = React.useState(item.mylike === "yes");

//     const updateReactionMutation = useMutation(
//         async (vars: RepliesType) => {
//             // const updatevars = { liked: item.mylike === "yes" ? "no" : "yes" };
//             console.log("update mutation vars=== ", updatevars, vars.reaction_id);
//             try {
//                 const response = await client.collection("reactions").update(vars?.reaction_id as string, updatevars);
//                 console.log("update reaction response === ", response);
//                 return response
//             } catch (err: any) {
//                 console.log("error updating ===> ", concatErrors(err));
//                 // setError({ name: "main", message: err?.messge })
//                 throw err;
//             }
//         },
//         {
//             onSettled: () => {
//                 queryClient.invalidateQueries(["custom-posts"]);
//                 // queryClient.invalidateQueries(count_query_key);
//             },
//             onError: (err: any) => {
//                 console.log("error updating ===> ", concatErrors(err));
//             }
//         }
//     );
//     const newReactionMutation = useMutation(
//         async (vars: RepliesType) => {
//             const newReaction = {
//                 post: vars.id,
//                 user: user?.id,
//                 liked: "yes"
//             };
//             console.log("create vars =====> ", newReaction);
//             try {
//                 const response = await client.collection("reactions").create(newReaction);
//                 console.log("new reaction response === ", response);
//                 return response
//             } catch (err: any) {
//                 console.log("error liking post", concatErrors(err));
//                 // setError({ name: "main", message: err?.messge })
//                 throw err;
//             }
//         },
//         {
//             onSettled: (data) => {
//                 queryClient.invalidateQueries(["custom-posts"]);
//                 //     queryClient.invalidateQueries(count_query_key);
//             },
//             onError: (err: any) => {
//                 console.log("error liking post", concatErrors(err));
//                 updateReactionMutation.mutate(item);
//             }
//         }
//     );

//     const replyMutation = useMutation(async ({ basepayload }: Mutationprops) => {
//         basepayload.append("depth", "1");
//         basepayload.append("post", item.post_id);
//         // basepayload.append('parent', null)
//         try {
//             return await client.collection("replies").create(basepayload);
//         } catch (e) {
//             throw e;
//         }
//     }, {
//         onSettled: (data: Record | undefined, error: unknown, variables: Mutationprops, context: unknown) => {
//             console.log("data after reply", data)
//             queryClient.invalidateQueries(["custom-posts"]);
//         }
//     }

//     );



// return (
//  <div>

//  </div>
// );
// }
