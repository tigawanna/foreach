import React from 'react'
import { PBUser } from '../../utils/types/types';
import { ProfileForm } from '../../components/profile/ProfileForm';

interface ProfileProps {
user:PBUser
}

export const Profile: React.FC<ProfileProps> = ({user}) => {
return (
 <div className='w-full'>
<ProfileForm user={user}/>
 </div>
);
}




