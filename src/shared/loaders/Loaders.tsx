import React from 'react'
import './loaders.css'
interface LoaderProps {

}

export const LoaderElipse: React.FC<LoaderProps> = ({ }) => {
    return (
        <div className='w-full h-full border flex justify-center items-center '>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}




export const LoadersRing: React.FC<LoaderProps> = ({}) => {
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




export const LoaderSpinner: React.FC<LoaderProps> = ({}) => {
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
