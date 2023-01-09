import React from "react";
import { useForm, useFormContext,useWatch } from "react-hook-form";
import { Mutationprops, RequiredNewPostFormFields } from "./types";
import { UseFormReturn } from "react-hook-form/dist/types";
import { PBUser } from "../../utils/types/types";
import { TheIcon } from "./../../shared/wrappers/TheIcon";
import { AiOutlineCamera } from "react-icons/ai";
import { BiImageAdd } from 'react-icons/bi'
import { FormButton } from "./FormParts";
import { UseMutationResult } from "@tanstack/react-query";
import { FaCommentsDollar } from "react-icons/fa";

interface SocialFormProps {
    user: PBUser;
    mutation: UseMutationResult<void, any, Mutationprops, unknown>
}

export const SocialForm = ({ user,mutation }: SocialFormProps) => {
    const form_stuff = useForm<RequiredNewPostFormFields>({
        defaultValues:{
            body:"",
            user:user?.id,
            media:undefined
        }
    });
    
    const [pic, setPic] = React.useState<File | string | null>();
    const { register,watch,formState: { errors, isDirty, isValid,touchedFields }} = form_stuff;
    const [error,setError]=React.useState({name:"",message:""})
    const fileInput = React.useRef<HTMLInputElement | null>(null);
    
    const onSubmit = (data: RequiredNewPostFormFields) => {
        console.log("handle submit data === ", data);
        if(data.user){
        if ((data?.media && "name" in data?.media) || data.body !== "") {
        const formdata = new FormData()
        if ((data?.media && "name" in data?.media)){
            formdata.append("media", data?.media)
        }
        if ((data.body !=="")) {
            formdata.append("body", data.body as string)
        }
        formdata.append("user",data.user)

        mutation.mutate({ collection: 'posts', payload: formdata });
        } 
        else {
        setError({ name: "main", message: "either body or image is required" })
        }
            }


        form_stuff.reset();
    };

    const isError = (err: typeof errors, label: keyof RequiredNewPostFormFields) => {
        if (err[label]) {
            return true;
        }
        return false;
    };

    const { ref, ...rest } = register("media");
    const customHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
     if ('files' in e.target && e.target.files) {
        setPic(e.target.files[0]);
         form_stuff.setValue("media", e.target.files[0] as File,{shouldDirty:true});
        }
        // form_stuff.setValue("body",e.target.value)
     };

    React.useEffect(() => {
        const subscription = watch((value, { name, type }) => console.log(value, name, type));
        return () => subscription.unsubscribe();
    }, [watch]);

    return (
        <div className="w-full h-full rounded-lg flex items-center justify-center ">
            <form
                className="h-full w-full rounded-lg flex flex-col items-center justify-start p-5"
                onSubmit={form_stuff.handleSubmit(onSubmit)}>

            <div className="w-full h-full flex flex-col items-center justify-center ">
            {/* <input className="hidden" {...register('user')}/> */}
            {/* file input will be hidden and the iage icon will forwad the click event via a ref */}
            <input className="hidden"type="file"
               ref={e => {
                ref(e);
                fileInput.current = e; // you can still assign to ref
                }}
              onChange={customHandleChange}/>
            {(pic && typeof pic === 'object')?<img src={URL.createObjectURL(pic as Blob)} 
                    className="max-h-[200px]  rounded-lg"/>
            :null} 
            {(pic && typeof pic === 'string')?<img src={pic} 
                    className="w-[80%] max-h-[300px] rounded-lg"/>: null} 

            <textarea
            style={{ borderColor: isError(errors,"body") ? "red" : "" }}
            className="w-[95%] min-h-[100px] md:h-[30%]
            m-2 p-2  border border-black dark:border-white text-base rounded-lg
           dark:bg-slate-700focus:border-2 dark:focus:border-4 focus:border-purple-700
            dark:focus:border-purple-600 "
            {...register("body", { })}
            onChange={customHandleChange}
            />
            <div className="w-[90%]">
                <TheIcon Icon={BiImageAdd} size={'30'} iconAction={() =>fileInput.current?.click()}/>
            </div>
            <FormButton form_stuff={form_stuff} />
            </div>

            </form>

        </div>
    );
};







