import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { slideUp, hoverScale } from '../../utils/animations';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  noPadding = false
}) => {
  return (
    <motion.div
      variants={slideUp}
      whileHover={onClick ? hoverScale : undefined}
      onClick={onClick}
      className={`
        glass-card relative overflow-hidden rounded-card 
        transition-all duration-500 ease-out
        ${noPadding ? '' : 'p-6 md:p-8'}
        ${className}
      `}
    >
      {/* Liquid Sheen Effect */}
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0">
         <div className="absolute -top-[100%] left-[-100%] w-[300%] h-[300%] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03)_0%,_transparent_50%)]" />
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};