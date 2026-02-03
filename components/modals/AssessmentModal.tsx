
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, ChevronRight, ChevronLeft, Briefcase, GraduationCap, User } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { GlassCard } from '../ui/GlassCard';

/* --- STEPS CONFIGURATION --- */
const STEPS = [
    { id: 'basics', title: 'Basic Eligibility', icon: User },
    { id: 'work', title: 'Work Experience', icon: Briefcase },
    { id: 'education', title: 'Education', icon: GraduationCap },
];

export const AssessmentModal: React.FC = () => {
    const { isAssessmentOpen, closeAssessment } = useUI();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);

    // Form State (Simplified)
    const [formData, setFormData] = useState({
        age: '',
        country: '',
        jobTitle: '',
        experience: '',
        educationLevel: ''
    });

    const nextStep = () => {
        if (currentStep < STEPS.length) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const finish = async () => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 2000)); // Simulate analysis
        setLoading(false);
        setCurrentStep(STEPS.length); // Move to Results
    };

    // --- RENDER HELPERS ---

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Age</label>
                            <input
                                type="number"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none focus:bg-white/10"
                                placeholder="e.g. 28"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Citizenship</label>
                            <input
                                type="text"
                                value={formData.country}
                                onChange={e => setFormData({ ...formData, country: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none focus:bg-white/10"
                                placeholder="e.g. United States"
                            />
                        </div>
                    </div>
                );
            case 1:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Current Job Title</label>
                            <input
                                type="text"
                                value={formData.jobTitle}
                                onChange={e => setFormData({ ...formData, jobTitle: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none focus:bg-white/10"
                                placeholder="e.g. Software Engineer"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Years of Experience</label>
                            <select
                                value={formData.experience}
                                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none focus:bg-white/10"
                            >
                                <option value="" className="bg-black">Select...</option>
                                <option value="1" className="bg-black">1 Year</option>
                                <option value="2" className="bg-black">2-3 Years</option>
                                <option value="4" className="bg-black">4+ Years</option>
                            </select>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500 uppercase">Highest Education</label>
                            <select
                                value={formData.educationLevel}
                                onChange={e => setFormData({ ...formData, educationLevel: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-accent-cyan/50 focus:outline-none focus:bg-white/10"
                            >
                                <option value="" className="bg-black">Select...</option>
                                <option value="hs" className="bg-black">High School</option>
                                <option value="bach" className="bg-black">Bachelor's Degree</option>
                                <option value="master" className="bg-black">Master's Degree</option>
                                <option value="phd" className="bg-black">PhD</option>
                            </select>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AnimatePresence>
            {isAssessmentOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeAssessment}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg"
                    >
                        <GlassCard className="border-white/10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col">

                            {/* Header with Steps */}
                            <div className="mb-8 relative z-10">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-white">Eligibility Assessment</h2>
                                    <button onClick={closeAssessment}><X className="text-gray-500 hover:text-white" size={20} /></button>
                                </div>

                                {/* Progress Indicators */}
                                <div className="flex justify-between relative">
                                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -z-0" />
                                    {STEPS.map((step, idx) => {
                                        const isActive = idx === currentStep;
                                        const isCompleted = idx < currentStep;
                                        return (
                                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2 bg-black/50 px-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${isActive ? 'bg-accent-cyan text-black scale-110' : isCompleted ? 'bg-accent-emerald text-black' : 'bg-white/10 text-gray-500'}`}>
                                                    {isCompleted ? <CheckCircle2 size={14} /> : idx + 1}
                                                </div>
                                                <span className={`text-[10px] uppercase font-mono tracking-wider ${isActive ? 'text-accent-cyan' : 'text-gray-600'}`}>{step.title}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Dynamic Content Body */}
                            <div className="flex-1 relative z-10">
                                {currentStep < STEPS.length ? (
                                    renderStepContent()
                                ) : (
                                    // RESULTS VIEW
                                    <div className="text-center py-8 animate-in zoom-in-50 duration-500">
                                        <div className="w-20 h-20 bg-accent-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="text-accent-emerald" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">High Potential!</h3>
                                        <p className="text-gray-400 mb-8 max-w-xs mx-auto">
                                            Based on your preliminary profile, you appear to be a strong candidate for <span className="text-white font-medium">Express Entry (FSW)</span>.
                                        </p>

                                        <div className="bg-white/5 rounded-lg p-4 mb-8 text-left border border-white/5">
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-500">Exp. CRS Score</span>
                                                <span className="text-white font-mono">460-480</span>
                                            </div>
                                            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                                <div className="h-full w-[85%] bg-accent-emerald" />
                                            </div>
                                        </div>

                                        <button
                                            onClick={closeAssessment}
                                            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            Book Full Consultation
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Navigation Footer */}
                            {currentStep < STEPS.length && (
                                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between relative z-10">
                                    <button
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400 flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} /> Back
                                    </button>

                                    <button
                                        onClick={currentStep === STEPS.length - 1 ? finish : nextStep}
                                        className="px-6 py-2 bg-accent-cyan text-black text-sm font-bold rounded-full hover:bg-cyan-300 transition-colors flex items-center gap-2"
                                    >
                                        {loading ? (
                                            "Analyzing..."
                                        ) : currentStep === STEPS.length - 1 ? (
                                            "View Results"
                                        ) : (
                                            <>Next <ChevronRight size={16} /></>
                                        )}
                                    </button>
                                </div>
                            )}

                            {/* Background FX */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[80px] pointer-events-none" />

                        </GlassCard>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
