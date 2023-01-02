import React from 'react'
import { useRouteError, useNavigate } from 'react-router-dom';

interface ReactRouterErrorProps {

}
export interface RRError {
    status: number
    statusText: string
    internal: boolean
    data: string
    error: Error
}

export const ReactRouterError: React.FC<ReactRouterErrorProps> = ({}) => {
const error = useRouteError() as RRError
const navigate = useNavigate()


return (
 <div className='w-full h-screen flex flex-col items-center justify-center gap-5'>
    <div className='w-full text-center text-2xl font-bold'>
    Route Error
    </div>
  
        <div className='p-2 flex items-center justify-center
        bg-red-100 text-red-900 border-2 border-red-800 rounded-xl
        '>
        {error.data}
        </div>
<div className='w-full flex justify-center items-center gap-2'>
    <button className='text-blue-600 border p-1 rounded-xl' onClick={() => navigate(-1)}> back to home </button>
    <button className='text-blue-600 border p-1 rounded-xl' onClick={() => navigate(-1)}> back to recent </button>
</div>

</div>
);
}
