import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Database, Binary, ShieldCheck, Cpu, Network } from 'lucide-react';

interface LineageTrace {
  id: string;
  field: string;
  systemOrigin: string;
  enrichmentLogic: string;
  aiReadinessVector: string;
  governanceCompliance: string;
  confidenceScore: string;
}

export const DataLineageSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const lineageNodes: LineageTrace[] = [
    {
      id: 'dscr',
      field: 'debt_service_coverage_ratio (DSCR)',
      systemOrigin: 'Xero API + Open Banking Barclays Feed (Real-time webhook sync)',
      enrichmentLogic: 'Normalizes 24-month gross operating profit against recurring debt obligations with interest rate stress test (+250bps)',
      aiReadinessVector: 'Structured embedding tagged with provenance hash 0x7c94a; ingested into Underwriter LLM context window with strict grounding bounds',
      governanceCompliance: 'BCBS 239 Principal 3 (Aggregation) & EU AI Act Annex IV (Record-Keeping & Technical Documentation)',
      confidenceScore: '99.98% Cryptographically Verified',
    },
    {
      id: 'income',
      field: 'verified_borrower_annual_income',
      systemOrigin: 'IRS Form 1040 direct tax transcript API + Automated Payroll OCR (Equifax / WorkNumber)',
      enrichmentLogic: 'Cross-verifies pay stub YTD run rates against historical 2-year IRS transcript declarations, identifying variance gaps > 1.5%',
      aiReadinessVector: 'Normalized JSON schema fed into Mortgage Underwriter Agent with verifiable citation pointers to primary source PDFs',
      governanceCompliance: 'CFPB Ability-to-Repay / Qualified Mortgage (ATR/QM) Rule & Fair Lending Act',
      confidenceScore: '100% Direct Authority Match',
    },
    {
      id: 'collateral',
      field: 'collateral_valuation_index (AVM)',
      systemOrigin: 'County Assessor Registry + Multi-Model Automated Valuation Feed (CoreLogic / Black Knight)',
      enrichmentLogic: 'Harmonizes GIS deed parcel records with neighborhood hedonic pricing indices and recent sales comp regressions',
      aiReadinessVector: 'Injected into Credit Risk AI Agent with geocoded spatial confidence bounds and hazard zone flags',
      governanceCompliance: 'Interagency Appraisal and Evaluation Guidelines & FIRREA Title XI',
      confidenceScore: '99.85% Multi-Model Consensus',
    },
  ];

  const [selectedNode, setSelectedNode] = useState<LineageTrace>(lineageNodes[0]);

  return (
    <section id="data-lineage" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#001020]/40 border-y border-white/5`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase mb-3">
            <Network size={14} />
            <span>AI Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Data Lineage Readiness for Enterprise AI
          </h2>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
            Enterprise generative and predictive AI fails when trained or prompted with untracked, 
            hallucinatory data. IX-ON constructs verifiable, field-level data lineage pipelines that 
            guarantee provenance, satisfy global regulators, and ensure autonomous AI systems operate with precision.
          </p>
        </div>

        {/* Interactive Lineage Inspector */}
        <div className="card p-6 sm:p-8 bg-black/60 border-[#38bdf8]/25 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#38bdf8] font-semibold">
                Interactive Lineage Graph Inspector
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                Select a Critical Field to Trace its Autonomous Path to AI
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lineageNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    selectedNode.id === node.id
                      ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'bg-white/5 text-gray-300 border-white/10 hover:text-white'
                  }`}
                >
                  {node.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Trace Breakdown Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 relative">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-gray-400">Step 1: Origin</span>
                  <Database size={15} className="text-[#38bdf8]" />
                </div>
                <h4 className="text-xs font-semibold text-white mb-2">Primary Ingestion Source</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedNode.systemOrigin}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                Provenance Tagged &check;
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-gray-400">Step 2: Transform</span>
                  <Binary size={15} className="text-[#38bdf8]" />
                </div>
                <h4 className="text-xs font-semibold text-white mb-2">Enrichment &amp; Verification</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedNode.enrichmentLogic}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                Rule Validated &check;
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-gray-400">Step 3: AI Anchoring</span>
                  <Cpu size={15} className="text-[#38bdf8]" />
                </div>
                <h4 className="text-xs font-semibold text-white mb-2">Vector &amp; Agent Grounding</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedNode.aiReadinessVector}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#38bdf8]">
                Context Anchored &check;
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-gray-400">Step 4: Governance</span>
                  <ShieldCheck size={15} className="text-emerald-400" />
                </div>
                <h4 className="text-xs font-semibold text-white mb-2">Compliance Attestation</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedNode.governanceCompliance}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-emerald-400">
                {selectedNode.confidenceScore}
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-6 p-4 rounded-xl bg-[#001a34]/50 border border-[#b7d4ff]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Selected Trace Target: <strong className="text-white font-mono">{selectedNode.field}</strong></span>
            </div>
            <div className="text-gray-400 font-mono text-[11px]">
              Ready for: LLM Function Calling, RAG Pipelines, Autonomous Underwriting
            </div>
          </div>
        </div>

        {/* 4 Pillars of Data Lineage Readiness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card">
            <h4 className="text-lg font-bold text-white mb-2">1. Field-Level Provenance</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Every numerical calculation, financial ratio, and risk parameter is traced back to its immutable 
              origin with timestamped execution logs.
            </p>
          </div>
          <div className="card">
            <h4 className="text-lg font-bold text-white mb-2">2. Hallucination Guardrails</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Large language models and AI agents are restricted to verified lineage context pools, 
              eliminating invented data in regulated credit and mortgage decisions.
            </p>
          </div>
          <div className="card">
            <h4 className="text-lg font-bold text-white mb-2">3. Continuous Regulatory Audit</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              Full compliance readiness for the European Union AI Act, Basel BCBS 239, CFPB, and OCC 
              model risk management mandates out of the box.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
