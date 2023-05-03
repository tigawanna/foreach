interface ErrorOutputProps {
error:any
}

export function ErrorOutput({error}:ErrorOutputProps){
return (
 <div className='w-full h-full flex items-center justify-center'>
    <div className=' flex items-center justify-center border border-red-800 text-red-900 bg-red-300'>
            {JSON.stringify(error)}
    </div>

 </div>
);
}
