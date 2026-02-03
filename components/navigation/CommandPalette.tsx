import React, { useState, useMemo, useEffect } from 'react';
import { Command } from 'cmdk';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../../contexts/SearchContext';
import { sitemap, SitemapItem } from '../../data/sitemap';
import { Search, MoveRight, CornerDownLeft, Sparkles } from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const { isOpen, setIsOpen } = useSearch();
  const [search, setSearch] = useState('');

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => new Fuse(sitemap, {
    keys: ['title', 'category', 'description'],
    threshold: 0.3,
    distance: 100,
  }), []);

  const results = useMemo(() => {
    if (!search) return sitemap.slice(0, 5); // Show top 5 default items
    return fuse.search(search).map(result => result.item);
  }, [search, fuse]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl relative"
          >
            <Command
              shouldFilter={false} // We handle filtering with Fuse.js
              className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden flex flex-col max-h-[60vh]"
            >
              {/* Search Header */}
              <div className="flex items-center border-b border-white/10 px-4 py-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  placeholder="Ask Dev International or search..."
                  className="flex-1 bg-transparent text-white text-lg placeholder:text-gray-500 outline-none font-medium"
                />
                <div className="hidden md:flex items-center gap-2">
                   <span className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded border border-white/5">ESC</span>
                </div>
              </div>

              {/* Results List */}
              <Command.List className="overflow-y-auto p-2 scroll-py-2">
                
                {results.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p>No results found for "{search}"</p>
                  </div>
                )}

                {/* Categories Logic could be added here, but flat list is cleaner for command palette */}
                {results.map((item) => (
                  <CommandItem key={item.title + item.category} item={item} setIsOpen={setIsOpen} />
                ))}

              </Command.List>

              {/* Footer */}
              <div className="bg-white/2 border-t border-white/5 px-4 py-2 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1"><Sparkles size={10} className="text-accent-cyan" /> AI Ready</span>
                  <span className="flex items-center gap-1">240 Pages Indexed</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>Use</span> <CornerDownLeft size={10} /> <span>to select</span>
                </div>
              </div>

            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

interface CommandItemProps {
  item: SitemapItem;
  setIsOpen: (v: boolean) => void;
}

const CommandItem: React.FC<CommandItemProps> = ({ item, setIsOpen }) => {
  return (
    <Command.Item
      onSelect={() => {
        console.log('Selected', item.title);
        setIsOpen(false);
        // Navigate logic here
        if (item.href.startsWith('#')) {
             const el = document.getElementById(item.href.substring(1));
             el?.scrollIntoView({ behavior: 'smooth' });
        }
      }}
      className="group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer aria-selected:bg-white/10 transition-colors"
    >
      <div className={`p-2 rounded-md ${
        item.category === 'Tools' ? 'bg-accent-emerald/10 text-accent-emerald' : 
        item.category === 'Immigration' ? 'bg-accent-cyan/10 text-accent-cyan' :
        'bg-white/5 text-gray-400'
      }`}>
        {item.category === 'Tools' ? <Sparkles size={16} /> : <div className="w-4 h-4 rounded-full border border-current opacity-60" />}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-gray-200 font-medium group-aria-selected:text-white">{item.title}</span>
          {item.isNew && (
            <span className="text-[9px] bg-accent-cyan/20 text-accent-cyan px-1.5 py-0.5 rounded-full border border-accent-cyan/20">NEW</span>
          )}
        </div>
        {item.description && (
          <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
        )}
      </div>

      <div className="opacity-0 group-aria-selected:opacity-100 transition-opacity">
        <MoveRight size={14} className="text-gray-400" />
      </div>
    </Command.Item>
  );
};