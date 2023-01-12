import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useInView } from 'react-intersection-observer'
import { useInfiniteCustom } from '../../shared/hooks/useInfiniteCustom';
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { FaPlus } from 'react-icons/fa';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { PostsCard } from './../../components/timeline/PostCard';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { PostForm } from '../../components/timeline/PostForm';
import { useMutation } from '@tanstack/react-query';
import { Mutationprops } from './../../components/form/types';
import { client } from './../../utils/pb/config';
import { Link } from 'react-router-dom';

interface TimelineProps {
    user: PBUser
}

export const Timeline = ({user}: TimelineProps) => {
const { ref, inView } = useInView()
const [isOpen, setIsOpen] = React.useState(false);
    
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

    const mutation = useMutation(async ({ basepayload }: Mutationprops) => {
        try {
            return await client.collection('posts').create(basepayload);
        }
        catch (e) {
            throw e;
        }
    });


const data = customPostsQuery.data
console.log("custom query === ",data)
return (
<QueryStateWrapper query={customPostsQuery}>
    <div className='w-full min-h-full  flex flex-col gap-2 items-center justify-center'>
        <div className='w-[95%] h-full flex flex-col items-center justify-center gap-2 py-2'>
            {data?.pages?.map((page) => {
                    // console.log("page=== ",page)
                    return page.map((item) => {
                        return (
                        <Link
                        to={'post/'+item.post_id}
                        key={item.post_id}
                        className="w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
                        dark:border-[1px]  dark:border-white rounded-lg gap-3">   
                        <PostsCard item={item}  user={user} />
                        </Link>
                        )
                    })
                  
                })
                }
        </div>

    <div className='w-fit h-fit p-2 bg-slate-500 text-white rounded-full fixed bottom-[10%] right-[5%]'>
            <TheIcon Icon={FaPlus} size={'40'} iconAction={() => setIsOpen(true)} />
        </div>
        
            <ReactModalWrapper
                child={
                    <PostForm
                        user={user}
                        setIsOpen={setIsOpen}
                        mutation={mutation}
                        label='post'
                    />
            
            }
                closeModal={() => setIsOpen(false)}
                delay={2}
                isOpen={isOpen}
                styles={{
                    overlay_top: '0%',
                    overlay_right: '0%',
                    overlay_left: '0%',
                    overlay_bottom: '0%',
                    content_bottom: '2%',
                    content_right: '2%',
                    content_left: '2%',
                    content_top: '2%'

                }}/>

            <div>
        <button ref={ref}
            onClick={() => customPostsQuery.fetchNextPage()}
            disabled={!customPostsQuery.hasNextPage || customPostsQuery.isFetchingNextPage}>
                {customPostsQuery.isFetchingNextPage ? 'Loading more...': customPostsQuery.hasNextPage ? 'Load More'
                : !customPostsQuery.isLoading ? 'Nothing more to load' : null}</button>
            </div>

        </div>
    </QueryStateWrapper>
);
}
