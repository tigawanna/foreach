import { PageRouteGuard } from "rakkasjs";

export const pageGuard: PageRouteGuard = (ctx) => {
    console.log("card guard ctx.locals ==== >",ctx.locals)
    if(!ctx.locals.has_pb_cookie){
         return { redirect: "/auth" };
    }

    return true;
};