// interface SocialFormTextAreaProps {
//     form_stuff: UseFormReturn<RequiredNewPostFormFields, any>;
//     label: "body";
//     valueAsNumber?: boolean;
//     defaultValue?: string;
//     readOnly?: boolean;
//     styles?: React.CSSProperties;
// }

// export const SocialFormTextArea = ({
//     form_stuff,
//     label,
//     defaultValue,
//     readOnly = false,
//     valueAsNumber,
//     styles
// }: SocialFormTextAreaProps) => {
//     const {
//         register,
//         formState: { errors }
//     } = form_stuff;
//     const isError = (err: typeof errors) => {
//         if (err[label]) {
//             return true;
//         }
//         return false;
//     };
//     const customHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {};

//     return (
//         <div className="flex flex-col items-center justify-center w-full ">

//             <textarea
//                 style={{ borderColor: isError(errors) ? "red" : "", ...styles }}
//                 className="w-[95%] min-h-[200px] h-full
//             m-2 p-2  border border-black dark:border-white text-base rounded-lg
//            dark:bg-slate-700focus:border-2 dark:focus:border-4 focus:border-purple-700
//             dark:focus:border-purple-600 "
//                 defaultValue={defaultValue}
//                 readOnly={readOnly}
//                 {...register(label, { valueAsNumber })}
//                 onChange={customHandleChange}
//             />
//             <div className="w-95%">

//             </div>
//             {isError(errors) ? (
//                 <div className="text-base  text-red-600">{errors[label]?.message}</div>
//             ) : null}
//         </div>
//     );
// };

// interface SocialFormFileProps {
//     form_stuff: UseFormReturn<RequiredNewPostFormFields, any>;
//     label: "media";
//     valueAsNumber?: boolean;
//     defaultValue?: string;
//     readOnly?: boolean;
//     styles?: React.CSSProperties;
// }

// export const SocialFormFile = ({
//     form_stuff,
//     label,
//     defaultValue,
//     readOnly = false,
//     valueAsNumber,
//     styles
// }: SocialFormFileProps) => {
//     const fileInput = React.useRef<HTMLInputElement | null>(null);
//     const [pic, setPic] = React.useState<File | string | null>();
//     // const nameRef = React.useRef("")
//     console.log("pic  === ", pic);
//     const enableFileInput = () => {
//         fileInput.current?.click();
//     };

//     const {
//         register,
//         formState: { errors }
//     } = form_stuff;
//     const isError = (err: typeof errors) => {
//         if (err[label]) {
//             return true;
//         }
//         return false;
//     };
//     const { ref, ...rest } = register("media");
//     const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (e.target.files) {
//             setPic(e.target.files[0]);
//             form_stuff.setValue("media", e.target.files[0]);
//         }
//     };
//     React.useEffect(() => {
//         setPic(form_stuff.getValues("media"));
//     }, [form_stuff.getValues("media")]);

//     // console.log("media field valus",form_stuff.getValues('media'))
//     return (
//         <div className="flex flex-col items-center justify-center w-full ">
//             <div
//                 onClick={() => enableFileInput()}
//                 className="w-full rounded-lg flex flex-col items-center justify-center "
//             >
//                 {
//                     <div className="w-[90%] h-[90%]">
//                         {pic && pic?.name ? (
//                             <img
//                                 src={URL.createObjectURL(pic as Blob)}
//                                 className="h-full w-full rounded-lg"
//                             />
//                         ) : null}
//                     </div>
//                 }
//                 <TheIcon Icon={AiOutlineCamera} color="black" size="30" />
//             </div>

//             <input
//                 style={{ borderColor: isError(errors) ? "red" : "", ...styles }}
//                 className="hidden"
//                 type="file"
//                 readOnly={readOnly}
//                 ref={e => {
//                     ref(e);
//                     fileInput.current = e; // you can still assign to ref
//                 }}
//                 onChange={customHandleChange}
//             />
//             {isError(errors) ? (
//                 <div className="text-base  text-red-600">{errors[label]?.message}</div>
//             ) : null}
//         </div>
//     );
// };
