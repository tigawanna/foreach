/* eslint-disable prettier/prettier */
import React from 'react';
import { UseFormReturn } from 'react-hook-form/dist/types';
import { RequiredFormFields } from './types';
import { LoaderElipse } from './../../shared/loaders/Loaders';

interface FormInputProps {
  form_stuff: UseFormReturn<RequiredFormFields, any>;
  label: keyof RequiredFormFields;
  valueAsNumber?: boolean;
  defaultValue?: RequiredFormFields[keyof RequiredFormFields];
  readOnly?: boolean;
  styles?: React.CSSProperties;
}

export const FormInput: React.FC<FormInputProps> = ({
  form_stuff,
  label,
  defaultValue = '',
  readOnly = false,
  valueAsNumber,
  styles,
}) => {
  const {
    register,
    formState: { errors },
  } = form_stuff;

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
        {label}
      </label>
      <input
        style={{ borderColor: isError(errors) ? 'red' : '', ...styles }}
        className="w-[90%] p-1 border border-black 
      dark:border-white h-10 text-base rounded-sm   dark:bg-slate-700
        focus:border-2 dark:focus:border-4 focus:border-purple-700 dark:focus:border-purple-600 "
        defaultValue={defaultValue}
        readOnly={readOnly}
        {...register(label, { valueAsNumber })}
        onChange={customHandleChange}
      />
      {isError(errors) ? (
        <div className="text-base  text-red-600">{errors[label]?.message}</div>
      ) : null}
    </div>
  );
};

interface FormButtonProps {
  form_stuff: UseFormReturn<RequiredFormFields, any>;
}

export const FormButton: React.FC<FormButtonProps> = ({ form_stuff }) => {
  return (
    <button
      type="submit"
      className="p-2 w-[70%] md:w-[30%]
            border-2 dark:border border-slate-700 dark:border-slate-400 dark:bg-slate-800
            flex items-center justify-center m-2 rounded-lg 
            hover:shadow-slate-900 dark:hover:shadow-slate-50 
            hover:shadow-lg dark:hover:shadow
            hover:scale-105"
    >
      {form_stuff.formState.isSubmitting ? (
        <div className="h-full w-[60%] flex justify-center items-center">
          <LoaderElipse />
        </div>
      ) : (
        <div className="text-lg font-bold dark:font-normal ">submit</div>
      )}
    </button>
  );
};
