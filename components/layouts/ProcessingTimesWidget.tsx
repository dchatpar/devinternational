
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingDown, ArrowRight } from 'lucide-react';

const PROCESSING_DATA = [
    { type: "Express Entry", time: "6 Months", trend: "Stable", color: "text-accent-cyan" },
    { type: "Study Permit", time: "8 Weeks", trend: "Improving", color: "text-accent-emerald" },
    { type: "Spousal Sponsor", time: "12 Months", trend: "Stable", color: "text-purple-400" },
    { type: "Start-up Visa", time: "32 Months", trend: "Check", color: "text-orange-400" },
];

export const ProcessingTimesWidget: React.FC = () => {
    return (
        <section className="py-20 bg-background border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                            <Clock className="text-white/50" />
                            Current Processing Times
                        </h2>
                        <p className="text-gray-400 mt-2 flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-emerald opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-emerald"></span>
                            </span>
                            Live updates based on IRCC weekly data.
                        </p>
                    </div>
                    <button className="text-accent-cyan text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all">
                        View Full Report <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {PROCESSING_DATA.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 p-6 rounded-2xl group hover:border-white/20 transition-all"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-medium text-gray-300">{item.type}</h3>
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10">
                                    <Clock size={16} className={item.color} />
                                </div>
                            </div>
                            <div className="text-4xl font-bold text-white mb-2">{item.time}</div>
                            <div className="flex items-center gap-2 text-xs font-mono text-gray-500">
                                <TrendingDown size={12} className="text-accent-emerald" />
                                <span>Trend: {item.trend}</span>
                            </div>

                            {/* Animated Progress Bar Visual */}
                            <div className="mt-6 h-1 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '70%' }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                    className={`h-full ${item.color.replace('text-', 'bg-')}`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
