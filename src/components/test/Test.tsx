import React from 'react'
import { PBUser } from '../../utils/types/types';
import { useForm } from "react-hook-form";
import { RequiredNewPostFormFields } from '../form/types';
import { PostForm } from '../timeline/PostForm';


interface TestProps {
    user: PBUser
}


export const Test = ({user}: TestProps) => {

  const { register, handleSubmit } = useForm<RequiredNewPostFormFields>();

  const onSubmit = (data:RequiredNewPostFormFields) => {
    alert(JSON.stringify(data));
  };




return (
  <div className=" w-full  h-full px-2">

 </div>

);
}



