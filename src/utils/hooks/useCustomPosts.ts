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
    key: string;
    post_id?: string; //can also be the parent query param
    depth?: number;
    profile?: string;
    get_one_post?: boolean;
}

const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");

export const fetchPosts = async (
    query_vars: QueryVariables,
    pagination_params?: Partial<Pagination_params>
) => {
    // //no-console(" query vars === ", query_vars);

    const postsUrl = new URL(`${pb_url}/${query_vars.key}`);
    const { user, depth, post_id, profile } = query_vars;

    if (query_vars.get_one_post) {
        postsUrl.searchParams.set("id", query_vars.post_id as string);
        postsUrl.searchParams.set("user", user?.id as string);
        postsUrl.searchParams.set("limit", "5");
    } else {
        postsUrl.searchParams.set("id", pagination_params?.pageParam?.id as string);
        postsUrl.searchParams.set("depth", depth?.toString() as string);
        postsUrl.searchParams.set("profile", profile ?? "general");
        postsUrl.searchParams.set("parent", post_id ?? "original");
        postsUrl.searchParams.set("limit", "5");
        postsUrl.searchParams.set("user", user?.id as string);
        postsUrl.searchParams.set(
            "created",
            pagination_params?.pageParam?.created ?? (currentdate as string)
        );
    }

    const url = postsUrl.toString();
    // const url = `${pb_url}/custom_posts/?id=${deps?.pageParam?.id ?? ""}&user=${
    //     user?.id ?? ""
    // }&created=${deps?.pageParam?.created ?? currentdate}`;

    let headersList = {
        Accept: "*/*"
    };
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: headersList
        });
        const data = await response.json();
        //no-console("response === ", data);
        if (data.code === 400) {
            throw new Error(data.message);
        }
        return data;
    } catch (e: any) {
        //no-console("error fetching custom ", e);
        throw new Error(e.message);
    }
};
export const useInfiniteCustomPosts = <T>(
    query_vars: QueryVariables,
    options?:
        | Omit<UseInfiniteQueryOptions<T[], unknown, T[], T[], string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    // custom-posts uses a where clause to paginate and needs the current
    //date formatted in sqlite date format as the starting point

    const { user, key,post_id,depth,profile } = query_vars;
    return useInfiniteQuery<T[], unknown, T[], string[]>(
        [key, user?.id as string, post_id as string, depth?.toString() as string,profile as string],
        params => fetchPosts(query_vars, params),
        options
    );
};

export const useCustomPosts = <T>(
    query_vars: QueryVariables,
    options?:
        | (Omit<
              UseQueryOptions<T[], unknown, T[], string[]>,
              "queryKey" | "queryFn" | "initialData"
          > & { initialData?: (() => undefined) | undefined })
        | undefined
) => {
    const { key,user, depth, post_id,profile } = query_vars;
    return useQuery<T[], unknown, T[], string[]>(
        [key, user?.id as string, post_id as string, depth?.toString() as string,profile as string],
        () => fetchPosts(query_vars),
        options
    );
};


