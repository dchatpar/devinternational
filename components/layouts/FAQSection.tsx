
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ArrowRight } from 'lucide-react';

const FAQS = [
    {
        question: "How do I check my CRS score reliability?",
        answer: "Our advanced CRS calculator uses the latest IRCC draw cutoffs to provide a realistic assessment. While unofficial, our tool accounts for recent tie-breaking rules and PNP nominations."
    },
    {
        question: "Can I apply for PNP without a job offer?",
        answer: "Yes. Many Provincial Nominee Programs (like OINP Human Capital or Saskatchewan Express Entry) do not require a job offer, provided you meet specific skill and experience criteria."
    },
    {
        question: "What is the processing time for Express Entry in 2026?",
        answer: "While it varies by stream, most standard Express Entry applications are processed within 6 months. Complex cases or security screening can extend this timeline."
    },
    {
        question: "Do I need an RCIC to apply?",
        answer: "No, you can obtain a visa on your own. However, an RCIC (Regulated Canadian Immigration Consultant) ensures your application is error-free, maximizing your chances of success and avoiding costly delays."
    }
];

export const FAQSection: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-32 bg-black relative overflow-hidden">
            {/* Split Layout Background */}
            <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/80 to-black z-10" />
                <img
                    src="/assets/visionary/construction-engineer-looking-at-blueprints-toronto-condo_bing_0.jpg"
                    alt="FAQ Background"
                    className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out"
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Left Side: Text and CTA */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 mb-8">
                            <HelpCircle size={18} />
                            <span className="text-sm font-bold tracking-wider">COMMON QUERIES</span>
                        </div>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-[0.9]">
                            Got Questions?<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">We Have Answers.</span>
                        </h2>
                        <p className="text-lg text-gray-300 mb-12 max-w-lg leading-relaxed">
                            Immigration is complex. We simplify the jargon and give you the straight facts you need to make informed decisions for your future.
                        </p>

                        <button className="group flex items-center gap-4 text-white text-lg font-bold border-b border-white/30 pb-2 hover:border-accent-cyan transition-colors">
                            <span>Visit Help Center</span>
                            <ArrowRight className="group-hover:translate-x-2 transition-transform text-accent-cyan" />
                        </button>
                    </div>

                    {/* Right Side: Accordion */}
                    <div className="space-y-4">
                        {FAQS.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`border rounded-2xl transition-all duration-300 ${openIndex === i ? 'bg-white/10 border-accent-cyan/50 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/10 hover:border-white/30'}`}
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left"
                                >
                                    <span className={`text-lg font-bold transition-colors ${openIndex === i ? 'text-white' : 'text-gray-300'}`}>
                                        {faq.question}
                                    </span>
                                    <div className={`p-2 rounded-full transition-colors ${openIndex === i ? 'bg-accent-cyan text-black' : 'bg-white/5 text-gray-400'}`}>
                                        {openIndex === i ? <Minus size={16} /> : <Plus size={16} />}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
