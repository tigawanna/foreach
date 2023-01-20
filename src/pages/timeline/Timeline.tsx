import {useState,useEffect} from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useInView } from 'react-intersection-observer'
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { FaPlus } from 'react-icons/fa';
import { TheIcon } from '../../shared/wrappers/TheIcon';
import { PostsCard } from './../../components/timeline/PostCard';
import { ReactModalWrapper } from './../../shared/wrappers/ReactModalWrapper';
import { PostForm } from '../../components/timeline/PostForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { client } from './../../utils/pb/config';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useInfiniteCustomPosts } from './../../utils/hooks/useCustomPosts';
import { useStroreValues } from './../../utils/zustand/store';
import { Mutationprops } from '../../utils/types/form';


interface TimelineProps {
    user: PBUser
    profile:string
}
export const POSTS_KEY = 'custom_posts'

export const Timeline = ({user,profile}: TimelineProps) => {


const { ref, inView } = useInView()
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate()   
const queryClient = useQueryClient();

const store = useStroreValues()

const customPostsQuery = useInfiniteCustomPosts<CustomPostType>(
{key:POSTS_KEY,user,depth:0,post_id:"",profile},{
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
        customPostsQuery.fetchNextPage()
    }
}, [inView])

    const mutation = useMutation(async ({ basepayload }: Mutationprops) => {
        basepayload.append("depth", '0')
        try {
            return await client.collection('posts').create(basepayload);
        }
        catch (e) {
            throw e;
        }
    },{
        onSuccess:()=>{
            store.updateNotification({ message: "posted", type: "success" })
        },
        onSettled: () => {
           
            queryClient.invalidateQueries([POSTS_KEY]);
        }
    });


const data = customPostsQuery.data
// console.log("custom query === ",data)
return (
<QueryStateWrapper query={customPostsQuery}>
    <div className='w-full min-h-full  flex flex-col gap-2 items-center justify-center'>
        <div className='w-[95%] h-full flex flex-col items-center justify-center gap-2 py-2'>
            {data?.pages?.map((page) => {
                    // console.log("page=== ",page)
                    return page.map((item) => {
                        return (
                        <div
                        onClick={() => {
                            navigate({
                            pathname: '../../post/' + item.post_id,
                            search: createSearchParams({
                                depth:(item.post_depth===""?0:item.post_depth).toString(),
                                profile:profile??"general"
                            }).toString()
                            })}
                                }
                        key={item.post_id}
                        className="w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
                        dark:border-[1px]  dark:border-white rounded-lg gap-3">   
                        <PostsCard item={item}  user={user} />
                        </div>

                        )
                    })
                  
                })
                }
        </div>

    <div className='w-fit flex-center rounded-full aspect-square  p-2 bg-purple-900 text-white 
     fixed bottom-[10%] right-[5%]'>
            <TheIcon Icon={FaPlus} size={'40'} iconAction={() => setIsOpen(true)} />
        </div>
        
            <ReactModalWrapper
                child={
                    <div 
                    // onClick={(event) => event.stopPropagation()}
                    className='z-50'>
                    <PostForm
                        user={user}
                        setIsOpen={setIsOpen}
                        mutation={mutation}
                        label='post'
                    />
                    </div>
                    }
                closeModal={() => setIsOpen(false)}
                delay={0}
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
