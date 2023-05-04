import { PageContext } from "rakkasjs";
import { AppUser } from "./state/pb/config";

declare module "rakkasjs" {
    interface ServerSideLocals {
        auth: AppUser

    }

    interface PageLocals  {
        auth:AppUser ;
  
    }
}
