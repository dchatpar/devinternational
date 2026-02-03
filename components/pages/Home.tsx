
import React from 'react';
import { HeroSlider } from '../HeroSlider';
import { BentoGrid } from '../BentoGrid';
import { SuccessStories } from '../layouts/SuccessStories';
import { PathwaysGrid } from '../layouts/PathwaysGrid';
import { FAQSection } from '../layouts/FAQSection';
import { ProcessingTimesWidget } from '../layouts/ProcessingTimesWidget';
import { TestimonialCarousel } from '../layouts/TestimonialCarousel';
import { motion } from 'framer-motion';

// --- Additional Sections for "Best Homepage" ---

const TrustSection = () => (
    <section className="py-12 bg-black/40 border-y border-white/5 backdrop-blur-sm relative overflow-hidden">
        {/* Subtle moving sheen */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 translate-x-[-100%] animate-[shimmer_8s_infinite]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: 'Success Rate', value: '98%', desc: "Verified Approvals" },
                    { label: 'Client Satisfaction', value: '5/5', desc: "Google Reviews" },
                    { label: 'Years Experience', value: '15+', desc: "Industry Leadership" },
                    { label: 'Families Settled', value: '2k+', desc: "Happy Clients" }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="text-center group cursor-default"
                    >
                        <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500 mb-2 group-hover:from-accent-cyan group-hover:to-blue-400 transition-all duration-500">
                            {stat.value}
                        </div>
                        <div className="text-white font-bold text-sm uppercase tracking-wider mb-1">{stat.label}</div>
                        <div className="text-xs text-gray-500 font-mono">{stat.desc}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export const Home: React.FC = () => {
    return (
        <>
            <HeroSlider />
            <TrustSection />
            <PathwaysGrid />
            <BentoGrid />
            <ProcessingTimesWidget />
            <SuccessStories />
            <TestimonialCarousel />
            <FAQSection />
        </>
    );
};
