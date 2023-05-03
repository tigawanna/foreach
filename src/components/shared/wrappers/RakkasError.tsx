import { ErrorBoundary } from "rakkasjs";
import { ReactNode } from "react";

interface RakkasErrorProps {
children:ReactNode
}

export function RakkasErrorBoundary({children}:RakkasErrorProps){
return (
    <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => {
        return (
        <RakkasErrorOutput error={error} resetErrorBoundary={resetErrorBoundary} />
        )}}>
            
            {children}
    </ErrorBoundary>
);
}



interface RakkasErrorOutputProps {
    error: Error
    resetErrorBoundary: (...args: unknown[]) => void
}

function RakkasErrorOutput({ error, resetErrorBoundary }: RakkasErrorOutputProps) {
    // console.log("error in error boudary [[[[ === ", error)
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center bg-red-100 text-red-900 '>
            <h1 className="text-2xl font-bold  ">An error has occurred</h1>
            <pre className="bg-red-50 p-5 rounded-lg border-red-900">
                {error.message}
            </pre>
            <button
                className="bg-green-500 p-1 px-2 text-green-50 text-lg font-bold"
                onClick={() => {
                    resetErrorBoundary();
                }}
            >
                Try again
            </button>


        </div>
    );
}
