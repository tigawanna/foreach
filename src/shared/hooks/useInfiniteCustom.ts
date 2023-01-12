import dayjs from "dayjs";
import { pb_url } from "../../utils/env";
import { PBUser } from "../../utils/types/types";
import {
    UseInfiniteQueryOptions,
    useInfiniteQuery,
    useQuery,
    UseQueryOptions
} from "@tanstack/react-query";

interface PaginationDeps {
    pageParam: {
        created: string;
        id: string;
    };
}

const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");

const fetchPosts = async (user: PBUser, deps?: Partial<PaginationDeps>) => {
    // console.log("page params dependaces === ", deps, deps.pageParam?.id)
    const postsUrl = new URL(`  ${pb_url}/custom_posts`);
    postsUrl.searchParams.set("id", deps?.pageParam?.id as string);
    postsUrl.searchParams.set("user", user?.id as string);
    postsUrl.searchParams.set("created", deps?.pageParam?.created ?? (currentdate as string));

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
export const useInfiniteCustom = <T>(
    key: string,
    user: PBUser,
    options?:
        | Omit<UseInfiniteQueryOptions<T[], unknown, T[], T[], string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    // custom-posts uses a where clause to paginate and needs the current
    //date formatted in sqlite date format as the starting point

    return useInfiniteQuery<T[], unknown, T[], string[]>([key], () => fetchPosts(user), options);
};

export const useCustomPosts = <T>(
   user: PBUser,
   key:string[],
   options?:
        | (Omit<UseQueryOptions<T[], unknown, T[], string[]>,
              "queryKey" | "queryFn" | "initialData"
          > & { initialData?: (() => undefined) | undefined })
        | undefined
) => {
    return useQuery<T[], unknown, T[], string[]>(key, 
    () => fetchPosts(user),
    options
    );
};


