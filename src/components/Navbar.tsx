import React, { useState } from 'react';
import { Menu, X, Lock } from 'lucide-react';

interface NavbarProps {
  onOpenCloudGateway?: (tab: 'signin' | 'subscribe') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCloudGateway }) => {
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
      <div className="hidden sm:flex items-center gap-3 shrink-0">
        <button
          onClick={() => onOpenCloudGateway && onOpenCloudGateway('signin')}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#12151B] bg-transparent hover:bg-[#EAE3D6] rounded-full border border-[#D9CEBF] transition-all cursor-pointer whitespace-nowrap shrink-0"
          title="Access secured North Star Clouds environment"
        >
          <Lock size={12} className="text-[#786450]" />
          <span>North Star Clouds</span>
        </button>

        <a
          href="#contact"
          className="btn-primary text-xs py-2 px-4 whitespace-nowrap shrink-0"
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
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-[#12151B] py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}

          <div className="pt-4 border-t border-[#E5DCCF] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenCloudGateway) onOpenCloudGateway('signin');
              }}
              className="w-full py-2.5 px-4 rounded-full bg-white border border-[#D9CEBF] text-[#12151B] font-semibold text-xs flex items-center justify-center gap-2"
            >
              <Lock size={13} className="text-[#786450]" />
              <span>North Star Clouds (Secured Access)</span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary w-full text-center py-2.5 text-xs"
            >
              Book Discovery Call
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
