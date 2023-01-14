import dayjs from "dayjs";
import { pb_url } from "../env";
import { PBUser } from "../types/types";
import {
    UseInfiniteQueryOptions,
    useInfiniteQuery,
    useQuery,
    UseQueryOptions
} from "@tanstack/react-query";

interface Pagination_params {
    pageParam: {
        created: string;
        id: string;
    };
}
interface QueryVariables {
    user: PBUser;
    op: string;
    parent: string;
}

const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");

const fetchPosts = async (
    query_vars: QueryVariables,
    pagination_params?: Partial<Pagination_params>
) => {
    // console.log("page params dependaces === ", pagination_params?.pageParam?.created)
    const { op, parent, user } = query_vars;
    const postsUrl = new URL(`  ${pb_url}/custom_replies`);
    postsUrl.searchParams.set("id", pagination_params?.pageParam?.id as string);
    postsUrl.searchParams.set("user", user?.id as string);
    postsUrl.searchParams.set("op", op);
    postsUrl.searchParams.set("parent", parent);
    postsUrl.searchParams.set(
        "created",
        pagination_params?.pageParam?.created ?? (currentdate as string)
    );

    const url = postsUrl.toString();
    // const url = `${pb_url}/custom_posts/?id=${pagination_params?.pageParam?.id ?? ""}&user=${
    //     user?.id ?? ""
    // }&created=${pagination_params?.pageParam?.created ?? currentdate}`;

    let headersList = {
        Accept: "*/*"
    };
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });
        const data = await response.json();
        console.log("response === ", data);
        if (data.code === 400) {
            throw new Error(data.message);
        }
        return data;
    } catch (e: any) {
        console.log("error fetching custom ", e);
        throw new Error(e.message);
    }
};

export const useInfiniteCustomRelies = <T>(
    key: string,
    query_vars: QueryVariables,
    options?:
        | Omit<UseInfiniteQueryOptions<T[], unknown, T[], T[], string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    // custom-posts uses a where clause to paginate and needs the current
    //date formatted in sqlite date format as the starting point
    const { op, parent, user } = query_vars;
    return useInfiniteQuery<T[], unknown, T[], string[]>(
        [key, op, parent, user?.id as string],
        params => fetchPosts(query_vars, params),
        options
    );
};

export const useCustomReplies = <T>(
    key: string,
    query_vars: QueryVariables,
    options?:
        | (Omit<
              UseQueryOptions<T[], unknown, T[], string[]>,
              "queryKey" | "queryFn" | "initialData"
          > & { initialData?: (() => undefined) | undefined })
        | undefined
) => {
    const { op, parent, user } = query_vars;
    return useQuery<T[], unknown, T[], string[]>(
        [key, op, parent, user?.id as string],
        () => fetchPosts(query_vars),
        options
    );
};
