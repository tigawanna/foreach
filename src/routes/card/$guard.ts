import { PageRouteGuard } from "rakkasjs";

export const pageGuard: PageRouteGuard = (ctx) => {
    console.log("ctx.locals ==== >",ctx.locals)
    console.log("ctx.locals ==== >", ctx.requestContext?.platform)
    
    if(!ctx.locals.auth){
         return { redirect: "/auth" };
    }

    return true;
};
