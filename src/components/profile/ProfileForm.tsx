import React from 'react'
import { useForm } from "react-hook-form";
import { RequiredFormFields } from '../form/types';
import { useMutation } from '@tanstack/react-query';
import { concatErrors } from './../../utils/utils';
import { FormInput, FormButton } from '../form/FormParts';
import { PBUser } from '../../utils/types/types';
import { updateProfile } from './../../utils/api/mutations';
import { Record } from 'pocketbase';


interface ProfileFormProps {
user:PBUser
}

export const ProfileForm: React.FC<ProfileFormProps> = ({user}) => {
const form_stuff = useForm<RequiredFormFields>();
const [error,setError]=React.useState({name:"",message:""})
    const [response, setResponse] = React.useState<Record | undefined>()

const onSubmit = (data: RequiredFormFields, event?: React.BaseSyntheticEvent<object, any, any>) => {
 console.log("handle submit data === ", data)
    mutation.mutate({user_id:user?.id as string,vals:data})
 };
interface Mutationprops{
    user_id:string;
    vals: RequiredFormFields
}
const mutation = useMutation(
  async ({user_id,vals}:Mutationprops) => {
    
    try {
    const res = await updateProfile({
    user_id,
    accessToken:vals?.accessToken,
    avatar:vals?.avatar,
    displayname:vals?.displayname
    })
    setResponse(res)
    } catch (e) {
      throw e;
    }
  },
  {
    onError: (err: any) => {
      console.log(
        "errror adding bill in ",
        err.data
      );
      setError({
        name: "main",
        message: concatErrors(err),
      });
    },
  }
);

return (
 <div className='w-full h-full '>
        <form
            className='w-full h-full flex  flex-col items-center justify-center gap-2'
            onSubmit={form_stuff.handleSubmit(onSubmit)}>
            <FormInput
                styles={{ width: '90%',  }}
                label='avatar' form_stuff={form_stuff} defaultValue={user?.avatar} />
            <FormInput
                styles={{ width: '90%',}}
                label='displayname' form_stuff={form_stuff} defaultValue={user?.displayname} />
            <FormInput
                styles={{ width: '90%',  }}
                label='accessToken' form_stuff={form_stuff} defaultValue={user?.accessToken} />   

            <FormButton form_stuff={form_stuff} />
          
            <div className='w-[90%] flex  flex-col items-center justify-center'>
                {error?.message === "" && response?.id ? 
                <div className=" w-[90%] line-clamp-3 p-2 bg-green-100 border-2 border-green-800 text-green-900  rounded-xl">
                  Success ! {JSON.stringify(response)}
                </div>: null}
                
                
                {error?.message !== "" ?
                <div className=" w-full line-clamp-4 p-2 bg-red-100 border-2 border-red-800 text-red-900  rounded-xl">
                    {error.message}
               </div>: null}
            </div>
        </form>
 </div>
);
}
