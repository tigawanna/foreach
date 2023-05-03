import { LoadMoreButton } from "@/src/components/shared/wrappers/LoadMoreBitton";
import { getTenants } from "@/src/state/pb/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface TenantsProps {}

export function Tenants({}: TenantsProps) {
  const { ref, inView } = useInView();
  const query = useInfiniteQuery({
    queryKey: ["infinite"],
    queryFn: getTenants,
    defaultPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.totalPages < lastPageParam + 1) {
        return undefined;
      }

      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, lastPageParam) => {
      if (firstPage.totalPages < lastPageParam - 1) {
        return undefined;
      }
      return lastPageParam - 1;
    },
  });
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (inView) {
      query.fetchNextPage();
    }
  }, [inView]);

  const data = query.data;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div
        ref={listRef}
        className="flex h-full w-[95%] flex-col items-center justify-center gap-2 py-2"
      >
        {data?.pages?.map((page) => {
          // //no-console("page=== ",page)
          return page.items.map((item) => {
            return (
              <div
                key={item.id}
                className="flex w-[90%]  gap-3 rounded-lg   border-2 border-black 
                        p-2  dark:border-[1px] dark:border-white md:w-[50%]"
              >
                <div className="flex items-center justify-center border">
                  <div className="text-xl font-bold">{item.name}</div>
                  <div className="">{item.email}</div>
                  <div className="">{item.created}</div>
                </div>
              </div>
            );
          });
        })}
      </div>

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

      <div>
        {query.isFetching && !query.isFetchingNextPage ? "Fetching..." : null}
      </div>
    </div>
  );
}
