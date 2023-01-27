import React from 'react'


interface FormInputProps<T> {
label:string;    
prop: keyof T
error: { name: string; message: string }
handleChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
input:T

}

export const FormInput = <T,>({error,handleChange,prop,input,label}:FormInputProps<T>) => {
    const isError = (err:typeof error, prop: keyof T) => {
        if (err.name === prop && err.message !== "") {
            return true;
        }
        return false;
    };
return (
    <div className='flex flex-col items-center justify-center w-full '>
        <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
            {label}
        </label>

        <input
            style={{ borderColor: isError(error, prop) ? "red" : "" }}
            className="w-[90%] p-[6px] m-1 border border-black 
                dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
                focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
            id={prop as string}
            type={"text"}
            placeholder={`enter ${prop as string}`}
            onChange={handleChange}
            autoComplete={"off"}
            value={input[prop] as string}
        />

        {isError(error, prop) ? (
            <div className="text-base  text-red-600">{error.message}</div>
        ) : null}
 </div>
);
}
