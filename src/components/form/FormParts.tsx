/* eslint-disable prettier/prettier */
import React from 'react';
import { FieldValue, FieldValues, UseFormReturn } from 'react-hook-form/dist/types';
import { LoaderElipse } from './../../shared/loaders/Loaders';

interface FormInputProps<T> {
  // @ts-expect-error
  form_stuff: UseFormReturn<T , any>;
  label: keyof T;
  valueAsNumber?: boolean;
  defaultValue?: T[keyof T];
  readOnly?: boolean;
  styles?: React.CSSProperties;
}

export const FormInput = <T,>(
  {form_stuff,label,defaultValue,readOnly = false,valueAsNumber,styles
}: FormInputProps<T>
) => {
  const {register,formState: { errors },} = form_stuff;

  const isError = (err: typeof errors) => {
    if (err[label]) {
      return true;
    }
    return false;
  };
  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div style={styles} className="flex flex-col items-center justify-center  ">
      <label className="font-bold  text-md capitalize  w-[90%] flex items-start">
        {/* @ts-expect-error */}
        {label}
      </label>
      <input
        style={{ borderColor: isError(errors) ? 'red' : '', ...styles }}
        className="w-[90%] p-1 border border-black dark:border-white h-10 text-base rounded-sm
           dark:bg-slate-700focus:border-2 dark:focus:border-4 focus:border-purple-700
            dark:focus:border-purple-600 "
        // @ts-expect-error
        defaultValue={defaultValue}
        readOnly={readOnly}
        // @ts-expect-error
        {...register(label, { valueAsNumber })}
        onChange={customHandleChange}
      />
      {isError(errors) ? (
        // @ts-expect-error
        <div className="text-base  text-red-600">{errors[label]?.message}</div>
      ) : null}
    </div>
  );
};

interface FormButtonProps <T>{
  // @ts-expect-error
  form_stuff: UseFormReturn<T , any>;
}

export const FormButton = <T,>({form_stuff}: FormButtonProps<T>) => {
  const disabled = !form_stuff.formState.isDirty || !form_stuff.formState.isValid
  return (
    <button
      type="submit"
  
      // disabled={disabled}
      className="p-2 w-[70%] md:w-[30%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105"
    >
      {form_stuff.formState.isSubmitting ? (
        <div className="flex justify-center items-center">
          <LoaderElipse />
        </div>
      ) : (
        <div className="text-lg font-bold dark:font-normal ">submit</div>
      )}
    </button>
  );
};
