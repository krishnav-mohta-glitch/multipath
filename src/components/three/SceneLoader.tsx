import React from 'react';

interface SceneLoaderProps {
  label?: string;
}

export const SceneLoader: React.FC<SceneLoaderProps> = ({
  label = 'INITIALISING 3D ENVIRONMENT...'
}) => {
  return (
    <div className="w-full h-full min-h-[220px] flex flex-col items-center justify-center p-6 bg-[#111714] text-[#F3F4EC] space-y-3">
      <div className="relative w-8 h-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-30" />
        <div className="w-3 h-3 rounded-full bg-[#C8F36B] shadow-sm animate-pulse" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#8DA391]">
        {label}
      </span>
    </div>
  );
};
