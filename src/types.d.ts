import { PageContext } from "rakkasjs";
import { AppUser } from "./state/pb/config";
import { QueryClient } from "@tanstack/react-query";

declare module "rakkasjs" {
    interface ServerSideLocals {
        auth: AppUser
        cookie?: string;
        has_pb_cookie?:boolean;
    }

    interface PageLocals  {
        auth?:AppUser ;
        tan_queryClient:QueryClient;
        cookie?:string;
        has_pb_cookie?:boolean;
  
    }
}
