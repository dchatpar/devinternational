
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { ArrowRight, Rss } from 'lucide-react';

const NEWS_ITEMS = [
    "Express Entry vs PNP – Which Is Better for Getting PR in Canada?",
    "Visa Refusal Appeal Options in Canada - How to Get Legal Help",
    "Latest Draw #299: CEC draw issues ITAs to 1,400 candidates.",
    "New PGWP Rules effect from Nov 1, 2026.",
    "Alberta launches new Tourism and Hospitality Stream."
];

export const NewsTicker: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % NEWS_ITEMS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="md:col-span-12">
            <GlassCard className="flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden" noPadding>
                {/* Label */}
                <div className="flex items-center gap-3 px-6 py-4 bg-accent-cyan/10 border-r border-white/5 h-full z-10">
                    <div className="relative">
                        <div className="absolute inset-0 bg-accent-cyan/50 animate-ping rounded-full" />
                        <Rss size={18} className="text-accent-cyan relative z-10" />
                    </div>
                    <span className="font-mono text-xs font-bold tracking-widest text-accent-cyan uppercase whitespace-nowrap">
                        LATEST UPDATES
                    </span>
                </div>

                {/* Scrolling Text */}
                <div className="flex-1 px-4 relative h-12 flex items-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center"
                        >
                            <span className="text-sm md:text-base text-gray-200 font-medium truncate w-full">
                                {NEWS_ITEMS[currentIndex]}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Read More */}
                <button className="hidden md:flex items-center gap-2 px-6 py-4 text-xs font-mono text-gray-500 hover:text-white transition-colors border-l border-white/5 z-10">
                    READ BLOG <ArrowRight size={14} />
                </button>
            </GlassCard>
        </div>
    );
};
