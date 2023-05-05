import { PageContext } from "rakkasjs";
import { AppUser } from "./state/pb/config";
import { QueryClient } from "@tanstack/react-query";

declare module "rakkasjs" {
    interface ServerSideLocals {
        auth: AppUser
        cookie?: string;
    }

    interface PageLocals  {
        auth?:AppUser ;
        tan_queryClient:QueryClient;
        cookie?:string;
  
    }
}
