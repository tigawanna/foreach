/* eslint-disable prettier/prettier */
import React from 'react';
import { PBUser } from '../../utils/types/types';
import { ProfileForm } from '../../components/profile/ProfileForm';

interface ProfileProps {
  user: PBUser;
}

export const Profile = (
  {
    user
  }: ProfileProps
) => (<div className="w-full h-full">
  <ProfileForm user={user} />
</div>);
