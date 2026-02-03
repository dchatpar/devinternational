import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Globe,
    Briefcase,
    Heart,
    BookOpen,
    ArrowRight,
    ChevronRight,
    GraduationCap,
    Users
} from 'lucide-react';

const PATHWAY_CATEGORIES = [
    {
        id: 'live',
        title: "Live Permanently",
        subtitle: "Express Entry & PNP",
        icon: <Globe size={32} />,
        description: "Your route to permanent residence.",
        image: "/assets/visionary/parliament-hill-ottawa-sunset-golden-hour_ddg_0.jpg",
        color: "from-blue-600 to-cyan-500",
        links: [
            { label: "Express Entry System", href: "/live-in-canada/express-entry" },
            { label: "Federal Skilled Worker", href: "/live-in-canada/skilled-immigration/federal-skilled-worker" },
            { label: "Provincial Nominees (PNP)", href: "/live-in-canada/pnps-program" },
            { label: "Atlantic Immigration", href: "/live-in-canada/pnps-program/atlantic-immigration-pilot" },
        ]
    },
    {
        id: 'work',
        title: "Work in Canada",
        subtitle: "Permits & Visas",
        icon: <Briefcase size={32} />,
        description: "Career opportunities in tech & more.",
        image: "/assets/visionary/diverse-tech-professionals-meeting-vancouver-office-glass-walls_bing_0.jpg",
        color: "from-emerald-600 to-teal-500",
        links: [
            { label: "LMIA Work Permits", href: "/live-in-canada/work-permit/lmia-based-work-permits" },
            { label: "Global Talent Stream", href: "/live-in-canada/work-permit/global-talent-stream" },
            { label: "Open Work Permits", href: "/live-in-canada/work-permit/open-work-permits" },
            { label: "Business Visitors", href: "/live-in-canada/business-immigration/business-visitors" },
        ]
    },
    {
        id: 'study',
        title: "Family & Study",
        subtitle: "Sponsorship & Education",
        icon: <Users size={32} />,
        description: "Reunite family or study at top schools.",
        image: "/assets/visionary/happy-international-students-university-of-toronto-campus-laughing_bing_0.jpg",
        color: "from-purple-600 to-pink-500",
        links: [
            { label: "Spousal Sponsorship", href: "/live-in-canada/family-sponsorship/spouse-common-law-partner" },
            { label: "Parents & Grandparents", href: "/live-in-canada/family-sponsorship/parents-grandparents" },
            { label: "Study Permits", href: "/live-in-canada/study-visa/study-permit" },
            { label: "PGWP (Post-Grad)", href: "/live-in-canada/work-permit/post-graduation-work-permit" },
        ]
    },
    {
        id: 'business',
        title: "Business & Investor",
        subtitle: "Start-up & C11",
        icon: <BookOpen size={32} />,
        description: "Launch your business in Canada.",
        image: "/assets/visionary/international-business-professionals-shaking-hands-toronto-skyline-background_ddg_0.jpg",
        color: "from-amber-600 to-orange-500",
        links: [
            { label: "Start-up Visa", href: "/live-in-canada/business-immigration/start-up-visa" },
            { label: "Intra-Company Transfer", href: "/live-in-canada/work-permit/intra-company-transfer" },
            { label: "C11 Entrepreneur", href: "/live-in-canada/business-immigration/entrepreneur-work-permit" },
            { label: "Self-Employed", href: "/live-in-canada/business-immigration/self-employment-program" },
        ]
    }
];

export const PathwaysGrid: React.FC = () => {
    const navigate = useNavigate();
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <section className="py-24 bg-[#050505] relative overflow-hidden">

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-12 h-[2px] bg-accent-cyan" />
                            <span className="text-accent-cyan font-bold tracking-widest uppercase text-sm">Explore Your Future</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                            Your Pathway to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Canadian Permanent Residence</span>
                        </h2>
                    </div>
                </motion.div>
            </div>

            {/* Cards Grid */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-[600px] md:h-[500px] lg:h-[600px]">
                {PATHWAY_CATEGORIES.map((cat, i) => (
                    <motion.div
                        key={cat.id}
                        onHoverStart={() => setHoveredCard(cat.id)}
                        onHoverEnd={() => setHoveredCard(null)}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group rounded-3xl overflow-hidden cursor-pointer"
                        onClick={() => navigate(cat.links[0].href)} // Default click action
                    >
                        {/* Background Image */}
                        <motion.div
                            className="absolute inset-0 z-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${cat.image})` }}
                            animate={{
                                scale: hoveredCard === cat.id ? 1.1 : 1.0,
                                filter: hoveredCard === cat.id ? "grayscale(0%)" : "grayscale(100%) brightness(0.7)"
                            }}
                            transition={{ duration: 0.6 }}
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500 mix-blend-multiply z-10`} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

                        {/* Content Container */}
                        <div className="absolute inset-0 z-20 p-8 flex flex-col justify-end">

                            {/* Icon & Title Group */}
                            <motion.div
                                animate={{ y: hoveredCard === cat.id ? 0 : 40 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            >
                                <div className="mb-4 text-white/80 group-hover:text-white transition-colors">
                                    {cat.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-1 group-hover:scale-105 transition-transform origin-left">
                                    {cat.title}
                                </h3>
                                <div className="h-1 w-12 bg-accent-cyan rounded-full mb-4 group-hover:w-full transition-all duration-500" />

                                <p className="text-gray-400 text-sm mb-6 opacity-100 group-hover:opacity-0 transition-opacity duration-300 absolute">
                                    {cat.description}
                                </p>
                            </motion.div>

                            {/* Hover Content (Links) */}
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{
                                    opacity: hoveredCard === cat.id ? 1 : 0,
                                    height: hoveredCard === cat.id ? 'auto' : 0
                                }}
                                className="overflow-hidden"
                            >
                                <ul className="space-y-3 pb-4">
                                    {cat.links.slice(0, 4).map((link, j) => (
                                        <li key={j}>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(link.href);
                                                }}
                                                className="flex items-center gap-2 text-sm text-gray-200 hover:text-white hover:translate-x-1 transition-all"
                                            >
                                                <ChevronRight size={14} className="text-accent-cyan" />
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full py-3 bg-white/20 hover:bg-white text-white hover:text-black font-bold text-sm rounded-xl backdrop-blur-md transition-all flex items-center justify-center gap-2">
                                    Explore <ArrowRight size={16} />
                                </button>
                            </motion.div>

                        </div>

                    </motion.div>
                ))}
            </div>
        </section>
    );
};
