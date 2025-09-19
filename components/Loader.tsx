
import React from 'react';

interface LoaderProps {
  message?: string;
}

export const Loader: React.FC<LoaderProps> = ({ message = "Loading..." }) => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 rounded-lg">
      <div className="w-10 h-10 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
      {message && <p className="mt-4 text-slate-400">{message}</p>}
    </div>
  );
};
