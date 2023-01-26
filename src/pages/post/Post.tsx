import { CustomPostType, PBUser } from '../../utils/types/types';
import { useCustomPosts } from '../../utils/hooks/useCustomPosts';
import { useParams, useSearchParams } from 'react-router-dom';
import { PostsCard } from '../../components/timeline/PostCard';
import { QueryStateWrapper } from '../../shared/wrappers/QueryStateWrapper';
import { Replies } from '../../components/replies/Replies';
import { POSTS_KEY } from './../timeline/Timeline';
import useScrollToTopOnRouteChange from '../../utils/hooks/useScrollToTop';

interface PostProps {
    user: PBUser
}
type Params={id:string}

export const Post = ({user}: PostProps) => {
    useScrollToTopOnRouteChange();

const [searchParams] = useSearchParams({});
const depth = searchParams.get('depth')
const profile = searchParams.get('profile')
const params = useParams<Params>()



const query = useCustomPosts<CustomPostType>(
{   key:POSTS_KEY, 
    user,
    post_id:params.id,
    depth:parseInt(depth as string),
    profile:profile??"general"
    
},{
    select:(data)=>{
        if(data&&params.id){
            return data?.filter((item)=>item.post_id===params.id)
        }
        return data
    }
})


//no-console("posts query === ",query.data)
const post = query.data&&query?.data[0]
    return (
        <div className='w-full min-h-screen  flex flex-col items-center justify-start gap-2'>
            <div className="w-[95%] md:w-[60%] flex flex-col  items-center justify-start">

            <div className="w-[95%]  p-2 flex flex-col  border-black border-2 
            dark:border-[1px]  dark:border-white rounded-lg bg-purple-900
         
            ">
            <QueryStateWrapper 
            query={query}

            >
            <div className='animate-in ease-in duration-700'>
                <PostsCard item={post as CustomPostType} user={user} />
            </div>
           
            </QueryStateWrapper>

        </div>

            <div className="w-[90%] ">
            <Replies 
            parent={post?.post_id as string} 
            user={user}
            profile={profile??"general"} 
            depth = {parseInt(depth as string)}/>
            </div>

        </div>

        </div>
    );
}