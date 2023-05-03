import { getPosts } from "@/src/state/api/posts";
import { useQuery } from "@tanstack/react-query";

interface TimelineProps {

}

export function Timeline({}:TimelineProps){
    const query = useQuery({
        queryKey:['posts'],
        queryFn:getPosts
    })
const data = query.data?.items
console.log("data",data)
return (
 <div className='w-full h-full flex items-center justify-center'>

 </div>
);
}
