import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';

interface ReactRouterErrorProps {
  label?: string;
}
export interface RRError {
  status: number;
  statusText: string;
  internal: boolean;
  data: string;
  error: Error;
  message: string;
}

export const ReactRouterError = () => {
  const error = useRouteError() as RRError;
  const navigate = useNavigate();

  // //no-console("route error == ",error)

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
      <div className="w-full text-center text-2xl font-bold">Route Error</div>
      <div
        className="p-2 flex items-center justify-center m-2
        bg-red-100 text-red-900 border-2 border-red-800 rounded-xl
        "
      >
        {error.data}
      </div>
      <div
        className="p-2 flex items-center justify-center m-2
        bg-red-100 text-red-900 border-2 border-red-800 rounded-xl
        "
      >
        {error.message}
      </div>
      <div className="w-full flex justify-center items-center gap-2">
        <button
          type="button"
          className="text-blue-600 border p-1 rounded-xl"
          onClick={() => navigate('/')}
        >
          {' '}
          back to home{' '}
        </button>
        <button
          type="button"
          className="text-blue-600 border p-1 rounded-xl"
          onClick={() => navigate(-1)}
        >
          {' '}
          back to recent{' '}
        </button>
      </div>
    </div>
  );
};
