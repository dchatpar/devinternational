
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, MapPin } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

const STORIES = [
    {
        id: 1,
        name: "Sarah Jenkins",
        origin: "United Kingdom",
        destination: "Vancouver, BC",
        program: "Express Entry (FSW)",
        quote: "The team helped me navigate the complex CRS score improvements. I arrived in Vancouver just 6 months after my first consultation!",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5
    },
    {
        id: 2,
        name: "Rajesh Patel",
        origin: "India",
        destination: "Toronto, ON",
        program: "OINP Tech Draw",
        quote: "As a software engineer, I didn't verify my NOC code correctly. Dev International fixed my application and I got invited in the next draw.",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 5
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        origin: "Mexico",
        destination: "Calgary, AB",
        program: "Study Permit & PGWP",
        quote: "From choosing the right college to my post-grad work permit, they were with me every step. Now I'm a permanent resident!",
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        rating: 5
    }
];

export const SuccessStories: React.FC = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-background via-accent-cyan/5 to-background z-0" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent-cyan text-xs font-bold uppercase tracking-wider mb-4"
                    >
                        <Star size={14} className="fill-accent-cyan" />
                        <span>Success Stories</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-4"
                    >
                        Real People. Real Results.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                    >
                        Join over 2,000 families who have successfully made Canada their home with our guidance.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {STORIES.map((story, i) => (
                        <motion.div
                            key={story.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                        >
                            <GlassCard className="h-full hover:border-accent-cyan/30 transition-colors group">
                                <Quote className="absolute top-6 right-6 text-white/10 w-12 h-12 group-hover:text-accent-cyan/20 transition-colors" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-accent-cyan transition-colors">
                                            <img src={story.image} alt={story.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent-cyan rounded-full flex items-center justify-center border border-black">
                                            <Star size={12} className="text-black fill-black" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{story.name}</h4>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <MapPin size={12} />
                                            <span>{story.origin}</span>
                                            <span className="text-accent-cyan mx-1">→</span>
                                            <span>{story.destination}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-1 mb-4">
                                    {[...Array(story.rating)].map((_, r) => (
                                        <Star key={r} size={14} className="text-accent-amber fill-accent-amber" />
                                    ))}
                                </div>

                                <p className="text-gray-300 italic mb-6 relative z-10">
                                    "{story.quote}"
                                </p>

                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <span className="text-xs font-mono text-accent-cyan uppercase tracking-wider">
                                        Completed: {story.program}
                                    </span>
                                </div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-16 text-center">
                    <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
                        Read More Reviews
                    </button>
                </div>

            </div>
        </section>
    );
};
