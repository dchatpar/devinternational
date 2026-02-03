import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Logo } from './ui/Logo';
import { Menu, Search, X, ChevronDown, Command } from 'lucide-react';
import { AtlasMegaMenu } from './navigation/AtlasMegaMenu';
import { CommandPalette } from './navigation/CommandPalette';
import { useSearch } from '../contexts/SearchContext';
import { useUI } from '../contexts/UIContext';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { toggle: toggleSearch } = useSearch();
  const { openBooking } = useUI();
  const { scrollY } = useScroll();

  // Phase 1 Spec: 64px max blur for liquid glass feel
  const headerOpacity = useTransform(scrollY, [0, 50], [0, 1]);
  const headerBlur = useTransform(scrollY, [0, 50], [0, 64]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.1]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        onMouseLeave={() => setMegaMenuOpen(false)}
      >
        {/* Dynamic Glass Background */}
        <motion.div
          className="absolute inset-0 border-b border-white/0"
          style={{
            opacity: headerOpacity,
            backdropFilter: useTransform(headerBlur, (v) => `blur(${v}px)`),
            backgroundColor: 'rgba(5, 5, 5, 0.7)',
            borderColor: useTransform(borderOpacity, (v) => `rgba(255, 255, 255, ${v})`)
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav - High Density Typography */}
          <nav className="hidden md:flex items-center gap-1">
            <button
              onMouseEnter={() => setMegaMenuOpen(true)}
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 tracking-wide flex items-center gap-1 group"
            >
              Pathways
              <ChevronDown size={14} className={`transition-transform duration-300 ${megaMenuOpen ? 'rotate-180' : ''} group-hover:text-accent-cyan`} />
            </button>
            {['Tools', 'Enterprise', 'About'].map((link) => (
              <a
                key={link}
                href="#"
                className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleSearch}
              className="group flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-lg border border-transparent hover:border-white/10"
            >
              <Search size={16} />
              <span className="text-xs font-mono opacity-50 group-hover:opacity-100 hidden lg:inline-block">CMD+K</span>
            </button>
            <button
              onClick={openBooking}
              className="px-5 py-2 rounded-pill bg-white/5 border border-white/10 text-xs font-semibold tracking-wider uppercase hover:bg-white/10 hover:border-accent-cyan/30 transition-all duration-300"
            >
              Book Consultation
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Desktop Mega Menu */}
        <AtlasMegaMenu isOpen={megaMenuOpen} onClose={() => setMegaMenuOpen(false)} />

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="md:hidden bg-[#050505] border-b border-white/10 overflow-hidden relative z-40"
          >
            <nav className="flex flex-col p-6 gap-4">
              {/* Mobile Search */}
              <button
                onClick={() => { toggleSearch(); setMobileMenuOpen(false); }}
                className="flex items-center gap-3 w-full p-3 rounded-lg bg-white/5 text-gray-400 mb-4"
              >
                <Search size={18} />
                <span className="text-sm">Search...</span>
              </button>

              {['Pathways', 'Tools', 'Enterprise', 'About'].map((link) => (
                <a key={link} href="#" className="text-lg font-medium text-gray-300">
                  {link}
                </a>
              ))}
              <div className="h-[1px] bg-white/10 my-2" />
              <button className="w-full py-3 rounded-lg bg-accent-cyan text-black font-bold text-sm uppercase tracking-wide">
                Start Assessment
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* Global Search Overlay */}
      <CommandPalette />
    </>
  );
};