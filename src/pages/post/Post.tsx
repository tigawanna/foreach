import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useCustomPosts } from '../../shared/hooks/useInfiniteCustom';
import { useParams } from 'react-router-dom';
import { PostsCard } from '../../components/timeline/PostCard';
import { QueryStateWrapper } from '../../shared/wrappers/QueryStateWrapper';

interface PostProps {
    user: PBUser
}
type Params={id:string}

export const Post = ({user}: PostProps) => {

const params = useParams<Params>()
console.log("params in pst  === ",params)
const query =useCustomPosts<CustomPostType>(user,{
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
        <div className='w-full h-full flex-center-col'>
            <QueryStateWrapper query={query}>
                <PostsCard item={post as CustomPostType}  user={user} />
            </QueryStateWrapper>
    
        </div>
    );
}
