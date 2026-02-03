
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './ui/Logo';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-black pt-24 pb-8 border-t border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-[500px] bg-gradient-to-t from-accent-cyan/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-8">
              <Logo />
            </div>
            <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
              We simplify your journey to Canada with AI-driven assessments and expert legal guidance.
              Trusted by thousands of families and businesses worldwide.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-accent-cyan hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1: Immigration */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Immigration</h4>
            <ul className="space-y-4">
              <li><Link to="/live-in-canada/express-entry" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Express Entry</Link></li>
              <li><Link to="/live-in-canada/family-sponsorship" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Family Sponsorship</Link></li>
              <li><Link to="/live-in-canada/business-immigration" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Business Visa</Link></li>
              <li><Link to="/live-in-canada/pnps-program" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">PNP Programs</Link></li>
              <li><Link to="/live-in-canada/study-visa" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Study Permits</Link></li>
              <li><Link to="/live-in-canada/work-permit" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Work Permits</Link></li>
            </ul>
          </div>

          {/* Links Column 2: Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">CRS Calculator</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Job Bank</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">IELTS Prep</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Processing Times</a></li>
              <li><a href="#" className="text-gray-400 hover:text-accent-cyan transition-colors text-sm">Latest News</a></li>
            </ul>
          </div>

          {/* Links Column 3: Contact/CTA */}
          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-8 border border-white/10">
            <h4 className="font-bold text-white mb-2">Ready to Start?</h4>
            <p className="text-gray-400 text-sm mb-6">Get a free assessment of your eligibility.</p>

            <button onClick={() => navigate('/assessment')} className="w-full py-3 bg-accent-cyan text-black font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 mb-8">
              Check Eligibility <ArrowRight size={16} />
            </button>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail size={16} className="text-accent-cyan" />
                <span>contact@devimmigration.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone size={16} className="text-accent-cyan" />
                <span>+1 (604) 555-0123</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin size={16} className="text-accent-cyan" />
                <span>Vancouver, BC & Toronto, ON</span>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Dev International. Regulated Canadian Immigration Consultants (RCIC).
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};