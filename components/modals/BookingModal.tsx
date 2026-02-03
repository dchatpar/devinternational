
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Mail, Briefcase, CheckCircle, Loader2 } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { GlassCard } from '../ui/GlassCard';

export const BookingModal: React.FC = () => {
    const { isBookingOpen, closeBooking } = useUI();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'general',
        date: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Reset after showing success
        setTimeout(() => {
            setIsSuccess(false);
            closeBooking();
            setFormData({ name: '', email: '', type: 'general', date: '' });
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isBookingOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBooking}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-lg"
                    >
                        <GlassCard className="border-white/10 shadow-2xl overflow-hidden relative">

                            {/* Close Button */}
                            <button
                                onClick={closeBooking}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors z-20"
                            >
                                <X size={20} />
                            </button>

                            {/* Content */}
                            <div className="relative z-10">
                                {!isSuccess ? (
                                    <>
                                        <div className="mb-8">
                                            <div className="h-12 w-12 rounded-full bg-accent-cyan/10 flex items-center justify-center text-accent-cyan mb-4 container-icon">
                                                <Calendar size={24} />
                                            </div>
                                            <h2 className="text-2xl font-bold text-white mb-2">Book a Consultation</h2>
                                            <p className="text-gray-400 text-sm">
                                                Speak with a regulated consultant (RCIC). Initial assessments are free.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">

                                            {/* Name Field */}
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</label>
                                                <div className="relative group">
                                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-cyan transition-colors" size={18} />
                                                    <input
                                                        type="text"
                                                        required
                                                        value={formData.name}
                                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-white/10 transition-all"
                                                        placeholder="Jane Doe"
                                                    />
                                                </div>
                                            </div>

                                            {/* Email Field */}
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Email Address</label>
                                                <div className="relative group">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-accent-cyan transition-colors" size={18} />
                                                    <input
                                                        type="email"
                                                        required
                                                        value={formData.email}
                                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-accent-cyan/50 focus:bg-white/10 transition-all"
                                                        placeholder="jane@example.com"
                                                    />
                                                </div>
                                            </div>

                                            {/* Type Selection */}
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Consultation Type</label>
                                                <div className="relative">
                                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                                    <select
                                                        value={formData.type}
                                                        onChange={e => setFormData({ ...formData, type: e.target.value })}
                                                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-accent-cyan/50 focus:bg-white/10 transition-all"
                                                    >
                                                        <option value="general" className="bg-[#111]">General Inquiry</option>
                                                        <option value="express" className="bg-[#111]">Express Entry Assesment</option>
                                                        <option value="study" className="bg-[#111]">Study Permit</option>
                                                        <option value="business" className="bg-[#111]">Business Immigration</option>
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Date Field */}
                                            <div className="space-y-1">
                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Date</label>
                                                <input
                                                    type="date"
                                                    required
                                                    value={formData.date}
                                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white appearance-none focus:outline-none focus:border-accent-cyan/50 focus:bg-white/10 transition-all [color-scheme:dark]"
                                                />
                                            </div>

                                            <button
                                                disabled={isSubmitting}
                                                className="w-full mt-6 bg-accent-cyan text-black font-bold py-3 rounded-lg hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <Loader2 size={18} className="animate-spin" />
                                                        Scheduling...
                                                    </>
                                                ) : (
                                                    "Confirm Booking"
                                                )}
                                            </button>

                                        </form>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center justify-center py-12 text-center">
                                        <div className="h-20 w-20 rounded-full bg-accent-emerald/20 flex items-center justify-center text-accent-emerald mb-6">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                                        <p className="text-gray-400 max-w-xs mx-auto">
                                            We've sent a confirmation email to <span className="text-white">{formData.email}</span> with the meeting details.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </GlassCard>

                        {/* Background Glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-accent-cyan/20 rounded-full blur-[100px] -z-10 pointer-events-none" />

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
