
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, GraduationCap, Briefcase, Globe, Building2 } from 'lucide-react';
import { useUI } from '../contexts/UIContext';
import { useNavigate } from 'react-router-dom';

// Reusable Glass Card Component with unified hover effects
const GlassCard = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
  <motion.div
    whileHover={{ scale: 1.01, y: -2 }}
    whileTap={{ scale: 0.99 }}
    onClick={onClick}
    className={`relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 z-10" />
    <div className="relative z-20 p-6 h-full flex flex-col justify-between">
      {children}
    </div>
  </motion.div>
);

export const BentoGrid: React.FC = () => {
  const { openServiceDetail, openAssessment } = useUI();
  const navigate = useNavigate();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative cursor-default">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-cyan/5 rounded-full blur-[120px] -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]"
      >

        {/* --- ROW 1: CORE SERVICES --- */}

        {/* Card 1: Express Entry (Big Feature) - IMAGE: Toronto Skyline/Flag */}
        <div className="md:col-span-8 md:row-span-2">
          <GlassCard
            onClick={() => navigate('/live-in-canada/express-entry')}
            className="h-full min-h-[450px] group cursor-pointer bg-black/40"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/visionary/toronto-skyline-cn-tower-night-4k_bing_0.jpg"
                alt="Express Entry"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            <div className="mt-auto relative z-20">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/90 backdrop-blur-md text-black text-xs font-bold mb-4 shadow-[0_0_20px_rgba(6,182,212,0.3)] border border-accent-cyan/20">
                <Globe size={14} />
                <span>FASTEST PATHWAY</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-3 tracking-tight drop-shadow-lg">Express Entry</h3>
              <p className="text-gray-200 max-w-md mb-8 text-lg font-medium leading-relaxed drop-shadow-md">
                The primary system for skilled workers. Calculate your CRS score and apply for Permanent Residence today.
              </p>
              <div className="flex items-center gap-3 text-accent-cyan font-bold group-hover:translate-x-2 transition-transform">
                <span className="uppercase tracking-wider text-sm">Check Eligibility</span>
                <div className="p-1 rounded-full bg-accent-cyan/20">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Card 2: Free Assessment - IMAGE: Abstract Tech/Professional */}
        <div className="md:col-span-4 md:row-span-2">
          <GlassCard
            onClick={openAssessment}
            className="h-full bg-accent-emerald/5 hover:bg-accent-emerald/10 cursor-pointer border-accent-emerald/20 group relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/visionary/construction-engineer-looking-at-blueprints-toronto-condo_bing_0.jpg"
                alt="Assessment"
                className="w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/90" />
            </div>

            <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent-emerald/20 rounded-full blur-[50px] group-hover:bg-accent-emerald/30 transition-colors animate-pulse" />

            <div className="flex flex-col h-full justify-center items-center text-center relative z-20">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-emerald/20 to-accent-emerald/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-accent-emerald/20 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <CheckCircle className="text-accent-emerald w-10 h-10" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-3">Am I Eligible?</h3>
              <p className="text-gray-400 text-sm mb-8 max-w-[200px] leading-relaxed">
                Take our comprehensive AI-powered assessment to find your best path to Canada.
              </p>
              <button className="px-8 py-3 rounded-xl bg-accent-emerald text-black font-bold text-sm hover:bg-white transition-colors shadow-lg shadow-accent-emerald/20">
                Start Free Assessment
              </button>
            </div>
          </GlassCard>
        </div>

        {/* --- ROW 2: PROVINCIAL PROGRAMS --- */}

        {/* Card 3: BC PNP - IMAGE: Vancouver Seawall/Mountains */}
        <div className="md:col-span-3">
          <GlassCard
            onClick={() => navigate('/live-in-canada/pnps-program/british-columbia')}
            className="h-full min-h-[240px] cursor-pointer group p-0 relative"
          >
            <img src="/assets/visionary/vancouver-harbor-sunset-mountains-cityscape-4k_bing_0.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" alt="BC" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 z-20">
              <div className="text-xs text-accent-cyan font-bold mb-2 tracking-widest border-l-2 border-accent-cyan pl-2">BRITISH COLUMBIA</div>
              <div className="text-2xl font-bold text-white leading-none">BC PNP</div>
            </div>
          </GlassCard>
        </div>

        {/* Card 4: Ontario OINP - IMAGE: Toronto or Parliament */}
        <div className="md:col-span-3">
          <GlassCard
            onClick={() => navigate('/live-in-canada/pnps-program/ontario')}
            className="h-full min-h-[240px] cursor-pointer group p-0 relative"
          >
            <img src="/assets/visionary/international-business-professionals-shaking-hands-toronto-skyline-background_ddg_0.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" alt="Ontario" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 z-20">
              <div className="text-xs text-accent-cyan font-bold mb-2 tracking-widest border-l-2 border-accent-cyan pl-2">ONTARIO</div>
              <div className="text-2xl font-bold text-white leading-none">OINP</div>
            </div>
          </GlassCard>
        </div>

        {/* Card 5: Study - IMAGE: UBC Students/Graduates */}
        <div className="md:col-span-6">
          <GlassCard
            onClick={() => openServiceDetail('study')}
            className="h-full hover:bg-accent-cyan/5 transition-colors group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/visionary/happy-international-students-university-of-toronto-campus-laughing_bing_0.jpg"
                alt="Study"
                className="w-full h-full object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </div>

            <div className="flex items-center justify-between relative z-20 h-full">
              <div className="max-w-xs">
                <div className="w-12 h-12 rounded-xl bg-accent-cyan/20 flex items-center justify-center mb-4 text-accent-cyan border border-accent-cyan/20">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Study in Canada</h3>
                <p className="text-gray-300 text-sm leading-relaxed">World-class education and Post-Graduation Work Permits (PGWP).</p>
              </div>
              <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:bg-accent-cyan group-hover:text-black transition-colors">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          </GlassCard>
        </div>

        {/* --- ROW 3: WORK & BUSINESS --- */}

        {/* Card 6: Work Permits - IMAGE: Tech Office */}
        <div className="md:col-span-6">
          <GlassCard
            onClick={() => navigate('/live-in-canada/work-permit')}
            className="h-full min-h-[220px] group cursor-pointer relative"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/visionary/tech-workers-coding-modern-office-montreal_ddg_0.jpg"
                alt="Work"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/20" />
            </div>

            <div className="relative z-20">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 border border-purple-500/20">
                <Briefcase size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Work Permits</h3>
              <p className="text-gray-400 text-sm max-w-sm">LMIA, Intra-Company Transfers, and Global Talent Stream opportunities.</p>
            </div>
          </GlassCard>
        </div>

        {/* Card 7: Business Immigration - IMAGE: Business Handshake */}
        <div className="md:col-span-6">
          <GlassCard
            onClick={() => navigate('/live-in-canada/business-immigration')}
            className="h-full min-h-[220px] group cursor-pointer relative"
          >
            <div className="absolute inset-0 z-0">
              <img
                src="/assets/visionary/international-business-professionals-shaking-hands-toronto-skyline-background_pin_0.jpg"
                alt="Business"
                className="w-full h-full object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/20" />
            </div>

            <div className="relative z-20 flex flex-col items-end text-right">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mb-4 text-orange-400 border border-orange-500/20">
                <Building2 size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Business Visas</h3>
              <p className="text-gray-400 text-sm max-w-sm">Start-up Visa, Self-Employed, and Investor pathways for entrepreneurs.</p>
            </div>
          </GlassCard>
        </div>

      </motion.div>
    </section>
  );
};