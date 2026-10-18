import React from 'react';
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react';
import heroImage from '../assets/images/hero_consultancy_architecture_1792269424922.jpg';

interface HeroProps {
  onOpenCloudGateway?: (tab: 'signin' | 'subscribe') => void;
  onLaunchMergedPlatform?: () => void;
  hasActiveSession?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenCloudGateway,
  onLaunchMergedPlatform,
  hasActiveSession = false
}) => {
  return (
    <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#F8F6F1] border-b border-[#E5DCCF]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-7">
            {/* Clean unboxed editorial kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450]">
              <span>Systems Architecture</span>
              <span aria-hidden="true">&bull;</span>
              <span>Data Lineage</span>
              <span aria-hidden="true">&bull;</span>
              <span>Enterprise AI Readiness</span>
            </div>

            {/* Main Headline with balanced wrap */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#12151B] tracking-tight leading-[1.08] text-balance">
              Current process mapping with data lineage readiness for AI.
            </h1>

            {/* Clear, concrete value proposition without buzzword fluff */}
            <p className="text-base sm:text-lg text-[#4B5363] leading-relaxed max-w-2xl">
              IX-ON audits operational bottlenecks, traces field-level data provenance, 
              and engineers self-updating automated documentation pipelines. We ensure your 
              enterprise workflows and lending systems are rigorously structured before AI models are deployed.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#diagnostic" className="btn-primary">
                <span>Start Systems Diagnostic (£995)</span>
                <ArrowRight size={14} />
              </a>

              {hasActiveSession ? (
                <button
                  onClick={onLaunchMergedPlatform}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-md cursor-pointer hover:scale-102"
                >
                  <ShieldCheck size={14} className="text-emerald-300" />
                  <span>North Star Clouds (Active Session)</span>
                  <ArrowRight size={13} />
                </button>
              ) : (
                <button
                  onClick={() => onOpenCloudGateway && onOpenCloudGateway('signin')}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Lock size={13} className="text-[#786450]" />
                  <span>Encrypted Client Portal (North Star)</span>
                </button>
              )}
            </div>

            {/* Security Guarantee Kicker */}
            <div className="text-[11px] text-[#786450] flex items-center gap-2 font-mono">
              <Lock size={11} />
              <span>North Star Clouds access is encrypted &bull; License tokens issued post-payment</span>
            </div>
          </div>

          {/* Right Column: Architectural Photography Focal Anchor */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-[#D9CEBF] shadow-lg bg-white">
              <img
                src={heroImage}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/hero_consultancy_architecture.jpg';
                }}
                alt="Modern corporate engineering and structural glass architecture representing systems clarity"
                className="w-full h-80 sm:h-96 object-cover object-center filter grayscale-[15%] contrast-[105%]"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D9CEBF] font-semibold">
                    Rigorous Enterprise Delivery
                  </span>
                  <p className="text-sm font-medium leading-snug">
                    Verifiable process workflows &bull; Audit-ready data structures
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
