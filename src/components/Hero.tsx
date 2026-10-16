import React from 'react';
import { Sparkles, ArrowRight, GitFork, FileCode2, Cpu, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="hero-header">
      <div className="z-10 max-w-5xl px-4 mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D8CABA] shadow-xs mb-8 hover:border-[#B59E89] transition-colors">
          <Sparkles size={14} className="text-[#8C735D]" />
          <span className="text-xs uppercase tracking-widest text-[#2D333F] font-semibold">
            Process Mapping &amp; Data Lineage for Enterprise AI
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-h1">
          Current Process Mapping with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#14171F] via-[#2C3340] to-[#78614E] bg-clip-text text-transparent">
            Data Lineage Readiness to AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="hero-p">
          IX-ON is an elite consultancy engineering enterprise scalability through meticulous 
          as-is process mapping, regulatory data lineage assurance, and self-updating 
          automated documentation pipelines that prime your operations for generative and predictive AI.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-9">
          <a href="#north-star" className="btn">
            <span>Explore North Star Solutions</span>
            <ArrowRight size={17} />
          </a>

          <a href="#contact" className="btn-secondary">
            <span>Schedule Lineage Readiness Audit</span>
          </a>
        </div>

        {/* Core Capability Value Props in Light Theme */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl bg-white border border-[#D8CABA]/70 shadow-xs hover:border-[#B59E89] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-[#F4EFEA] text-[#14171F] flex items-center justify-center">
                <GitFork size={14} />
              </div>
              <span className="text-xs font-bold text-[#14171F]">Process Discovery</span>
            </div>
            <p className="text-[12px] text-[#586170] leading-snug">Micro-level As-Is workflow mapping &amp; friction analysis</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D8CABA]/70 shadow-xs hover:border-[#B59E89] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-[#F4EFEA] text-[#14171F] flex items-center justify-center">
                <Cpu size={14} />
              </div>
              <span className="text-xs font-bold text-[#14171F]">AI Data Lineage</span>
            </div>
            <p className="text-[12px] text-[#586170] leading-snug">Field-level provenance and vector context readiness</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D8CABA]/70 shadow-xs hover:border-[#B59E89] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-[#F4EFEA] text-[#14171F] flex items-center justify-center">
                <FileCode2 size={14} />
              </div>
              <span className="text-xs font-bold text-[#14171F]">Automated Pipelines</span>
            </div>
            <p className="text-[12px] text-[#586170] leading-snug">Living documentation syncing with live APIs and code</p>
          </div>

          <div className="p-4 rounded-xl bg-white border border-[#D8CABA]/70 shadow-xs hover:border-[#B59E89] hover:shadow-md transition-all">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-[#F4EFEA] text-[#14171F] flex items-center justify-center">
                <CheckCircle2 size={14} />
              </div>
              <span className="text-xs font-bold text-[#14171F]">North Star Engines</span>
            </div>
            <p className="text-[12px] text-[#586170] leading-snug">Mortgage &amp; SME Loan Case Management ready to deploy</p>
          </div>
        </div>
      </div>
    </header>
  );
};
