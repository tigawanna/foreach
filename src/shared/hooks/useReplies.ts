import { ListResult } from "pocketbase";
import { client } from "../../utils/pb/config";
import {
    QueryFunctionContext,
    UseInfiniteQueryOptions,
    UseQueryOptions,
    useInfiniteQuery,
    useQuery
} from "@tanstack/react-query";
import { RepliesType } from "../../utils/types/types";

const fetchReplies = async (post: string, params?: QueryFunctionContext<string[], any>) => {
    // console.log("pagination params  ==== ", params?.pageParam?.page);
    const page = params?.pageParam?.page??1;
    // const page = params?.pageParam[params?.pageParam?.lenngth - 1];
    // console.log("fetching page ?  ==== ", page);
    try {
        const replies = await client.collection("replies").getList(page, 1, {
            filter: `post="${post}"`,
            expand: "user,post,parent"
        });

        return replies as unknown as ListResult<RepliesType>;
    } catch (e) {
        throw e;
    }
};

export const useReplies = (
    key: string[],
    post_id: string,
    options?:
        | Omit<
              UseQueryOptions<ListResult<RepliesType>, unknown, ListResult<RepliesType>, string[]>,
              "initialData" | "queryFn" | "queryKey"
          >
        | undefined
) => {
    return useQuery(key, () => fetchReplies(post_id));
};

export const useInfiniteReplies = (
    key: string[],
    post_id: string,
    options?:
        | Omit<
              UseInfiniteQueryOptions<ListResult<RepliesType>,unknown,
                  ListResult<RepliesType>,ListResult<RepliesType>,string[]>,
              "queryFn" | "queryKey"
          >
        | undefined
) => {
    return useInfiniteQuery(key, (params) => fetchReplies(post_id,params),options);
};


//  options?: (Omit<UseQueryOptions<ListResult<RepliesType>, unknown, ListResult<RepliesType>, string[]>, 
//     "initialData" | "queryFn" | "queryKey"> & { ...; }) | undefined
