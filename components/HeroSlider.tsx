import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useUI } from '../contexts/UIContext';

// Typewriter Component
const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const letters = text.split("");
    return (
        <span className="inline-block relative">
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.05,
                        delay: delay + index * 0.05,
                        ease: "linear"
                    }}
                    className="relative"
                >
                    {char}
                </motion.span>
            ))}
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="inline-block w-[3px] h-[1em] bg-accent-cyan ml-1 align-middle"
            />
        </span>
    );
};

// Hardcoded best assets from scraper (People & Lifestyle)
const SLIDES = [
    {
        id: 1,
        image: '/assets/visionary/diverse-tech-professionals-meeting-vancouver-office-glass-walls_ddg_0.jpg',
        subtitle: 'WORK IN CANADA',
        title: 'Launch Your Global Career',
        description: 'Join Canada’s thriving tech sector. Expert guidance on LMIA-exempt work permits and Global Talent Stream.',
        cta: 'Check Eligibility',
        color: 'from-accent-cyan/80 to-blue-900/20'
    },
    {
        id: 2,
        image: '/assets/visionary/happy-international-students-university-of-toronto-campus-laughing_ddg_0.jpg',
        subtitle: 'STUDY PATHWAYS',
        title: 'World-Class Education',
        description: 'Transform your international degree into permanent residence with the latest PGWP updates.',
        cta: 'Student Services',
        color: 'from-accent-amber/80 to-orange-900/20'
    },
    {
        id: 3,
        image: '/assets/visionary/young-family-walking-stanley-park-vancouver-autumn_ddg_0.jpg',
        subtitle: 'FAMILY SPONSORSHIP',
        title: 'Build a Future Together',
        description: 'Reunite with your loved ones. We specialize in spousal, parent, and grandparent sponsorship.',
        cta: 'Family Assessment',
        color: 'from-accent-emerald/80 to-green-900/20'
    }
];

export const HeroSlider: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { openAssessment } = useUI();

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
        }, 8000); // 8 seconds for typewriter to finish
        return () => clearInterval(timer);
    }, []);

    const slide = SLIDES[currentSlide];

    return (
        <div className="relative h-screen min-h-[800px] w-full overflow-hidden bg-background">

            {/* Background Slider */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slide.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay - Strengthened for readability */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} mix-blend-multiply opacity-80`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={slide.id}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="max-w-4xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                            <span className="text-xs font-bold tracking-widest text-white uppercase">{slide.subtitle}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] drop-shadow-2xl">
                            <Typewriter text={slide.title} delay={0.5} />
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-100 mb-12 max-w-2xl leading-relaxed font-light drop-shadow-md">
                            {slide.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={openAssessment}
                                className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                            >
                                <div className="absolute inset-0 bg-accent-cyan/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                <div className="relative flex items-center gap-2">
                                    {slide.cta}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </button>

                            <button className="px-8 py-4 bg-black/30 backdrop-blur-md text-white font-bold text-lg rounded-full border border-white/20 hover:bg-black/50 transition-all flex items-center gap-2">
                                Book Consultation
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-12 right-12 z-20 flex gap-4">
                {SLIDES.map((s, idx) => (
                    <button
                        key={s.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-1 transition-all duration-500 ${currentSlide === idx ? 'w-16 bg-white' : 'w-8 bg-white/30'}`}
                    />
                ))}
            </div>

        </div>
    );
};
