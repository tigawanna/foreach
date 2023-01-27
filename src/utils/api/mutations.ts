/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
import { client } from '../pb/config';

interface UpdateUserFnProps {
  user_id: string;
  avatar?: string;
  displayname?: string;
  accesstoken?: string;
  bio:string;
  username:string;
}

export const updateProfile = async ({
  user_id,
  accesstoken,
  avatar,
  displayname,
  bio,
  username
}: // eslint-disable-next-line consistent-return
UpdateUserFnProps) => {
  try {
    return await client
      .collection('devs')
      .update(user_id, { avatar, accesstoken, displayname,bio,username });
  } catch (e) {
    //no-console('error updating profile === ', e);
  }
};
