
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Globe, Briefcase, Heart, BookOpen } from 'lucide-react';

const PATHWAY_CATEGORIES = [
    {
        title: "Live Permanently",
        icon: <Globe size={24} />,
        description: "Pathways to Permanent Residence",
        image: "/assets/visionary/parliament-hill-ottawa-sunset-golden-hour_ddg_0.jpg",
        links: [
            { label: "Express Entry System", href: "/live-in-canada/express-entry" },
            { label: "Federal Skilled Worker", href: "/live-in-canada/skilled-immigration/federal-skilled-worker" },
            { label: "Canadian Experience Class", href: "/live-in-canada/skilled-immigration/canadian-experience-class" },
            { label: "BC PNP Tech", href: "/live-in-canada/pnps-program/british-columbia" },
            { label: "Ontario OINP", href: "/live-in-canada/pnps-program/ontario" },
            { label: "Atlantic Immigration", href: "/live-in-canada/pnps-program/atlantic-immigration-pilot" },
        ]
    },
    {
        title: "Work in Canada",
        icon: <Briefcase size={24} />,
        description: "Temporary & Open Work Permits",
        image: "/assets/visionary/diverse-tech-professionals-meeting-vancouver-office-glass-walls_ddg_0.jpg",
        links: [
            { label: "LMIA Work Permits", href: "/live-in-canada/work-permit/lmia-based-work-permits" },
            { label: "Global Talent Stream", href: "/live-in-canada/work-permit/global-talent-stream" },
            { label: "Business Visitors", href: "/live-in-canada/business-immigration/business-visitors" },
            { label: "Intra-Company Transfer", href: "/live-in-canada/work-permit/intra-company-transfer" },
            { label: "Open Work Permits", href: "/live-in-canada/work-permit/open-work-permits" },
        ]
    },
    {
        title: "Family & Study",
        icon: <Heart size={24} />,
        description: "Sponsorship & Education",
        image: "/assets/visionary/graduate-students-throwing-hats-university-of-british-columbia_ddg_0.jpg",
        links: [
            { label: "Spousal Sponsorship", href: "/live-in-canada/family-sponsorship/spouse-common-law-partner" },
            { label: "Parent & Grandparent", href: "/live-in-canada/family-sponsorship/parents-grandparents" },
            { label: "Study Permits", href: "/live-in-canada/study-visa/study-permit" },
            { label: "Post-Grad Work Permit", href: "/live-in-canada/work-permit/post-graduation-work-permit" },
            { label: "Super Visa", href: "/live-in-canada/family-sponsorship/super-visa" },
        ]
    },
    {
        title: "Business & Investor",
        icon: <BookOpen size={24} />,
        description: "For Entrepreneurs",
        image: "/assets/visionary/international-business-professionals-shaking-hands-toronto-skyline-background_ddg_0.jpg",
        links: [
            { label: "Start-up Visa Program", href: "/live-in-canada/business-immigration/start-up-visa" },
            { label: "Self-Employed Persons", href: "/live-in-canada/business-immigration/self-employment-program" },
            { label: "C11 Entrepreneur", href: "/live-in-canada/business-immigration/entrepreneur-work-permit" },
            { label: "Owner Operator LMIA", href: "/live-in-canada/business-immigration/owner-operator-lmia" },
            { label: "Invest in Canada", href: "/live-in-canada/business-immigration/investor-visa" },
        ]
    }
];

export const PathwaysGrid: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="py-32 bg-background relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                            Explore Your <span className="text-accent-cyan">Pathway</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Navigate our comprehensive directory of Canadian immigration streams.
                            Find the route that matches your goals.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PATHWAY_CATEGORIES.map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-accent-cyan/30 transition-colors duration-500 min-h-[500px] flex flex-col"
                        >
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img
                                    src={cat.image}
                                    alt={cat.title}
                                    className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/90 to-black" />
                            </div>

                            <div className="relative z-10 p-8 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-3.5 rounded-xl bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/20 group-hover:bg-accent-cyan group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                                        {cat.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white text-xl leading-tight group-hover:text-accent-cyan transition-colors">{cat.title}</h3>
                                        <p className="text-xs text-gray-500 font-medium tracking-wide uppercase mt-1">{cat.description}</p>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-4 flex-grow">
                                    {cat.links.map((link, j) => (
                                        <li key={j}>
                                            <button
                                                onClick={() => navigate(link.href)}
                                                className="group/link flex items-center gap-3 text-gray-400 hover:text-white transition-all text-sm text-left w-full"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/link:bg-accent-cyan group-hover/link:shadow-[0_0_10px_rgba(6,182,212,0.8)] transition-all" />
                                                <span className="group-hover/link:translate-x-1 transition-transform duration-300">
                                                    {link.label}
                                                </span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="pt-6 border-t border-white/5 mt-auto">
                                    <button
                                        onClick={() => navigate(cat.links[0].href)} // Default to first link or category page
                                        className="flex items-center gap-2 text-accent-cyan text-sm font-bold uppercase tracking-wider group-hover:gap-3 transition-all"
                                    >
                                        View All <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
