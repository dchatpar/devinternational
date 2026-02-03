
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const REVIEWS = [
    {
        name: "Elena R.",
        origin: "Brazil -> Toronto",
        text: "The team at Dev International made my Express Entry application seamless. I received my ITA in just 3 months!",
        rating: 5,
        flag: "🇧🇷"
    },
    {
        name: "Rajiv M.",
        origin: "India -> Vancouver",
        text: "My study permit was rejected twice before I came here. They fixed my SOP and got it approved on the first try.",
        rating: 5,
        flag: "🇮🇳"
    },
    {
        name: "Sarah Jenkins",
        origin: "UK -> Calgary",
        text: "Professional, transparent, and fast. The best decision for our family's relocation.",
        rating: 5,
        flag: "🇬🇧"
    },
    {
        name: "Wei Chen",
        origin: "China -> Montreal",
        text: "Excellent guidance on the investor visa program. Highly recommended for business immigration.",
        rating: 5,
        flag: "🇨🇳"
    },
];

export const TestimonialCarousel: React.FC = () => {
    return (
        <section className="py-24 bg-black/20 border-t border-white/5 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-background to-transparent z-10" />

            <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Trusted by 2,000+ Families</h2>
                <div className="flex justify-center gap-1 text-yellow-400 mb-2">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-gray-400">4.9/5 Average Rating across Google & Facebook</p>
            </div>

            <div className="flex overflow-hidden group">
                <motion.div
                    className="flex gap-6 pl-6"
                    animate={{ x: [0, -1000] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                    {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, i) => (
                        <div key={i} className="min-w-[350px] bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm select-none hover:border-accent-cyan/30 transition-colors">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-xl shadow-inner">
                                    {review.flag}
                                </div>
                                <div>
                                    <div className="font-bold text-white text-lg">{review.name}</div>
                                    <div className="text-xs text-accent-cyan font-mono uppercase">{review.origin}</div>
                                </div>
                            </div>
                            <p className="text-gray-300 italic leading-relaxed">"{review.text}"</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
