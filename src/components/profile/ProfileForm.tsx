import React from "react";
import {  useMutation } from "@tanstack/react-query";
import { concatErrors } from "./../../utils/utils";

import { PBUser } from "../../utils/types/types";
import { updateProfile } from "./../../utils/api/mutations";
import { Record } from "pocketbase";
import { useStroreValues } from "../../utils/zustand/store";
import { PlainFormButton } from './../form/FormParts';
import {  RequiredProfileFormFields } from "../../utils/types/form";


interface ProfileFormProps {
    user: PBUser;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
}

export const ProfileForm = ({user,setIsOpen}: ProfileFormProps) => {

    const [error, setError] = React.useState({ name: "", message: "" });
    const [input, setInput] = React.useState<RequiredProfileFormFields>(
        {bio:user?.bio,
            displayname:user?.displayname,
              avatar:user?.avatar,
                accessToken:user?.accesstoken});
    const [response, setResponse] = React.useState<Record | undefined>();

    const store = useStroreValues()
    interface Mutationprops {
        user_id: string;
        vals: RequiredProfileFormFields;
    }

   
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setInput(prev => {
            return { ...prev, [e.target.id]: e.target.value };
        });
        if (error.message !== "" || error.name !== "") {
            setError({ name: "", message: "" });
        }
    };

    const mutation = useMutation(
        async ({ user_id, vals }: Mutationprops) => {
            try {
                const res = await updateProfile({
                    user_id,
                    accessToken: vals?.accessToken,
                    avatar:vals?.avatar,
                    displayname: vals?.displayname,
                    // @ts-expect-error
                    bio:vals?.bio
                });
                setResponse(res);
            } catch (e) {
                throw e;
            }
        },
        {
            onSuccess:()=>{
                setInput({ bio: "", displayname: "", avatar: "", accessToken: "" })
                setIsOpen(false)
                store.updateNotification({ message: "profile changes saved", type: "success" })
                
            },
            onError: (err: any) => {
                //no-console("errror adding bill in ", err.data);
                setError({
                    name: "main",
                    message: concatErrors(err)
                });
            }
        }
    );

   const disableButton = (vals: typeof input) => {
        // //no-console("input === ",input)
        if (vals.displayname !== "" || vals.bio) {
            return false;
        }
        return true;
    };
    const isError = (err: typeof error, label: keyof RequiredProfileFormFields) => {
        if (err.name === label && err.message !== "") {
            return true;
        }
        return false;
    };
  const onSubmit = (event?: React.BaseSyntheticEvent<object, any, any>) => {
    event?.preventDefault()
    mutation.mutate({ user_id: user?.id as string, vals:input });

  };

    return (
        <div className="w-full h-full p-2 flex items-center justify-center  rounded-xl ">
            <form
                className="w-full md:w-[60%] h-full rounded-xl p-2 border-2
                flex  flex-col items-center justify-center gap-2
                bg-white dark:bg-black"
                onSubmit={onSubmit}>

                <div className="w-[90%] py-2 text-3xl font-bold">
                Update Profile
                </div>
                
        
                
            <div className="flex flex-col items-center justify-center w-full ">
            <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
               Display name
            </label>
          
                <input
                style={{ borderColor: isError(error, "displayname") ? "red" : "" }}
                className="w-[90%] p-2 m-1 border border-black 
                dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
                id={"displayname"}
                            type={"text"}
                            placeholder={"your prefered displayname"}
                            onChange={handleChange}
                            autoComplete={"off"}
                            value={input.displayname}
                        />
                       
                    {isError(error, "displayname") ? (
                        <div className="text-base  text-red-600">{error.message}</div>
                    ) : null}
                </div>
                <div className="flex flex-col items-center justify-center w-full ">
                    <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
                        Avatar url
                    </label>

                    <input
                        style={{ borderColor: isError(error, "avatar") ? "red" : "" }}
                        className="w-[90%] p-2 m-1 border border-black 
                dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
                        id={"avatar"}
                        type={"url"}
                        placeholder={"add custom avatar url"}
                        onChange={handleChange}
                        autoComplete={"off"}
                        value={input.avatar}
                    />

                    {isError(error, "displayname") ? (
                        <div className="text-base  text-red-600">{error.message}</div>
                    ) : null}
                </div>


                <div className="flex flex-col items-center justify-center w-full ">
                    <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
                        bio
                    </label>

   
                <textarea
                    id="bio"
                    style={{ borderColor: isError(error, "bio") ? "red" : "" }}
                    className="w-[90%] min-h-[100px] md:h-[30%]
                    m-2 p-2  border border-black dark:border-white text-base rounded-lg
                    dark:bg-slate-700focus:border-2 dark:focus:border-4 focus:border-purple-700
                    dark:focus:border-purple-600 "
                    onChange={handleChange}
                    placeholder="bio "
                        />
         
                    {isError(error, "bio") ? (
                        <div className="text-base  text-red-600">{error.message}</div>
                    ) : null}
                </div>

  
                
                <PlainFormButton
                    disabled={disableButton(input)}
                    isSubmitting={mutation.isLoading}
                    label={"save changes"}
                />

               
               
               
                <div className="w-[90%] flex  flex-col items-center justify-center">
                        {error?.message !== "" ? (
                        <div className=" w-full line-clamp-4 p-2 bg-red-100 border-2 border-red-800
                         text-red-900  rounded-xl">
                            {error.message}
                        </div>
                    ) : null}
                </div>


            </form>
        </div>
    );
};
