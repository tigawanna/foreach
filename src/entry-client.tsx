/* eslint-disable no-var */
import { startClient } from "rakkasjs";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { logNormal } from "./utils/general";
import { pb } from "./state/pb/config";

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
      // Do something before starting the client
      pb.authStore.onChange(() => {
        const auth_store = pb.authStore.exportToCookie({ httpOnly: false })
        console.log("auth changed")
        logNormal(auth_store)
        document.cookie = auth_store; // make sure to export with httpOnly: false also on the node client
      });
    },
    extendPageContext(ctx) {
      ctx.queryClient.setQueryData("user",pb.authStore.model)
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
