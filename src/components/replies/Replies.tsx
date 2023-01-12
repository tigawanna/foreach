import React from 'react'
import { useInfiniteReplies, useReplies } from './../../shared/hooks/useReplies';
import { isHtmlElement } from 'react-router-dom/dist/dom';
import { useInView } from 'react-intersection-observer';

interface RepliesProps {
post_id:string
}

export const Replies = ({post_id}:RepliesProps) => {
//  const query = useReplies(['replies',post_id],post_id)
const { ref, inView } = useInView()
const query = useInfiniteReplies(['replies', post_id], post_id,{
    getNextPageParam: (lastPage, allPages) => {
        // console.log("last page ==== ",lastPage,allPages)
        if (lastPage && (lastPage.page < lastPage.totalPages)) {
            // console.log("last page ==== ",lastPage.page,lastPage.totalPages)
            return {
                page:lastPage.page + 1
            }
        }
        return;
    }
})
    React.useEffect(() => {
        if (inView) {
            query.fetchNextPage()
        }
    }, [inView])
 console.log("replies list==== ",query.data)
return (
 <div className='w-full h-full flex flex-col items-center justify-start'>
        
        
        
        
        <div>
            <button ref={ref}
                onClick={() => query.fetchNextPage()}
                disabled={!query.hasNextPage || query.isFetchingNextPage}>
                {query.isFetchingNextPage ? 'Loading more...' : query.hasNextPage ? 'Load More'
            : !query.isLoading ? 'Nothing more to load' : null}</button>
        </div>

 </div>
);
}
