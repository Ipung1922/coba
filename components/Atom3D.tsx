import React from 'react';

export const Atom3D: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`relative flex items-center justify-center w-64 h-64 ${className}`}>
      {/* Nucleus */}
      <div className="absolute w-8 h-8 bg-neon-purple rounded-full shadow-[0_0_20px_#a855f7] z-10 animate-pulse"></div>
      
      {/* Orbit 1 */}
      <div className="absolute w-24 h-24 border border-science-500 rounded-full animate-spin-slow opacity-60">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_10px_#06b6d4]"></div>
      </div>

      {/* Orbit 2 */}
      <div className="absolute w-40 h-40 border border-science-600 rounded-full animate-spin-reverse-slow opacity-60">
         <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-neon-blue rounded-full shadow-[0_0_10px_#3b82f6]"></div>
      </div>

      {/* Orbit 3 */}
      <div className="absolute w-56 h-56 border border-science-800 rounded-full animate-spin-slow opacity-40">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-neon-cyan rounded-full shadow-[0_0_10px_#06b6d4]"></div>
      </div>
    </div>
  );
};