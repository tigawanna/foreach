
import React from 'react'
import { UseQueryResult } from "@tanstack/react-query";
import { UseInfiniteQueryResult } from "@tanstack/react-query/build/lib/types";
import { LoaderElipse } from './../loaders/Loaders';

interface QueryStateWrapperProps {
    children: React.ReactNode;
    loader?: React.ReactNode;
    length?: number;
    query?: | UseQueryResult<unknown, unknown> | UseInfiniteQueryResult<unknown, unknown>;
}

export const QueryStateWrapper = (
    {
        children,
        loader,
        query,
        length
    }: QueryStateWrapperProps
) => {


    



    if (query?.isLoading ) {
          return (
                <div className="w-full  flex items-center justify-center">
                    <div className="w-[100%] h-full flex items-center justify-center  ">
                        {loader ? loader : <LoaderElipse />}
                    </div>
                </div>
            );
   
    }

    if (query?.isError) {
        return (
            <div className="w-full flex items-center justify-center  ">
                <div className="max-w-[90%] w-fit h-fit p-2 flex items-center justify-center 
                 text-red-700 bg-red-100 border border-red-900  text-base rounded-lg">
                    {/* @ts-expect-error */}
                    {query.error?.message}
                </div>
            </div>
        );
    }
    if (length && length === 0) {
        return (
            <div className="w-full  flex items-center justify-center ">
                <div className="max-w-[90%] w-fit h-fit p-2 flex items-center justify-center 
                 text-red-700 bg-red-100 border border-red-900  text-base rounded-lg">
                    no records to show
                </div>
            </div>)
    }

    return (
        <>{children}</>
    );
}
