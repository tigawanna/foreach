
import { client } from './../pb/config';

interface UpdateUserFnProps {
 user_id:string
  avatar?:string;
  displayname?:string
  accessToken?:string
}

export const updateProfile=async({user_id,accessToken,avatar,displayname}:UpdateUserFnProps)=>{
try{
return await client.collection("devs")
  .update(user_id,{ avatar,accessToken,displayname});
}catch(e){
console.log("error updating profile === ",e)
}

}
