import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer';
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { ReplyCard } from './RepliesCard';
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useInfiniteCustomPosts } from '../../utils/hooks/useCustomPosts';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Profile } from './../../pages/profile/Profile';
import { PostSkeleton } from './../../shared/loaders/PostSkeleton';

interface RepliesProps {
depth:number
parent:string
user:PBUser;
profile:string
}

export const REPLIES_KEY = 'custom_replies'
export const Replies = ({depth,parent,user,profile}:RepliesProps) => {
//  const query = useReplies(['replies',post_id],post_id)
const { ref, inView } = useInView()
const navigate = useNavigate()   
console.log("parent in replies ",profile)
    const query = useInfiniteCustomPosts<CustomPostType>(
        { key: REPLIES_KEY,
            user,
             post_id:parent,
             depth:depth + 1,
             profile
            }, {
        getNextPageParam: (lastPage, allPages) => {
            // console.log("last page ==== ",lastPage,allPages)
            if (lastPage && lastPage[lastPage.length - 1]) {
                return {
                    created: lastPage[lastPage?.length - 1]?.created_at,
                    id: lastPage[lastPage?.length - 1]?.post_id
                };
            }
            return;
        }
    })

    useEffect(() => {
        if (inView) {
            query.fetchNextPage()
        }
    }, [inView])

//  console.log("replies list==== ",query.data)
    const data = query.data
    if (data?.pages&&data?.pages?.length < 1){
        <div className='w-full h-full  flex flex-col  items-center justify-center '>
            Nothing to see here
        </div>
    }

return (
    <div className='w-full h-full  flex flex-col  items-center justify-center '>
        <QueryStateWrapper 
            loader={<PostSkeleton length={6} />}
        query={query}>
            <div className='w-full h-full  flex flex-col gap-2 items-center justify-start'>
            
            <div className='w-[95%] min-h-full flex flex-col items-center justify-center gap-2 py-2'>
                {data?.pages?.map((page) => {
           
                    return page.map((item) => {
                        // console.log("reply items depth === ",item)
                        return (
                            <div
                                onClick={() => navigate({
                                    pathname: '../' + item.post_id,
                                    search: createSearchParams({
                                        depth: (item.post_depth === "" ? 0 : item.post_depth).toString()
                                    }).toString(),
                                },
                                )
                            }
                        key={item.post_id}
                        className="w-[95%]  p-2 flex flex-col  border-black border-2 
                        dark:border-[1px]  dark:border-white rounded-lg gap-3">
                                <ReplyCard reply={item} user={user} />
                            </div>
                        )
                    })

                })
                }
            </div>

            <div className='w-full flex-center'>
                <button ref={ref}
                    onClick={() => query.fetchNextPage()}
                    disabled={!query.hasNextPage || query.isFetchingNextPage}>
                    {query.isFetchingNextPage ? 'Loading more...' : query.hasNextPage ? 'Load More'
                        : !query.isLoading ? '...' : null}</button>
            </div>
            </div>
  
        
        
        </QueryStateWrapper>
    </div>
        
        
        



);
}
