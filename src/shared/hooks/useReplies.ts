import { ListResult } from "pocketbase";
import { client } from "../../utils/pb/config";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { RepliesType } from "../../utils/types/types";

const fetchReplies = async (post: string) => {
    try {
        const replies = await client.collection("replies").getList(1, 50, {
            filter: `post="${post}"`,
            expand: "user,post,parent"
        });
      
        return replies as unknown as ListResult<RepliesType>;
    } catch (e) {
        throw e;
    }
};


export const useReplies=(key:string[],post_id:string)=>{
   return  useQuery(key,()=>fetchReplies(post_id) )  
}

export const useInfiniteReplies=()=>{

}

