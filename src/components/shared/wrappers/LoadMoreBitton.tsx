import { UseInfiniteQueryResult, InfiniteData } from "@tanstack/react-query";
interface LoadMoreBittonProps<T> {
    query: UseInfiniteQueryResult<InfiniteData<T>, Error>
    ref?: (node?: Element | null | undefined) => void 
}

export function LoadMoreButton<T,>({query,ref}:LoadMoreBittonProps<T>){
return (

    <button
        ref={ref}
        onClick={() => query.fetchNextPage()}
        disabled={!query.hasNextPage || query.isFetchingNextPage}
    >
        {query.isFetchingNextPage
            ? 'Loading more...'
            : query.hasNextPage
                ? 'Load More'
                : 'Nothing more to load'}
    </button>
);
}
