
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { sitemap } from '../../data/sitemap';
import { GlassCard } from '../ui/GlassCard';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, DollarSign, FileText, Shield, Star, Users, ArrowRight } from 'lucide-react';
import { useUI } from '../../contexts/UIContext';
import { FAQSection } from '../layouts/FAQSection';

// Fallback images
const FALLBACK_HEROES = [
    '/assets/visionary/canada_parliament_hero.png',
    '/assets/visionary/canada_nature_hero.png'
];

export const DynamicPage: React.FC = () => {
    const { slug } = useParams();
    const { openAssessment } = useUI();

    const [images, setImages] = useState<string[]>(FALLBACK_HEROES);

    // Fetch multiple images for the page
    useEffect(() => {
        fetch('/assets/visionary/manifest.json')
            .then(res => res.json())
            .then(manifest => {
                const keys = Object.keys(manifest);
                if (keys.length > 2) {
                    // Shuffle and pick 3 unique images
                    const shuffled = keys.sort(() => 0.5 - Math.random());
                    setImages([
                        manifest[shuffled[0]].path,
                        manifest[shuffled[1]].path,
                        manifest[shuffled[2]].path
                    ]);
                }
            })
            .catch(err => console.warn("Could not load image manifest", err));
    }, [slug]);

    const matchPath = slug ? slug : '';
    const pageData = sitemap.find(item => item.href.endsWith(matchPath) || item.href.includes(matchPath));

    const title = pageData?.title || "Immigration Pathway";
    const category = pageData?.category || "Dev International";
    const description = pageData?.description || "Explore this Canadian immigration pathway with our regulated consultants.";

    return (
        <div className="min-h-screen bg-background pb-24">

            {/* --- HERO SECTION --- */}
            <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-20" />
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10 }}
                    src={images[0]}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute bottom-0 left-0 w-full z-30 p-6 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-cyan/20 border border-accent-cyan/30 text-accent-cyan text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md"
                        >
                            <Shield size={14} />
                            <span>Regulated Pathway</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-bold text-white mb-6 max-w-4xl"
                        >
                            {title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-200 max-w-2xl leading-relaxed"
                        >
                            {description}
                        </motion.p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-40">

                {/* --- QUICK STATS GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16">
                    {[
                        { icon: <Clock />, label: "Processing Time", value: "6-8 Months" },
                        { icon: <DollarSign />, label: "Gov Fees", value: "From $1,365" },
                        { icon: <Users />, label: "Family Allowed", value: "Yes" },
                        { icon: <Star />, label: "Success Rate", value: "High" }
                    ].map((stat, i) => (
                        <GlassCard key={i} className="flex items-center gap-4 p-6 bg-background/60 backdrop-blur-xl border-white/10">
                            <div className="p-3 rounded-lg bg-accent-cyan/10 text-accent-cyan">
                                {stat.icon}
                            </div>
                            <div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                                <div className="text-lg font-bold text-white">{stat.value}</div>
                            </div>
                        </GlassCard>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* --- MAIN CONTENT COLUMN (LEFT) --- */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Overview Section */}
                        <section className="prose prose-invert max-w-none prose-lg">
                            <h2 className="text-3xl font-bold text-white mb-6">Program Overview</h2>
                            <p className="text-gray-300 leading-loose">
                                The <strong>{title}</strong> is a premier pathway designed for candidates who wish to settle in Canada. As one of the most stable and predictable immigration streams, it offers a clear route to Permanent Residence for eligible applicants.
                            </p>
                            <p className="text-gray-300 leading-loose">
                                Unlike other programs that operate on a first-come, first-served basis, this pathway prioritizes candidates based on their ability to establish themselves economically in Canada. Factors such as education, language proficiency, and work experience play a pivotal role.
                            </p>
                        </section>

                        {/* Image Split Section */}
                        <div className="relative rounded-3xl overflow-hidden h-[400px] group my-12">
                            <img src={images[1]} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Lifestyle" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-12">
                                <div className="max-w-md">
                                    <h3 className="text-3xl font-bold text-white mb-4">Why Choose This Stream?</h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Accelerated processing times",
                                            "Option to bring your family",
                                            "Path to Canadian Citizenship",
                                            "Review of credentials per Canadian standards"
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-200">
                                                <CheckCircle size={20} className="text-accent-emerald" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Eligibility Grid */}
                        <section>
                            <h2 className="text-3xl font-bold text-white mb-8">Eligibility Criteria</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GlassCard className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">1</div>
                                        <h3 className="text-xl font-bold text-white">Work Experience</h3>
                                    </div>
                                    <p className="text-gray-400">Must have at least 1 year of continuous full-time or equivalent part-time work experience in a skilled occupation.</p>
                                </GlassCard>
                                <GlassCard className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">2</div>
                                        <h3 className="text-xl font-bold text-white">Language Skills</h3>
                                    </div>
                                    <p className="text-gray-400">Minimum CLB 7 in English or French across all four abilities: reading, writing, listening, and speaking.</p>
                                </GlassCard>
                                <GlassCard className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">3</div>
                                        <h3 className="text-xl font-bold text-white">Education</h3>
                                    </div>
                                    <p className="text-gray-400">A Canadian secondary (high school) or post-secondary certificate, diploma or degree, or an ECA report.</p>
                                </GlassCard>
                                <GlassCard className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">4</div>
                                        <h3 className="text-xl font-bold text-white">Proof of Funds</h3>
                                    </div>
                                    <p className="text-gray-400">Must show that you have enough money for you and your family to settle in Canada, unless you are currently working.</p>
                                </GlassCard>
                            </div>
                        </section>

                        {/* Document Checklist */}
                        <section className="bg-white/5 rounded-3xl p-8 border border-white/5">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <FileText className="text-accent-cyan" />
                                Required Documents
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Valid Passport", "Language Test Results", "ECA Report",
                                    "Police Certificates", "Medical Exam Confirmation", "Proof of Funds",
                                    "Employer Reference Letters", "Digital Photos"
                                ].map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-accent-cyan" />
                                        <span className="text-gray-300">{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* --- SIDEBAR (RIGHT) --- */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Assessment CTA */}
                        <GlassCard className="bg-gradient-to-br from-accent-cyan/10 to-blue-900/10 border-accent-cyan/20 sticky top-24">
                            <h3 className="text-2xl font-bold text-white mb-4">Start Your Application</h3>
                            <p className="text-gray-400 mb-6">
                                Don't risk a rejection. Our assessment tool checks your eligibility against 80+ programs instantly.
                            </p>
                            <button
                                onClick={openAssessment}
                                className="w-full py-4 bg-accent-cyan text-black font-bold rounded-xl hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2"
                            >
                                Check My Eligibility <ArrowRight size={18} />
                            </button>
                            <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1"><Shield size={12} /> Secure</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> 2 Min</span>
                            </div>
                        </GlassCard>

                        {/* Visual Step Process */}
                        <div className="space-y-4">
                            <h4 className="text-white font-bold text-sm uppercase tracking-widest pl-2 border-l-2 border-accent-cyan">Process Roadmap</h4>
                            {[
                                { step: "01", title: "Assessment", desc: "Initial profile evaluation." },
                                { step: "02", title: "Document Gathering", desc: "Collection & verification." },
                                { step: "03", title: "Submission", desc: "Official lodging with IRCC." },
                                { step: "04", title: "Processing", desc: "Biometrics & Medicals." },
                                { step: "05", title: "Approval", desc: "Passport Request (PPR)." }
                            ].map((s, i) => (
                                <div key={i} className="group flex gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                                    <div className="font-mono text-accent-cyan/50 group-hover:text-accent-cyan font-bold text-xl">{s.step}</div>
                                    <div>
                                        <div className="text-white font-bold">{s.title}</div>
                                        <div className="text-sm text-gray-500">{s.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* --- LARGE VISUAL CTA FOOTER --- */}
                <div className="mt-24 relative rounded-3xl overflow-hidden h-[300px] flex items-center justify-center text-center px-6">
                    <img src={images[2]} className="absolute inset-0 w-full h-full object-cover opacity-60 ml-auto" alt="Canada awaits" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Canada is waiting for you.</h2>
                        <button
                            onClick={openAssessment}
                            className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                        >
                            Book Your Consultation Now
                        </button>
                    </div>
                </div>

                {/* FAQ Included */}
                <div className="mt-24">
                    <FAQSection />
                </div>

            </div>
        </div>
    );
};
