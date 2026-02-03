
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consented = localStorage.getItem('cookie-consent');
        if (!consented) {
            // Delay slightly for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setIsVisible(false);
    };

    const handleDecline = () => {
        // Just hide for session or set false, depending on strictness. 
        // consistently re-asking on next session is common for "strict" decline
        localStorage.setItem('cookie-consent', 'false');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="bg-[#091015]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6 md:flex items-center justify-between gap-6">

                            <div className="flex items-start gap-4 mb-4 md:mb-0">
                                <div className="p-3 bg-white/5 rounded-full text-accent-cyan">
                                    <Cookie size={24} />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg mb-1">We value your privacy</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                                        We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                                        <a href="/privacy-policy" className="text-accent-cyan hover:underline ml-1">Read Policy</a>.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    onClick={handleDecline}
                                    className="px-6 py-2.5 rounded-lg border border-white/10 text-gray-300 font-medium hover:bg-white/5 transition-colors text-sm"
                                >
                                    Decline
                                </button>
                                <button
                                    onClick={handleAccept}
                                    className="px-6 py-2.5 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors shadow-lg shadow-white/5 text-sm"
                                >
                                    Accept All
                                </button>
                            </div>

                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
