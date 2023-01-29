import { CustomPostType, PBUser } from '../../utils/types/types';
import { Params, useLoaderData, useParams, useSearchParams } from 'react-router-dom';
import { PostsCard } from '../../components/timeline/PostCard';
import { Replies } from '../../components/replies/Replies';
import useScrollToTopOnRouteChange from '../../utils/hooks/useScrollToTop';
import { QueryClient, useQuery } from '@tanstack/react-query';
import { fetchPosts } from './../../utils/hooks/useCustomPosts';
import { POSTS_KEY } from './../timeline/Timeline';



interface PostProps {
    user: PBUser
}
type CustomParams={id:string}


export const CUSTOM_ONE_POST_KEY ="custom_one_post" 
export const Post = ({user}: PostProps) => {


useScrollToTopOnRouteChange();

const [searchParams] = useSearchParams({});
const depth = searchParams.get('depth')
const profile = searchParams.get('profile')
const params = useParams<CustomParams>()


const preloaded_post = useLoaderData() as CustomPostType[]

console.log("preloaded posts ===>> ",preloaded_post)
const query_key = [CUSTOM_ONE_POST_KEY, user?.id as string, params.id, depth?.toString() as string, profile as string]
    const query = useQuery<CustomPostType[], unknown, CustomPostType[], any>({
        ...onePostQuery({
            depth:parseInt(depth as string) as number | undefined,
            post_id: params?.id as string,
            profile:profile as string | undefined,
            query_key
        },user),
        preloaded_post
    })

// console.log("data ==== ",query.data)
    // const post_res = queryClient.getQueryData<CustomPostType[]>(test_key)?.
    //     find(post => post.post_id === params.id)
    // console.log("post prefetch ===>>>>>", post_res)

// const query = useCustomPosts<CustomPostType>(
// {   key:CUSTOM_ONE_POST_KEY, 
//     user,
//     post_id:params.id,
//     depth:parseInt(depth as string),
//     profile:profile??"general",
//     get_one_post:true
    
// },{
//     // select:(data)=>{
//     //     if(data&&params.id){
//     //         return data?.filter((item)=>item.post_id===params.id)
//     //     }
//     //     return data
//     // }
// })


//no-console("posts query === ",query.data)
// const post = query.data&&query?.data[0]
    const post = query.data&&query.data[0]
    return (
        <div className='w-full min-h-screen  flex flex-col items-center justify-start gap-2'>
            <div className="w-[95%] md:w-[60%] flex flex-col  items-center justify-start">

            <div className="w-[95%]  p-2 flex flex-col  border-black border-2 
            dark:border-[1px]  dark:border-white rounded-lg bg-purple-900
         
            ">
            {/* <QueryStateWrapper query={query}> */}
            <div className='animate-in ease-in duration-700'>
                <PostsCard item={post as CustomPostType} user={user} />
            </div>
           {/* </QueryStateWrapper> */}

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

export interface LoaderOptions {
    params:Params<"id">
    request: Request
}
interface OnePostQuertProps{
    query_key:any
    depth?:number;
    profile?:string
    post_id:string
}

const onePostQuery = (props:OnePostQuertProps,user:PBUser) => 


{    
   
   
    return {
    queryKey: props.query_key,
    queryFn: async () => fetchPosts({
    key: CUSTOM_ONE_POST_KEY,
    user,
    depth:props.depth,
    post_id:props.post_id,
    profile:props.profile,
    get_one_post:true
   }),
}}




export const loader =
    (queryClient:QueryClient,user:PBUser) =>
        async ({ params,request}:LoaderOptions) => {
            // console.log("params and request in loader ",params,request)

            const depth = parseInt(new URL(request.url).searchParams.get('depth') as string) as number | undefined;
            const profile = new URL(request.url).searchParams.get('profile') as string | undefined;
            const query_key = [CUSTOM_ONE_POST_KEY, user?.id as string,"", depth?.toString() as string, profile as string]
            const timeline_query_key = [POSTS_KEY, user?.id as string, "", depth?.toString() as string, profile as string]
            
            const query = onePostQuery({
                depth,
                post_id:params?.id as string,
                profile,
                query_key
            },user)
            // ⬇️ return data or fetch it
            return (
                queryClient.getQueryData(timeline_query_key)??
                (await queryClient.fetchQuery<CustomPostType[], unknown, CustomPostType[], (string | undefined)[]>(
                    query))
            )
        }
