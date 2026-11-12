import React, { type ReactNode } from 'react';
import { EyeOff } from 'lucide-react';

interface WebGLFallbackProps {
  children?: ReactNode;
  title?: string;
  message?: string;
}

export const WebGLFallback: React.FC<WebGLFallbackProps> = ({
  children,
  title = '2D Analytical Mode Active',
  message = 'Hardware acceleration is currently unavailable or reduced motion is preferred. Full interactive learning content is rendered below.'
}) => {
  if (children) {
    return <>{children}</>;
  }

  return (
    <div className="w-full h-full min-h-[260px] p-6 rounded-2xl bg-[#111714] text-[#F3F4EC] border border-white/10 flex flex-col items-center justify-center text-center space-y-3">
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#8DA391]">
        <EyeOff className="w-5 h-5" />
      </div>
      <div className="space-y-1 max-w-sm">
        <h4 className="font-display text-sm font-bold text-[#F3F4EC]">{title}</h4>
        <p className="font-mono text-xs text-[#8DA391] leading-relaxed">{message}</p>
      </div>
      <span className="font-mono text-[10px] px-2.5 py-1 rounded-full bg-[#19211C] text-[#C8F36B] border border-white/10">
        PARALLEL 2D FALLBACK
      </span>
    </div>
  );
};
