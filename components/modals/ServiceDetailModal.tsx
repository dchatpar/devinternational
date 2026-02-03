
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { GlassCard } from '../ui/GlassCard';
import { sitemap } from '../../data/sitemap';

export const ServiceDetailModal: React.FC = () => {
    const { activeServiceId, closeServiceDetail } = useUI();

    // Filter items based on the active service category/ID
    // We map the card IDs (e.g., 'pnp', 'work', 'study') to sitemap categories/keywords
    const getItems = () => {
        if (!activeServiceId) return [];

        switch (activeServiceId) {
            case 'pnp':
                return sitemap.filter(item => item.title.includes('PNP') || item.title.includes('Provincial') || item.category === 'Live in Canada' && item.title.includes('OINP'));
            case 'work':
                return sitemap.filter(item => item.category === 'Live in Canada' && (item.title.includes('Work') || item.title.includes('LMIA') || item.title.includes('Talent')));
            case 'study':
                return sitemap.filter(item => item.category === 'Live in Canada' && item.title.includes('Study'));
            default:
                return [];
        }
    };

    const getTitle = () => {
        switch (activeServiceId) {
            case 'pnp': return 'Provincial Nominee Programs';
            case 'work': return 'Work in Canada';
            case 'study': return 'Study Pathways';
            default: return 'Service Details';
        }
    };

    const items = getItems();

    return (
        <AnimatePresence>
            {activeServiceId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeServiceDetail}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 40 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 40 }}
                        className="relative w-full max-w-2xl"
                    >
                        <GlassCard className="border-white/10 shadow-2xl relative overflow-hidden flex flex-col max-h-[80vh]">

                            {/* Header */}
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-2">{getTitle()}</h2>
                                    <p className="text-gray-400">Select a specific stream to learn more.</p>
                                </div>
                                <button
                                    onClick={closeServiceDetail}
                                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="overflow-y-auto custom-scrollbar pr-2 -mr-2 space-y-3">
                                {items.length > 0 ? (
                                    items.map((item, idx) => (
                                        <motion.a
                                            key={item.title}
                                            href={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-accent-cyan/30 transition-all group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <CheckCircle2 size={20} className="text-accent-cyan mt-1 opacity-50 group-hover:opacity-100 transition-opacity" />
                                                <div>
                                                    <h3 className="text-lg font-medium text-gray-200 group-hover:text-white transition-colors">
                                                        {item.title}
                                                    </h3>
                                                    {item.description && (
                                                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <ArrowRight size={18} className="text-accent-cyan opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </motion.a>
                                    ))
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        No specific streams found for this category.
                                    </div>
                                )}
                            </div>

                            {/* Footer CTA */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-end">
                                <button className="text-sm text-gray-400 hover:text-white transition-colors">
                                    View Full Eligibility Requirements →
                                </button>
                            </div>

                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
