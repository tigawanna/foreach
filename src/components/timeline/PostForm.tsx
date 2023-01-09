import { useQueryClient, useMutation } from '@tanstack/react-query';
import React from 'react'
import { client } from '../../utils/pb/config';
import { concatErrors } from '../../utils/utils';
import { Record } from 'pocketbase';
import { PBUser } from '../../utils/types/types';
import { Mutationprops } from './../form/types';
import { PlainForm } from './PlainForm';


interface PostFormProps {
user:PBUser
setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const PostForm = ({user,setIsOpen}: PostFormProps) => {
    const [error, setError] = React.useState({ name: "", message: "" })
    const [response, setResponse] = React.useState<Record | undefined>();
    
    
const mutation = useMutation(async ({ collection,payload }: Mutationprops) => {
     try {
        const record = await client.collection(collection).create(payload);
        setResponse(record);
        } catch (e) {
                throw e;
        }
        },
        {
            onError: (err: any) => {
                // console.log("errror adding new post in ", err.data);
                setError({
                    name: "main",
                    message: concatErrors(err)
                });
            },
            onSettled:()=>{
                setIsOpen(false)
            }
        }
    );


return (
 <div className='w-full h-full flex flex-col items-center justify-center'>
        {/* <SocialForm user={user} mutation={mutation}/> */}
   <PlainForm 
   error={error}
   mutation={mutation}
   setError={setError}
   user={user}
   setIsOpen={setIsOpen}
   />
    <div className="m-1 w-[90%] flex  flex-col items-center justify-center">
        {error?.message === "" && response?.id ? (
        <div className=" w-fit text-center line-clamp-3 p-2 bg-green-100 border-2
         border-green-800 text-green-900  rounded-xl text-lg">
            post added
        </div>
        ) : null}

        {error?.message !== "" ? (
        <div className="m-1 w-full text-center  line-clamp-4 p-2 bg-red-100 border-2 border-red-800 text-red-900  rounded-xl">
                {error.message}
        </div>
        ) : null}
      </div>

 </div>
);
}




