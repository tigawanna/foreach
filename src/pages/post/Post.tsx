import React from 'react'
import { CustomPostType, PBUser } from '../../utils/types/types';
import { useCustomPosts } from '../../shared/hooks/useInfiniteCustom';
import { useParams } from 'react-router-dom';

interface PostProps {
    user: PBUser
}
type Params={id:string}

export const Post = ({user}: PostProps) => {
  const params = useParams<Params>()
    
  const query =useCustomPosts<CustomPostType>(user,{
    select:(data)=>{
        if(params.id){
            return data.filter((item)=>item.post_id===params.id)
        }
        return data
    }
 })

    console.log("posts query === ",query.data)

    return (
        <div className='w-full h-full flex-center-col'>

        </div>
    );
}
