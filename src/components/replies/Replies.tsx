import React from 'react'
import { useReplies } from './../../shared/hooks/useReplies';

interface RepliesProps {
post_id:string
}

export const Replies = ({post_id}:RepliesProps) => {
 const query = useReplies(['replies',post_id],post_id)
 console.log("replies ==== ",query.data?.items)
return (
 <div className='w-full h-full flex flex-col items-center justify-start'>

 </div>
);
}
