import React from 'react'
import './loaders.css'
interface LoaderProps {

}

export const LoaderElipse = ({}: LoaderProps) => {
    return (
        <div className='flex justify-center items-center '>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}




export const LoadersRing = ({}: LoaderProps) => {
return (
    <div className='w-full h-full border flex justify-center items-center '>
    <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
    </div>
 </div>
);
}




export const LoaderSpinner = ({}: LoaderProps) => {
return (
<div className='w-full h-full border flex justify-center items-center '>
        <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            </div>
 </div>
);
}
