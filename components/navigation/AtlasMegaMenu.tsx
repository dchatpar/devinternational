
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Globe, Briefcase, GraduationCap, Building2,
  ArrowRight, Users, FileCheck, Shield, Zap
} from 'lucide-react';

interface AtlasMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MENU_CATEGORIES = [
  {
    id: 'live',
    label: 'Live Permanently',
    icon: Globe,
    description: "Pathways to PR",
    image: "/assets/menu/happy-couple-holding-canadian-flags-city-background_bing_0.jpg",
    items: [
      { label: "Express Entry", href: "/live-in-canada/express-entry", desc: "Fastest path for skilled workers" },
      { label: "Provincial Nominee (PNP)", href: "/live-in-canada/pnps-program", desc: "Province-specific streams" },
      { label: "Family Sponsorship", href: "/live-in-canada/family-sponsorship", desc: "Reunite with loved ones" },
      { label: "Atlantic Immigration", href: "/live-in-canada/pnps-program/atlantic-immigration-pilot", desc: "For Atlantic provinces" }
    ]
  },
  {
    id: 'work',
    label: 'Work in Canada',
    icon: Briefcase,
    description: "Permits & Visas",
    image: "/assets/menu/diverse-tech-professionals-meeting-vancouver-office-glass-walls_bing_0.jpg",
    items: [
      { label: "LMIA Work Permits", href: "/live-in-canada/work-permit/lmia-based-work-permits", desc: "Employer-supported permits" },
      { label: "Global Talent Stream", href: "/live-in-canada/work-permit/global-talent-stream", desc: "For tech professionals" },
      { label: "Open Work Permits", href: "/live-in-canada/work-permit/open-work-permits", desc: "Flexible work options" },
      { label: "Business Visitors", href: "/live-in-canada/business-immigration/business-visitors", desc: "Short-term business trips" }
    ]
  },
  {
    id: 'study',
    label: 'Study',
    icon: GraduationCap,
    description: "Education Paths",
    image: "/assets/menu/happy-international-students-university-of-toronto-campus-laughing_bing_0.jpg",
    items: [
      { label: "Study Permits", href: "/live-in-canada/study-visa/study-permit", desc: "Academic authorization" },
      { label: "Post-Grad Work Permit", href: "/live-in-canada/work-permit/post-graduation-work-permit", desc: "Work after graduation" },
      { label: "Student Direct Stream", href: "/live-in-canada/study-visa/sds", desc: "Expedited processing" }
    ]
  },
  {
    id: 'business',
    label: 'Business',
    icon: Building2,
    description: "Invest & Start-up",
    image: "/assets/menu/international-business-professionals-shaking-hands-toronto-skyline-background_pin_0.jpg",
    items: [
      { label: "Start-up Visa", href: "/live-in-canada/business-immigration/start-up-visa", desc: "Launch your innovative business" },
      { label: "Intra-Company Transfer", href: "/live-in-canada/work-permit/intra-company-transfer", desc: "Expand to Canada" },
      { label: "Self-Employed", href: "/live-in-canada/business-immigration/self-employment-program", desc: "For artists and athletes" }
    ]
  }
];

export const AtlasMegaMenu: React.FC<AtlasMegaMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-20 left-0 right-0 z-40"
          onMouseLeave={onClose}
        >
          {/* Glass Container */}
          <div className="mx-auto max-w-7xl px-6 relative">
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex h-[500px]">

              {/* Sidebar Categories */}
              <div className="w-1/4 bg-white/5 border-r border-white/5 p-4 flex flex-col gap-2">
                {MENU_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    className={`text-left p-4 rounded-xl transition-all flex items-center gap-3 ${activeCategory.id === cat.id ? 'bg-accent-cyan text-black shadow-[0_0_20px_rgba(6,182,212,0.4)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                  >
                    <cat.icon size={20} />
                    <div>
                      <div className="font-bold text-sm">{cat.label}</div>
                      <div className={`text-xs ${activeCategory.id === cat.id ? 'text-black/70' : 'text-gray-500'}`}>{cat.description}</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Sub-menu Content */}
              <div className="flex-1 p-8 grid grid-cols-2 gap-8 bg-black/50">
                {/* Links Grid */}
                <div className="grid grid-cols-1 gap-4 content-start">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <activeCategory.icon className="text-accent-cyan" size={20} />
                    {activeCategory.label} Options
                  </h3>
                  {activeCategory.items.map((item, i) => (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => { navigate(item.href); onClose(); }}
                      className="group flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 text-left border border-transparent hover:border-white/5 transition-all"
                    >
                      <div className="mt-1 p-2 rounded-full bg-white/5 text-gray-400 group-hover:bg-accent-cyan group-hover:text-black transition-colors">
                        <ArrowRight size={14} />
                      </div>
                      <div>
                        <div className="text-white font-semibold group-hover:text-accent-cyan transition-colors">{item.label}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{item.desc}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Featured Image / Promo */}
                <div className="relative rounded-2xl overflow-hidden group">
                  <motion.img
                    key={activeCategory.image}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={activeCategory.image}
                    alt={activeCategory.label}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-accent-cyan text-black text-xs font-bold mb-3 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                      FEATURED
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2 leading-tight">Start Your Journey to {activeCategory.label.split(' ')[0]}</h4>
                    <button className="text-sm text-gray-300 flex items-center gap-2 group-hover:text-white transition-colors">
                      Check Eligibility <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};