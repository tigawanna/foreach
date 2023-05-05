/* eslint-disable no-var */
import { startClient } from "rakkasjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AppUser, getUser, pb } from "./state/pb/config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      staleTime: 100,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

function setQueryData(data: Record<string, unknown>) {
  for (const [key, value] of Object.entries(data)) {
    queryClient.setQueryData(JSON.parse(key), value, { updatedAt: Date.now() });
  }
}

declare global {
  var $TQD: Record<string, unknown> | undefined;
  var $TQS: typeof setQueryData;
}

// Insert data that was already streamed before this point
setQueryData(globalThis.$TQD ?? {});
// Delete the global variable so that it doesn't get serialized again
delete globalThis.$TQD;
// From now on, insert data directly
globalThis.$TQS = setQueryData;

startClient({
  hooks: {
    beforeStart() {
      queryClient.fetchQuery({ queryKey: ['user'], queryFn:()=>getUser(document.cookie) })
      .then(res=>{console.log("prefectched query ====> ",res)})
      pb.authStore.onChange(() => {
        const auth_store = pb.authStore.exportToCookie({ httpOnly: false })
        document.cookie = auth_store;
      });
    },
   async extendPageContext(ctx) {
      ctx.locals.tan_queryClient=queryClient
      const user = queryClient.getQueryData<AppUser>(['user'])
      console.log("user passed into loacl ctx ===> ",user)
      ctx.locals.auth = user

      // Add properties to the page context,
      // especially to ctx.locals.
      // Extensions added here will only be
      // available on the client-side.
    },
    wrapApp(app) {
      return (
        <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
      );
    },
  },
});
