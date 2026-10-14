import React from 'react';
import { Sparkles, ArrowRight, GitFork, FileCode2, Cpu, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="hero-header">
      <div className="z-10 max-w-5xl px-4 mx-auto">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md mb-8 hover:border-[#b7d4ff]/40 transition-colors">
          <Sparkles size={14} className="text-[#38bdf8] animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-gray-200 font-medium">
            Process Mapping &amp; Data Lineage for Enterprise AI
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-h1">
          Current Process Mapping with <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-white via-[#b7d4ff] to-[#38bdf8] bg-clip-text text-transparent">
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

        {/* Core Capability Value Props */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-14 max-w-4xl mx-auto text-left">
          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
              <GitFork size={16} />
              <span className="text-xs font-semibold text-white">Process Discovery</span>
            </div>
            <p className="text-[11px] text-gray-400">Micro-level As-Is workflow mapping &amp; friction analysis</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#b7d4ff] mb-1">
              <Cpu size={16} />
              <span className="text-xs font-semibold text-white">AI Data Lineage</span>
            </div>
            <p className="text-[11px] text-gray-400">Field-level provenance and vector context readiness</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-[#38bdf8] mb-1">
              <FileCode2 size={16} />
              <span className="text-xs font-semibold text-white">Automated Pipelines</span>
            </div>
            <p className="text-[11px] text-gray-400">Living documentation syncing with live APIs and code</p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <CheckCircle2 size={16} />
              <span className="text-xs font-semibold text-white">North Star Engines</span>
            </div>
            <p className="text-[11px] text-gray-400">Mortgage &amp; SME Loan Case Management ready to deploy</p>
          </div>
        </div>
      </div>
    </header>
  );
};
