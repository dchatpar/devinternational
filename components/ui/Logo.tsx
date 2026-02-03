import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-20" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img src="/assets/logo-full.png" alt="Dev Immigration Services Inc." className="h-full w-auto object-contain" />
    </div>
  );
};