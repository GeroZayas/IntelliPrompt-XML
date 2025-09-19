
import React from 'react';
import { BrainCircuitIcon } from './icons/BrainCircuitIcon';

export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <BrainCircuitIcon className="w-12 h-12 text-cyan-400" />
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-indigo-500 text-transparent bg-clip-text">
          IntelliPrompt XML
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-3xl mx-auto">
        Analyze your intent, convert it to semantic XML, and discover optimized prompts for enhanced AI interaction.
      </p>
    </header>
  );
};
