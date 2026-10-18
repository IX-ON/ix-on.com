import React, { useState } from 'react';
import { Menu, X, Lock, ShieldCheck, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenCloudGateway?: (tab: 'signin' | 'subscribe') => void;
  onLaunchMergedPlatform?: () => void;
  hasActiveSession?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCloudGateway,
  onLaunchMergedPlatform,
  hasActiveSession = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Process Mapping', href: '#process-mapping' },
    { label: 'Data Lineage & AI', href: '#data-lineage' },
    { label: 'Automated Docs', href: '#automated-docs' },
    { label: 'North Star Solutions', href: '#north-star' },
    { label: 'Diagnostic Audit', href: '#diagnostic' },
    { label: 'Engagement Model', href: '#engagement' },
  ];

  return (
    <header className="nav-bar">
      {/* Zone 1: Single text element wordmark */}
      <a href="#" className="text-xl font-bold tracking-tight text-[#12151B] whitespace-nowrap shrink-0 no-underline">
        IX-ON
      </a>

      {/* Zone 2: Clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-7">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="hidden sm:flex items-center gap-2.5 shrink-0">
        {hasActiveSession ? (
          <button
            onClick={onLaunchMergedPlatform}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-800 hover:bg-emerald-900 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-xs"
            title="Open North Star Clouds (Active Encrypted Session)"
          >
            <ShieldCheck size={13} className="text-emerald-300" />
            <span>North Star (Active)</span>
          </button>
        ) : (
          <button
            onClick={() => onOpenCloudGateway && onOpenCloudGateway('signin')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#12151B] bg-transparent hover:bg-[#EAE3D6] rounded-full border border-[#D9CEBF] transition-all cursor-pointer whitespace-nowrap shrink-0"
            title="Access North Star Clouds via encrypted license key"
          >
            <Lock size={12} className="text-[#786450]" />
            <span>Encrypted Access 🔒</span>
          </button>
        )}

        <a
          href="#contact"
          className="btn-primary text-xs py-1.5 px-3.5 whitespace-nowrap shrink-0"
        >
          Book Discovery Call
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="text-[#12151B] p-2 rounded-lg bg-white border border-[#E5DCCF] hover:bg-[#F8F6F1] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#F8F6F1] border-b border-[#E5DCCF] py-6 px-6 flex flex-col space-y-4 shadow-xl">
          {hasActiveSession ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onLaunchMergedPlatform && onLaunchMergedPlatform();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <ShieldCheck size={14} className="text-emerald-300" />
              <span>Open North Star Clouds (Active Session)</span>
            </button>
          ) : (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCloudGateway && onOpenCloudGateway('signin');
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-[#12151B] text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Lock size={13} className="text-[#D9CEBF]" />
              <span>North Star Encrypted Client Portal</span>
            </button>
          )}

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#12151B] text-sm font-semibold hover:text-[#786450] transition-colors py-1"
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary text-xs py-2.5 px-4 text-center mt-2 flex items-center justify-center gap-2"
          >
            <span>Book Discovery Call</span>
            <ArrowRight size={13} />
          </a>
        </div>
      )}
    </header>
  );
};
