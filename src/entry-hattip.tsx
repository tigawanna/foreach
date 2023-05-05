import { createRequestHandler } from "rakkasjs";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  useQuery
} from "@tanstack/react-query";
import { uneval } from "devalue";
import { cookie } from "@hattip/cookie";
import PocketBase,{Record} from 'PocketBase'
import {logError, logNormal, logSuccess} from "./utils/general";
import {AppUser, getUser, pb_url} from "./state/pb/config";

export default createRequestHandler({
  middleware: {
    beforePages: [
      // @ts-expect-error
      cookie(),async(ctx)=>{
         // @ts-expect-error
      const cookie =  ctx.cookie
      ctx.locals.cookie = cookie

        // queryClient.fetchQuery({ queryKey: ['user'], queryFn:()=>getUser(cookie) })
        //   .then(res => { console.log("prefectched query server side ====> ", res) })
        logNormal("hattip entry cookie  === ",cookie)
        if(cookie.pb_auth){
         logNormal("hattip entry pb auth pb_cookie  === ",cookie.pb_auth)
          ctx.locals.has_pb_cookie=true
        }else{
          logError("hattip entry cookie pb_auth cookie not found  === ",cookie.pb_auth)
          ctx.locals.has_pb_cookie=false
        }

    }
    
    ]
  },
  createPageHooks(ctx) {
  // console.log("create page hooks ctx === ",ctx.locals.cookie)
    let queries = Object.create(null);

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



    return {
      wrapApp(app) {
        // queryClient.fetchQuery({ queryKey: ['user'], queryFn: () => getUser(ctx.locals.cookie) })
        //   .then(res => { console.log("prefectched query server side ====> ", res) })

  
        return (
          <QueryClientProvider client={queryClient}>{app}</QueryClientProvider>
        );
      },
      async extendPageContext(local_ctx) {
        local_ctx.locals.has_pb_cookie = ctx.locals.has_pb_cookie
        // const user = await queryClient.getQueryData<AppUser>(['user'])
        // logNormal("user in server  == ",user)
       // ctx.locals.tan_queryClient = queryClient
        // const user = queryClient.getQueryData<AppUser>(['user'])
        // console.log("user passed into server ctx ===> ", user)
        // ctx.locals.auth = user
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
