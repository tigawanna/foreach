import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useCustomPosts } from '../../shared/hooks/useInfiniteCustom';
import { useParams } from 'react-router-dom';
import { PostsCard } from '../../components/timeline/PostCard';
import { QueryStateWrapper } from '../../shared/wrappers/QueryStateWrapper';
import { Replies } from '../../components/replies/Replies';

interface PostProps {
    user: PBUser
}
type Params={id:string}

export const Post = ({user}: PostProps) => {

const params = useParams<Params>()
// console.log("params in pst  === ",params)

const query = useCustomPosts<CustomPostType>(user, ["custom-posts", params?.id as string],{
    select:(data)=>{
        if(data&&params.id){
            return data?.filter((item)=>item.post_id===params.id)
        }
        return data
    }
})

    console.log("posts query === ",query.data)
const post = query.data&&query?.data[0]
    return (
        <div className='w-full h-full flex flex-col items-center justify-start gap-2'>
            <div className="w-[98%] p-2 flex flex-col  border-black border-2 
            dark:border-[1px]  dark:border-white rounded-lg ">
            <QueryStateWrapper query={query}>
            <PostsCard item={post as CustomPostType}  user={user} />
            </QueryStateWrapper>
            </div>
            <Replies post_id={post?.post_id as string}/>
        </div>
    );
}
