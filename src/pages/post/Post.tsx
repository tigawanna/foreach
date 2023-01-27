import { CustomPostType, PBUser } from '../../utils/types/types';
import { useCustomPosts } from '../../utils/hooks/useCustomPosts';
import { Params, useLoaderData, useParams, useSearchParams } from 'react-router-dom';
import { PostsCard } from '../../components/timeline/PostCard';
import { QueryStateWrapper } from '../../shared/wrappers/QueryStateWrapper';
import { Replies } from '../../components/replies/Replies';
import { POSTS_KEY } from './../timeline/Timeline';
import useScrollToTopOnRouteChange from '../../utils/hooks/useScrollToTop';
import { QueryClient } from '@tanstack/react-query';
import { fetchPosts } from './../../utils/hooks/useCustomPosts';
import { useQueryClient } from '@tanstack/react-query';

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
const queryClient = useQueryClient()
const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>

console.log("prefetched post  ===== ",initialData)
    // const test_key = ["custom_posts", "9y2ajkpj7xm0rh5", "qvvjeaf0m1rr1sw", "0", "general"]

    // const post_res = queryClient.getQueryData<CustomPostType[]>(test_key)?.
    //     find(post => post.post_id === params.id)
    // console.log("post prefetch ===>>>>>", post_res)

const query = useCustomPosts<CustomPostType>(
{   key:CUSTOM_ONE_POST_KEY, 
    user,
    post_id:params.id,
    depth:parseInt(depth as string),
    profile:profile??"general",
    get_one_post:true
    
},{
    // select:(data)=>{
    //     if(data&&params.id){
    //         return data?.filter((item)=>item.post_id===params.id)
    //     }
    //     return data
    // }
})


//no-console("posts query === ",query.data)
const post = query.data&&query?.data[0]
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

const onePostQuery = (props:LoaderOptions,user:PBUser) => 

{    
    const depth = parseInt(new URL(props.request.url).searchParams.get('depth') as string) as number | undefined;
    const profile = new URL(props.request.url).searchParams.get('profile') as string | undefined;
    const query_key = ["custom_one_post",user?.id as string, props.params.id, depth?.toString() as string, profile as string]
   
    return {
    queryKey: query_key,
    queryFn: async () => fetchPosts({
    key:"custom_one_post",
    user,
    depth,
    post_id:props.params.id,
    profile,
    get_one_post:true
   }),
}}



// export const loader =
//     ({ params, request, user }: LoaderOptions,queryClient:QueryClient) =>{
 
//             // const query = await onePostQuery(params,user)
//             // // ⬇️ return data or fetch it
//             // return (
//             //     queryClient.getQueryData(query.queryKey) ??
//             //     (await queryClient.fetchQuery(query))
//             // )
//             const depth = parseInt(new URL(request.url).searchParams.get('depth') as string) as number | undefined;
//             const profile = new URL(request.url).searchParams.get('profile') as string | undefined;
//         const query_key = ["custom_posts",user?.id as string,params.id, depth?.toString() as string, profile as string]
//         const test_key = ["custom_posts", "9y2ajkpj7xm0rh5", "qvvjeaf0m1rr1sw", "0", "general"]  
//             console.log("query key in data loadere === ",test_key)

//         const post = queryClient.getQueryData<CustomPostType[]>(query_key)?.
//             find(post => post.post_id  === params.id)
//             console.log("post prefetch ===>>>>>",post)
//             return post 
//         }
export const loader =
    (queryClient:QueryClient,user:PBUser) =>
        async ({ params,request}:LoaderOptions) => {
            console.log("params and request in loader ",params,request)
            const query = onePostQuery({params,request},user)
            // ⬇️ return data or fetch it
            return (
                queryClient.getQueryData(query.queryKey) ??
                (await queryClient.fetchQuery<CustomPostType[], unknown, CustomPostType[], (string | undefined)[]>(
                    query))
            )
        }
