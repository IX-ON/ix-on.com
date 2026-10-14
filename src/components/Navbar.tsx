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
        <a href="#" className="flex items-center gap-2.5 text-white no-underline group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#001a34] to-[#38bdf8] border border-[#b7d4ff]/30 flex items-center justify-center text-white shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform">
            <Compass size={18} className="text-[#b7d4ff]" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-white block leading-none">
              IX-ON
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#b7d4ff]/70 block font-medium mt-0.5">
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
            className={link.highlight ? 'text-[#b7d4ff] font-semibold flex items-center gap-1 bg-[#b7d4ff]/10 px-3 py-1 rounded-full border border-[#b7d4ff]/25' : ''}
          >
            {link.label}
            {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>}
          </a>
        ))}
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <a
          href="#contact"
          className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold tracking-wide transition-all backdrop-blur-md flex items-center gap-1.5 hover:border-[#b7d4ff]/50"
        >
          <span>Lineage Readiness Audit</span>
          <ArrowUpRight size={14} className="text-[#b7d4ff]" />
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="text-white p-2 rounded-lg bg-white/5 border border-white/10 hover:text-[#b7d4ff] transition-colors focus:outline-none"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-white/10 py-5 px-6 flex flex-col space-y-3.5 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-base py-2 transition-colors flex items-center justify-between ${
                link.highlight ? 'text-[#b7d4ff] font-semibold' : 'text-gray-200 hover:text-white'
              }`}
            >
              <span>{link.label}</span>
              {link.highlight && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/30 uppercase font-mono">
                  Solutions
                </span>
              )}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10">
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
