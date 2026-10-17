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
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border border-[#D9CEBF] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F8F6F1] border border-[#E5DCCF] text-[#4B5363] hover:text-[#12151B] hover:bg-[#EAE3D6] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
          <span>{solution.productName} Solutions Suite</span>
          <span aria-hidden="true">&bull;</span>
          <span>Enterprise Architecture</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12151B] tracking-tight">
          {solution.title}
        </h3>
        <p className="text-sm text-[#4B5363] mt-2 max-w-2xl leading-relaxed">
          {solution.description}
        </p>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#E5DCCF] mt-6 gap-2">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'pipeline'
                ? 'border-[#12151B] text-[#12151B]'
                : 'border-transparent text-[#4B5363] hover:text-[#12151B]'
            }`}
          >
            <Layers size={15} />
            <span>Process &amp; Decision Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab('lineage')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'lineage'
                ? 'border-[#12151B] text-[#12151B]'
                : 'border-transparent text-[#4B5363] hover:text-[#12151B]'
            }`}
          >
            <Database size={15} />
            <span>Data Lineage &amp; Traceability</span>
          </button>
          <button
            onClick={() => setActiveTab('doc')}
            className={`pb-2.5 px-3.5 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 border-b-2 cursor-pointer ${
              activeTab === 'doc'
                ? 'border-[#12151B] text-[#12151B]'
                : 'border-transparent text-[#4B5363] hover:text-[#12151B]'
            }`}
          >
            <FileText size={15} />
            <span>Automated Living Documentation</span>
          </button>
        </div>

        {/* Tab 1: Pipeline */}
        {activeTab === 'pipeline' && (
          <div className="mt-6 space-y-4">
            <p className="text-xs text-[#4B5363]">
              End-to-end case execution mapped with machine-readable checkpoints and automated handoffs:
            </p>
            <div className="space-y-3">
              {solution.stages.map((stage, i) => (
                <div key={i} className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#12151B] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0">
                      {stage.step}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-[#12151B]">{stage.name}</h4>
                      <p className="text-xs text-[#4B5363] mt-0.5">Lineage Source: <span className="text-[#12151B] font-mono font-medium">{stage.lineage}</span></p>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-xs bg-white px-3 py-1 rounded text-[#786450] border border-[#D9CEBF] font-mono font-semibold">
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
                <div key={i} className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] text-center">
                  <div className="text-2xl font-extrabold text-[#12151B] tabular-nums">{m.value}</div>
                  <div className="text-xs text-[#4B5363] font-medium mt-1">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Trace Console */}
            <div className="p-4 rounded-xl bg-[#12151B] border border-[#232834] font-mono text-xs text-[#D9CEBF]">
              <div className="flex items-center justify-between text-white pb-2 mb-2 border-b border-white/10">
                <span className="flex items-center gap-1.5 font-bold">
                  <Activity size={14} className="text-[#D9CEBF]" />
                  <span>Real-Time Provenance Trace Stream</span>
                </span>
                <span className="text-[11px] text-emerald-400 font-mono">CRYPTOGRAPHIC HASH: VERIFIED</span>
              </div>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div>[INGESTION] Plaid/Argyle &bull; Direct API token exchange authenticated.</div>
                <div>[NORMALIZATION] MISMO 3.4 schema applied &bull; Zero schema drift detected.</div>
                <div>[GROUNDING] Vector embeddings anchored to primary authority citations.</div>
                <div>[AUDIT LOCK] Immutable SHA-256 seal generated for TRID compliance package.</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DCCF]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#12151B] mb-2 flex items-center gap-2">
                <ShieldCheck size={15} className="text-emerald-700" />
                <span>Statutory Compliance Alignment</span>
              </h4>
              <div className="flex flex-wrap gap-2 text-xs">
                {solution.complianceStandards.map((std, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] font-mono text-[11px] font-medium">
                    {std}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Living Doc */}
        {activeTab === 'doc' && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#786450] block">Automated Output Sample</span>
                <h4 className="text-sm font-bold text-[#12151B]">{solution.sampleDocTitle}</h4>
              </div>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-bold">
                AUTO-COMPILED
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] font-mono text-xs text-[#12151B] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
              {solution.sampleDocContent}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-[#E5DCCF] flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-[#4B5363]">
            Engine: <strong className="text-[#12151B]">North Star Case Management</strong> &bull; Host: North Star Clouds
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#D9CEBF] text-xs font-semibold text-[#12151B] hover:bg-[#F8F6F1] transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onContactSelect(solution.title);
              }}
              className="btn-primary text-xs py-2 px-5 flex items-center gap-2 cursor-pointer"
            >
              <span>Request System Brief</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
