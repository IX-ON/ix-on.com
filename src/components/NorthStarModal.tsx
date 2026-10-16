import React, { useState } from 'react';
import { X, FileText, ArrowRight, ShieldCheck, Database, Layers, Activity } from 'lucide-react';

export interface SolutionDetails {
  id: 'mortgage' | 'sme-loan';
  title: string;
  productName: string;
  tagline: string;
  description: string;
  stages: { step: string; name: string; lineage: string; docOutput: string }[];
  lineageMetrics: { label: string; value: string }[];
  complianceStandards: string[];
  sampleDocTitle: string;
  sampleDocContent: string;
}

interface NorthStarModalProps {
  solution: SolutionDetails | null;
  onClose: () => void;
  onContactSelect: (solutionTitle: string) => void;
}

export const NorthStarModal: React.FC<NorthStarModalProps> = ({ solution, onClose, onContactSelect }) => {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'lineage' | 'doc'>('pipeline');

  if (!solution) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#D8CABA] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#FAF8F5] border border-[#D8CABA] text-[#586170] hover:text-[#14171F] hover:bg-[#EFE8DE] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#FAF8F5] font-bold bg-[#14171F] px-3 py-1 rounded-full shadow-xs">
            {solution.productName} Solution Suite
          </span>
          <span className="text-xs text-[#7A6B5D] font-semibold">Enterprise Engine</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight">
          {solution.title}
        </h3>
        <p className="text-sm sm:text-base text-[#4D5564] mt-2 max-w-2xl leading-relaxed">
          {solution.description}
        </p>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E8DFD2] mt-6 gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'pipeline'
                ? 'border-[#14171F] text-[#14171F]'
                : 'border-transparent text-[#667080] hover:text-[#14171F]'
            }`}
          >
            <Layers size={16} />
            <span>Process &amp; Decision Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'lineage'
                ? 'border-[#14171F] text-[#14171F]'
                : 'border-transparent text-[#667080] hover:text-[#14171F]'
            }`}
          >
            <Database size={16} />
            <span>Data Lineage &amp; Traceability</span>
          </button>
          <button
            onClick={() => setActiveTab('doc')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'doc'
                ? 'border-[#14171F] text-[#14171F]'
                : 'border-transparent text-[#667080] hover:text-[#14171F]'
            }`}
          >
            <FileText size={16} />
            <span>Automated Living Documentation</span>
          </button>
        </div>

        {/* Tab 1: Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="mt-6 space-y-4">
            <p className="text-xs text-[#586170]">
              End-to-end case execution mapped with machine-readable checkpoints and automated handoffs:
            </p>
            <div className="space-y-3">
              {solution.stages.map((stage, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#B59E89] transition-colors">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#14171F] text-[#FAF8F5] flex items-center justify-center text-xs font-mono font-bold shrink-0 shadow-xs">
                      {stage.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#14171F]">{stage.name}</h4>
                      <p className="text-xs text-[#667080] mt-0.5">Lineage Source: <span className="text-[#14171F] font-mono font-medium">{stage.lineage}</span></p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-[11px] bg-white px-3 py-1 rounded-md text-[#78614E] border border-[#D8CABA] font-mono font-semibold shadow-xs">
                      Output: {stage.docOutput}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Lineage */}
        {activeTab === 'lineage' && (
          <div className="mt-6 space-y-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {solution.lineageMetrics.map((m, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] text-center">
                  <div className="text-2xl font-extrabold text-[#14171F]">{m.value}</div>
                  <div className="text-[12px] text-[#667080] font-medium mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* High-tech Trace Console */}
            <div className="p-4 rounded-xl bg-[#14171F] border border-[#2B313E] font-mono text-xs text-[#E8DFD8] shadow-inner">
              <div className="flex items-center justify-between text-[#FAF8F5] pb-2 mb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5 font-bold">
                  <Activity size={14} className="text-[#E8DFD8]" />
                  <span>Verified Lineage Chain [Field-Level Provenance]</span>
                </span>
                <span className="text-[10px] text-emerald-300 bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40">PASSED 100% AUDIT</span>
              </div>
              <div className="space-y-1.5 leading-relaxed text-[11px] text-[#D8C7B8]">
                <div><span className="text-white font-bold">&gt; INGESTION:</span> Ingested 14 primary verification sources via secure REST &amp; Webhook</div>
                <div><span className="text-white font-bold">&gt; ENRICHMENT:</span> KYC/KYB verified, biometric &amp; company registrar checksum match</div>
                <div><span className="text-white font-bold">&gt; TRANSFORMATION:</span> Normalized to ISO 20022 / MISMO 3.4 standard schema</div>
                <div><span className="text-white font-bold">&gt; AI ANCHORING:</span> Vectorized with source provenance hash &amp; policy constraint tags</div>
                <div><span className="text-white font-bold">&gt; AUDIT READINESS:</span> BCBS 239 &amp; EU AI Act automated compliance package compiled</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#14171F] block mb-2">Embedded Compliance Standards:</span>
              <div className="flex flex-wrap gap-2">
                {solution.complianceStandards.map((std, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D8CABA] text-xs text-[#2C313C] font-semibold flex items-center gap-1.5 shadow-xs">
                    <ShieldCheck size={13} className="text-[#8C735D]" />
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Doc Pipeline */}
        {activeTab === 'doc' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#586170]">Living Document Auto-Generated by IX-ON Pipeline:</span>
              <span className="text-[11px] text-[#14171F] font-mono font-bold bg-[#EFE8DE] px-2 py-0.5 rounded border border-[#D8CABA]">v3.4-synced</span>
            </div>
            <div className="p-4 rounded-xl bg-[#14171F] border border-[#2B313E] shadow-inner">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <span className="font-semibold text-sm text-white flex items-center gap-2">
                  <FileText size={16} className="text-[#E8DFD8]" />
                  {solution.sampleDocTitle}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-900/60 text-emerald-300 border border-emerald-500/40">
                  Ready for Underwriter &amp; AI Copilot
                </span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-[#D8C7B8] whitespace-pre-wrap overflow-x-auto">
                {solution.sampleDocContent}
              </pre>
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="mt-8 pt-6 border-t border-[#E8DFD2] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#586170]">
            Powered by <strong className="text-[#14171F]">IX-ON Process &amp; Lineage Engine</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#586170] hover:text-[#14171F] transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onContactSelect(solution.title);
                onClose();
              }}
              className="btn text-xs py-2.5 px-5"
            >
              <span>Schedule Architecture Walkthrough</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
