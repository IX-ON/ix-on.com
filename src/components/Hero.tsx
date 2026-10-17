import React from 'react';
import { ArrowRight, Lock } from 'lucide-react';
import heroImage from '../assets/images/hero_consultancy_architecture_1792269424922.jpg';

interface HeroProps {
  onOpenCloudGateway?: (tab: 'signin' | 'subscribe') => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCloudGateway }) => {
  return (
    <section className="pt-36 pb-20 lg:pt-44 lg:pb-28 bg-[#F8F6F1] border-b border-[#E5DCCF]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Proposition */}
          <div className="lg:col-span-7 space-y-7">
            {/* Clean unboxed editorial kicker (No pill box, no sparkle icon) */}
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
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#diagnostic" className="btn-primary">
                <span>Start Systems Diagnostic</span>
                <ArrowRight size={16} />
              </a>

              <a href="#north-star" className="btn-secondary">
                <span>North Star Solutions</span>
              </a>

              <button
                onClick={() => onOpenCloudGateway && onOpenCloudGateway('signin')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#12151B] hover:text-[#786450] transition-colors py-2 px-3 cursor-pointer"
              >
                <Lock size={12} className="text-[#786450]" />
                <span>North Star Clouds (Paid Access) &rarr;</span>
              </button>
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
                alt="Executive Boardroom and Systems Consultancy Team in London"
                className="w-full h-80 sm:h-96 lg:h-[420px] object-cover"
                loading="eager"
              />
              <div className="p-4 bg-white border-t border-[#E5DCCF] flex items-center justify-between text-xs text-[#4B5363]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#12151B]">Advisory Practice:</span>
                  <span>Financial Services &amp; Lending Operations</span>
                </div>
                <span className="text-[#786450] font-mono text-[11px]">London &bull; Edinburgh</span>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & Metric Strip below Hero split */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-[#E5DCCF]">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-[#12151B] tabular-nums tracking-tight">
              &pound;42M+
            </div>
            <p className="text-xs sm:text-sm text-[#4B5363] mt-1 font-medium">
              Lending &amp; case workflows mapped
            </p>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-[#12151B] tabular-nums tracking-tight">
              100%
            </div>
            <p className="text-xs sm:text-sm text-[#4B5363] mt-1 font-medium">
              Field-level data provenance verified
            </p>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-[#12151B] tabular-nums tracking-tight">
              -65%
            </div>
            <p className="text-xs sm:text-sm text-[#4B5363] mt-1 font-medium">
              Average underwriting turnaround latency
            </p>
          </div>

          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-[#12151B] tabular-nums tracking-tight">
              72h
            </div>
            <p className="text-xs sm:text-sm text-[#4B5363] mt-1 font-medium">
              Systems Discovery &amp; proposal delivery
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
