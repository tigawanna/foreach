import dayjs from "dayjs";
import { pb_url } from "./../env";
import { PBUser } from "../types/types";
import { UseInfiniteQueryOptions, useInfiniteQuery } from "@tanstack/react-query";

interface PaginationDeps {
    pageParam: {
        created: string;
        id: string;
    };
}

export const useInfiniteCustom = <T>(
    key: string,
    user: PBUser,
    options?:
        | Omit<UseInfiniteQueryOptions<T[], unknown, T[], T[], string[]>, "queryKey" | "queryFn">
        | undefined
) => {
    // custom-posts uses a where clause to paginate and needs the current
    //date formatted in sqlite date format as the starting point
    const currentdate = dayjs(new Date()).format("[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]");

    const fetchPosts = async (deps?: Partial<PaginationDeps>) => {
        // console.log("page params dependaces === ", deps, deps.pageParam?.id)
        const url = `${pb_url}/custom_posts/?id=${deps?.pageParam?.id ?? ""}&user=${
        user?.id ?? ""}&created=${deps?.pageParam?.created ?? currentdate}`;
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

   return useInfiniteQuery<T[], unknown, T[], string[]>(
        [key],
        fetchPosts,
        options
    );


};

// getNextPageParam: (lastPage, allPages) => {
//     // console.log("last page ==== ",lastPage,allPages)
//     if (lastPage && lastPage[lastPage.length - 1]) {
//         return {
//             created: lastPage[lastPage?.length - 1]?.created_at,
//             id: lastPage[lastPage?.length - 1]?.post_id
//         };
//     }
//     return;
// };
