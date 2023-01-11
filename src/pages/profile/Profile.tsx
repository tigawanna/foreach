import { PBUser } from '../../utils/types/types';
import { DevDetails } from '../../components/profile/DevDetails';

interface ProfileProps {user: PBUser}

export const Profile = ({user}: ProfileProps) => {
  
  
  
  return(
  <div className="w-full h-full flex flex-col items-start justify-start">
  <div className='w-full flex  border rounded-lg'>
        <DevDetails user={user} />
  </div>
 

</div>
)};
