import { createRequestHandler } from "rakkasjs";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { uneval } from "devalue";
import { cookie } from "@hattip/cookie";
import { logNormal, logSuccess } from "./utils/general";
export default createRequestHandler({
  middleware: {
    beforePages: [cookie(),async(ctx)=>{
      logNormal("cookie context",ctx.cookie)
    }
    
    ]
  },
  createPageHooks() {
    let queries = Object.create(null);

    return {
      wrapApp(app) {
        const queryCache = new QueryCache({
          onSuccess(data, query) {
            // Store newly fetched data
            queries[query.queryHash] = data;
          },
        });

        const queryClient = new QueryClient({
          queryCache,
          defaultOptions: {
            queries: {
              suspense: true,
              staleTime: Infinity,
              refetchOnWindowFocus: false,
              refetchOnReconnect: false,
            },
          },
        });

        return (
          <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
        );
      },
      async extendPageContext(pageCtx) {
        // pageCtx.locals.auth
        // pageCtx.locals.user=
        // pageCtx.locals.auth = reqCtx.locals.auth;
        // pageCtx.locals.conduit = reqCtx.locals.conduit;
        // We'll prefetch this early on so that we can
        // access it in route guards.
        // pageCtx.queryClient.setQueryData(
        //   "user",
        //   await reqCtx.locals.conduit.getCurrentUser(),
        // );
      },
      emitToDocumentHead() {
        return `<script>$TQD=Object.create(null);$TQS=data=>Object.assign($TQD,data);</script>`;
      },

      emitBeforeSsrChunk() {
        if (Object.keys(queries).length === 0) return "";

        // Emit a script that calls the global $TQS function with the
        // newly fetched query data.

        const queriesString = uneval(queries);
        queries = Object.create(null);
        return `<script>$TQS(${queriesString})</script>`;
      },
    };
  },
  
});
