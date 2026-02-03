import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToCalculator = () => {
    const element = document.getElementById('crs-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Liquid blob animation variants
  const blobVariants = {
    animate: (i: number) => ({
      scale: [1, 1.2, 0.9, 1],
      x: [0, i % 2 === 0 ? 50 : -50, i % 2 === 0 ? -20 : 20, 0],
      y: [0, i % 2 === 0 ? -30 : 30, i % 2 === 0 ? 20 : -20, 0],
      rotate: [0, i * 10, -i * 10, 0],
      transition: {
        duration: 20 + i * 2,
        repeat: Infinity,
        ease: "linear",
        times: [0, 0.33, 0.66, 1]
      }
    })
  };

  return (
    <div ref={containerRef} className="relative h-screen min-h-[800px] w-full flex items-center justify-center overflow-hidden bg-background">
      
      {/* --- DYNAMIC LIQUID BACKGROUND --- */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Deep Ambient Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-[#091015] to-background" />

        {/* Animated Orbs */}
        <motion.div 
          custom={1}
          variants={blobVariants}
          animate="animate"
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-accent-cyan/10 rounded-full blur-[120px] mix-blend-screen opacity-60"
        />
        <motion.div 
          custom={2}
          variants={blobVariants}
          animate="animate"
          className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent-emerald/10 rounded-full blur-[120px] mix-blend-screen opacity-50"
        />
        <motion.div 
          custom={3}
          variants={blobVariants}
          animate="animate"
          className="absolute top-[30%] left-[30%] w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px] mix-blend-screen opacity-40"
        />
        <motion.div 
           custom={4}
           variants={blobVariants}
           animate="animate"
           className="absolute bottom-[20%] left-[20%] w-[30vw] h-[30vw] bg-accent-amber/5 rounded-full blur-[80px] mix-blend-screen opacity-30"
        />
      </div>

      {/* --- TECH OVERLAYS --- */}
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-noise opacity-[0.04] mix-blend-overlay pointer-events-none" />
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)] pointer-events-none" />

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="flex flex-col items-center"
        >
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
            </span>
            <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase">System Updated for 2026</span>
          </motion.div>

          {/* Kinetic Typography Title */}
          <div className="relative mb-8">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-white"
              initial={{ opacity: 0, letterSpacing: "-0.05em" }}
              animate={{ opacity: 1, letterSpacing: "-0.02em" }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              DEV
            </motion.h1>
            <motion.div
               initial={{ opacity: 0, x: -20, scale: 0.95 }}
               animate={{ opacity: 1, x: 0, scale: 1 }}
               transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
               className="md:-mt-2"
            >
              <span className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan via-white to-accent-emerald bg-[length:200%_auto] animate-shimmer">
                INTERNATIONAL
              </span>
            </motion.div>
          </div>

          <motion.p 
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            The enterprise-grade portal for Canadian immigration. 
            Analyze eligibility, process documents, and predict outcomes with 
            <span className="text-white font-medium border-b border-accent-cyan/30 pb-0.5"> 99.8% accuracy.</span>
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Button 1: Explore Pathways */}
            <div className="relative group hover:scale-[1.02] transition-transform duration-300">
               {/* Animated Shimmer Border */}
               <div className="absolute -inset-[2px] rounded-full bg-gradient-to-r from-accent-cyan/20 via-accent-cyan to-accent-cyan/20 animate-shimmer bg-[length:200%_100%] opacity-80 group-hover:opacity-100 transition-opacity duration-500 blur-[1px]" />
               
               <button className="relative px-8 py-4 rounded-full bg-white text-black font-bold tracking-tight overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2),inset_0_-2px_4px_rgba(0,0,0,0.1)]">
                  <span className="relative z-10">Explore Pathways</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 to-accent-emerald/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </button>
            </div>

            {/* Button 2: Check Eligibility */}
            <div className="relative group rounded-full">
               {/* Animated Shimmer Border */}
               <div className="absolute -inset-[1px] rounded-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent animate-shimmer bg-[length:200%_100%] opacity-70 group-hover:opacity-100 transition-opacity" />
               
               <button 
                 onClick={scrollToCalculator}
                 className="relative w-full h-full px-8 py-4 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-medium hover:bg-white/10 transition-all duration-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
               >
                 <span className="relative z-10">Check Eligibility</span>
                 <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
               </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5, y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <span className="text-[10px] font-mono tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white via-white/20 to-transparent" />
      </motion.div>
    </div>
  );
};