import { useInfiniteQuery, QueryFunctionContext } from "@tanstack/react-query";
import { getTenants } from "./pb/config";

export function useInfiniteHook(){
    return useInfiniteQuery(
    {
        queryKey:['infinite'],
        queryFn:getTenants,
        defaultPageParam:0,
        getNextPageParam: (lastPage, pages) => lastPage.page + 1,

    }
    )
}

