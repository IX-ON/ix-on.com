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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#030914] border border-[#b7d4ff]/30 shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#38bdf8] font-semibold bg-[#38bdf8]/10 px-2.5 py-1 rounded-md border border-[#38bdf8]/20">
            {solution.productName} Solution Suite
          </span>
          <span className="text-xs text-gray-400">Enterprise Engine</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          {solution.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-300 mt-2 max-w-2xl leading-relaxed">
          {solution.description}
        </p>

        {/* Tab Switcher */}
        <div className="flex border-b border-white/10 mt-6 gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'pipeline'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Layers size={16} />
            <span>Process &amp; Decision Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'lineage'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Database size={16} />
            <span>Data Lineage &amp; Traceability</span>
          </button>
          <button
            onClick={() => setActiveTab('doc')}
            className={`pb-2.5 px-3 text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 border-b-2 ${
              activeTab === 'doc'
                ? 'border-[#38bdf8] text-[#38bdf8]'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <FileText size={16} />
            <span>Automated Living Documentation</span>
          </button>
        </div>

        {/* Tab 1: Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="mt-6 space-y-4">
            <p className="text-xs text-gray-400">
              End-to-end case execution mapped with machine-readable checkpoints and automated handoffs:
            </p>
            <div className="space-y-3">
              {solution.stages.map((stage, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#b7d4ff]/30 transition-colors">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] border border-[#38bdf8]/40 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {stage.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{stage.name}</h4>
                      <p className="text-xs text-gray-400 mt-0.5">Lineage Source: <span className="text-gray-300 font-mono">{stage.lineage}</span></p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-[11px] bg-white/5 px-2.5 py-1 rounded text-[#b7d4ff] border border-white/10 font-mono">
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
                <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-center">
                  <div className="text-xl font-bold text-[#38bdf8]">{m.value}</div>
                  <div className="text-[11px] text-gray-400 mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-gray-300">
              <div className="flex items-center justify-between text-[#b7d4ff] pb-2 mb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5">
                  <Activity size={14} className="text-[#38bdf8]" />
                  <span>Verified Lineage Chain [Field-Level Provenance]</span>
                </span>
                <span className="text-[10px] text-emerald-400">PASSED 100% AUDIT</span>
              </div>
              <div className="space-y-1.5 leading-relaxed text-[11px]">
                <div><span className="text-[#38bdf8]">&gt; INGESTION:</span> Ingested 14 primary verification sources via secure REST &amp; Webhook</div>
                <div><span className="text-[#38bdf8]">&gt; ENRICHMENT:</span> KYC/KYB verified, biometric &amp; company registrar checksum match</div>
                <div><span className="text-[#38bdf8]">&gt; TRANSFORMATION:</span> Normalized to ISO 20022 / MISMO 3.4 standard schema</div>
                <div><span className="text-[#38bdf8]">&gt; AI ANCHORING:</span> Vectorized with source provenance hash &amp; policy constraint tags</div>
                <div><span className="text-[#38bdf8]">&gt; AUDIT READINESS:</span> BCBS 239 &amp; EU AI Act automated compliance package compiled</div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-300 block mb-2">Embedded Compliance Standards:</span>
              <div className="flex flex-wrap gap-2">
                {solution.complianceStandards.map((std, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-gray-300 flex items-center gap-1.5">
                    <ShieldCheck size={12} className="text-[#38bdf8]" />
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
              <span className="text-xs text-gray-400">Living Document Auto-Generated by IX-ON Pipeline:</span>
              <span className="text-[11px] text-[#38bdf8] font-mono">v3.4-synced</span>
            </div>
            <div className="p-4 rounded-xl bg-black/70 border border-white/15">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                <span className="font-semibold text-sm text-white flex items-center gap-2">
                  <FileText size={16} className="text-[#b7d4ff]" />
                  {solution.sampleDocTitle}
                </span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Ready for Underwriter &amp; AI Copilot
                </span>
              </div>
              <pre className="font-mono text-[11px] leading-relaxed text-gray-300 whitespace-pre-wrap overflow-x-auto">
                {solution.sampleDocContent}
              </pre>
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-gray-400">
            Powered by <strong className="text-white">IX-ON Process &amp; Lineage Engine</strong>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-gray-300 hover:text-white transition-colors"
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
