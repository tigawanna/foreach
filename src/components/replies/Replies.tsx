import React from 'react'

import { isHtmlElement } from 'react-router-dom/dist/dom';
import { useInView } from 'react-intersection-observer';
import { QueryStateWrapper } from './../../shared/wrappers/QueryStateWrapper';
import { ReplyCard } from './RepliesCard';
import { useNavigate } from 'react-router-dom';
import { CustomRepliesType, PBUser } from '../../utils/types/types';
import { useInfiniteCustomRelies } from './../../utils/hooks/useCustomReplies';

interface RepliesProps {
op:string
parent:string
user:PBUser
}

export const Replies = ({op,parent,user}:RepliesProps) => {
//  const query = useReplies(['replies',post_id],post_id)
const { ref, inView } = useInView()
    const navigate = useNavigate()

const query = useInfiniteCustomRelies<CustomRepliesType>('custom-replies',{op,parent,user},{
    getNextPageParam: (lastPage, allPages) => {
        // console.log("last page ==== ",lastPage,allPages)
        // console.log("last page ==== ",lastPage,allPages)
        if (lastPage && lastPage[lastPage.length - 1]) {
            return {
                created: lastPage[lastPage?.length - 1]?.replied_at,
                id: lastPage[lastPage?.length - 1]?.
            };
        }
        return;
    }
})
    React.useEffect(() => {
        if (inView) {
            query.fetchNextPage()
        }
    }, [inView])
//  console.log("replies list==== ",query.data)
    const data = query.data
return (
    <div className='w-full h-full  flex flex-col  items-center justify-center '>
        <QueryStateWrapper query={query}>
            <div className='w-full h-full  flex flex-col gap-2 items-center justify-start'>
            <div className='w-[95%] min-h-full flex flex-col items-center justify-center gap-2 py-2'>
                {data?.pages?.map((page) => {
           
                    return page.items.map((item) => {
                        return (
                            <div
                                // onClick={() => navigate('post/' + item.post_id)}
                        key={item.id}
                        className="w-[90%] md:w-[50%]  p-2 flex flex-col  border-black border-2 
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
                        : !query.isLoading ? 'Nothing more to load' : null}</button>
            </div>
            </div>
  
        
        
        </QueryStateWrapper>
    </div>
        
        
        



);
}
