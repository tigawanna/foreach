import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useInView } from 'react-intersection-observer'
import { useInfiniteCustom } from './../../utils/hooks/useInfiniteCustom';
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { PostsCard } from './../../components/timeline/PostCard';
interface TimelineProps {
    user: PBUser
}
interface Deps {
    pageParam: {
        created: string, id: string
    }
}



export const Timeline: React.FC<TimelineProps> = ({user}) => {
const { ref, inView } = useInView()

const customPostsQuery = useInfiniteCustom<CustomPostType>('custom-posts',user,{
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
React.useEffect(() => {
        if (inView) {
            customPostsQuery.fetchNextPage()
        }
}, [inView])

const data = customPostsQuery.data
// console.log("custom query === ",data)
return (
    <QueryStateWrapper query={customPostsQuery}>

        <div className='w-full min-h-full  flex flex-col gap-2 items-center justify-center
        '>
            <div className='w-[95%] h-full flex flex-col items-center justify-center gap-2 py-2'>
                {data?.pages.map((page) => {
                    // console.log("page=== ",page)
                    return page.map((item) => {
                        return <PostsCard item={item} key={item.post_id} user={user} />
                    })
                  
                })
                }
            </div>


            <div className='w-fit h-fit p-2 bg-slate-500 text-white rounded-full fixed bottom-[10%] right-[5%]'>
                <Link to={'/post/new'}>
                    <TheIcon Icon={FaPlus} size={'40'} />
                </Link>

            </div>
            <div>
                <button
                    ref={ref}
                    onClick={() => customPostsQuery.fetchNextPage()}
                    disabled={!customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage}
                >
                    {customPostsQuery.isFetchingNextPage ? 'Loading more...'
                        : customPostsQuery.hasNextPage ? 'Load More'
                            : !customPostsQuery.isLoading ? 'Nothing more to load' : null}
                </button>
            </div>

        </div>
    </QueryStateWrapper>
);
}
