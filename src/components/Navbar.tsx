import React, { useState } from 'react';
import { Menu, X, Compass, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Process Mapping', href: '#process-mapping' },
    { label: 'Data Lineage & AI', href: '#data-lineage' },
    { label: 'Automated Docs', href: '#automated-docs' },
    { label: 'North Star Solutions', href: '#north-star', highlight: true },
    { label: 'Framework', href: '#framework' },
    { label: 'Why IX-ON', href: '#why-ixon' },
  ];

  return (
    <nav className="nav-bar">
      <div className="flex items-center gap-3">
        <a href="#" className="flex items-center gap-2.5 text-[#14171F] no-underline group">
          <div className="w-8 h-8 rounded-lg bg-[#14171F] border border-[#14171F] flex items-center justify-center text-[#FAF8F5] shadow-sm group-hover:scale-105 transition-transform">
            <Compass size={18} className="text-[#E8DFD8]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-[#14171F] block leading-none">
              IX-ON
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#7A6B5D] block font-semibold mt-0.5">
              Process &amp; AI Lineage
            </span>
          </div>
        </a>
      </div>

      {/* Desktop Links */}
      <div className="hidden lg:flex items-center nav-links">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={
              link.highlight
                ? 'text-[#14171F] font-semibold flex items-center gap-1.5 bg-[#EFE8DE] px-3.5 py-1 rounded-full border border-[#D8CABA] shadow-xs hover:bg-[#E8DFD2]'
                : 'text-[#3E4552] hover:text-[#14171F] font-medium'
            }
          >
            {link.label}
            {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#B59E89] animate-pulse"></span>}
          </a>
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-[#14171F] hover:bg-[#252A36] text-[#FAF8F5] text-xs font-semibold tracking-wide transition-all shadow-sm flex items-center gap-1.5"
        >
          <span>Lineage Readiness Audit</span>
          <ArrowUpRight size={14} className="text-[#E8DFD8]" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="text-[#14171F] p-2 rounded-lg bg-white border border-[#D8CABA] hover:bg-[#FAF8F5] transition-colors focus:outline-none shadow-xs"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#FAF8F5]/98 backdrop-blur-2xl border-b border-[#D8CABA] py-5 px-6 flex flex-col space-y-3.5 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base py-2 transition-colors flex items-center justify-between ${
                link.highlight ? 'text-[#14171F] font-bold' : 'text-[#3E4552] hover:text-[#14171F]'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && (
                <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#EFE8DE] text-[#14171F] border border-[#D8CABA] uppercase font-mono font-semibold">
                  Solutions
                </span>
              )}
            </a>
          ))}
          <div className="pt-3 border-t border-[#D8CABA]">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn w-full text-center py-3 text-sm"
            >
              Request Lineage Audit
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
