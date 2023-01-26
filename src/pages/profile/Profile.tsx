import { PBUser } from '../../utils/types/types';
import { DevDetails } from '../../components/profile/DevDetails';
import { Timeline } from '../timeline/Timeline';
import { useParams } from 'react-router-dom';
import { client } from './../../utils/pb/config';
import { useQuery } from '@tanstack/react-query';
import { QueryStateWrapper } from '../../shared/wrappers/QueryStateWrapper';

interface ProfileProps {user: PBUser}
type Params = { id: string }

export const Profile = ({user}: ProfileProps) => {
  const params = useParams<Params>()
  const getOneUser=async()=>{
    return await client.collection('devs').getFirstListItem(`id="${params.id}"`, {
    });
  }
  const query = useQuery(['profile',params?.id], getOneUser);
  const the_user = query?.data??user
 
  return(
  <div className="w-full h-full flex flex-col items-center justify-start gap-1">
    <QueryStateWrapper query={query}>
  <div className='w-full flex  border rounded-lg'>
        <DevDetails user={the_user} />
  </div>
      <div className='w-full min-h-fit flex flex-col items-center justify-center mt-3'>
        <div className='text-lg font-bold '>
            User posts
        </div>

        <Timeline user={user} profile={the_user?.id as string} />
      </div>
    </QueryStateWrapper>
</div>
)};
