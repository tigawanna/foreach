import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { concatErrors } from "./../../utils/utils";
import { PBUser } from "../../utils/types/types";
import { updateProfile } from "./../../utils/api/mutations";
import { useStroreValues } from "../../utils/zustand/store";
import { PlainFormButton } from "../form/FormButton";
import { RequiredProfileFormFields } from "../../utils/types/form";
import { FormInput } from "./../form/FormInput";
import { FormTextArea } from "./../form/FormTextArea";

interface ProfileFormProps {
    user: PBUser;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    label: string;
}

export const ProfileForm = ({ user, setIsOpen }: ProfileFormProps) => {

    const queryClient = useQueryClient();
    const [error, setError] = React.useState({ name: "", message: "" });
    const [input, setInput] = React.useState<RequiredProfileFormFields>({
        bio: user?.bio,
        displayname: user?.displayname,
        avatar: user?.avatar,
        accesstoken: user?.accesstoken,
        username: user?.username
    });

    const store = useStroreValues();
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
            // console.log("profiele update mutation vals  === ",vals)
            try {
                const res = await updateProfile({
                    user_id,
                    accesstoken: vals?.accesstoken,
                    avatar: vals?.avatar,
                    displayname: vals?.displayname,
                    bio:vals?.bio,
                    username:user?.username
                });
                
            } catch (e) {
                throw e;
            }
        },
        {
            onSuccess: () => {
                setInput({ bio: "", displayname: "", avatar: "", accesstoken: "",username:"" });
                setIsOpen(false);
                store.updateNotification({ message: "profile changes saved", type: "success" });
            },
            onError: (err: any) => {
                //no-console("errror adding bill in ", err.data);
                setError({
                    name: "main",
                    message: concatErrors(err)
                });
            },
            onSettled: () => {
                queryClient.invalidateQueries(['user']);
            }
        }
    );

    const disableButton = (vals: typeof input) => {
        if (vals.displayname !== "" || vals.bio) {
            return false;
        }
        return true;
    };

    const onSubmit = (event?: React.BaseSyntheticEvent<object, any, any>) => {
        event?.preventDefault();
        mutation.mutate({ user_id: user?.id as string, vals:input });
    };

    return (
        <div className="w-full h-full p-2 flex items-center justify-center  rounded-xl ">
            <form
                className="w-full md:w-[60%] h-full rounded-xl p-2 border-2
                flex  flex-col items-center justify-center gap-2
                bg-white dark:bg-black"
                onSubmit={onSubmit}
            >
                <div className="w-[90%] py-2 text-3xl font-bold">Update Profile</div>
                
 
                <FormInput<RequiredProfileFormFields>
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    prop="username"
                    label="User Name"
                />


                <FormInput<RequiredProfileFormFields>
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    prop="displayname"
                    label="Display Name"
                />

                <FormInput<RequiredProfileFormFields>
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    prop="avatar"
                    label="Avatar Url"
                />
                <FormTextArea<RequiredProfileFormFields>
                    error={error}
                    handleChange={handleChange}
                    input={input}
                    prop="bio"
                    label="Bio"
                />

                <PlainFormButton
                    disabled={disableButton(input)}
                    isSubmitting={mutation.isLoading}
                    label={"save changes"}
                />

                <div className="w-[90%] flex  flex-col items-center justify-center">
                    {error?.message !== "" ? (
                        <div className=" w-full line-clamp-4 p-2 bg-red-100 border-2 border-red-800
                         text-red-900  rounded-xl">{error.message}</div>
                    ) : null}
                </div>
            </form>
        </div>
    );
};
