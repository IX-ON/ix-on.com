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
    <section id="data-lineage" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F9F7F4] border-y border-[#E8DFD2]`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE] border border-[#D8CABA] text-[#14171F] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Network size={14} className="text-[#8C735D]" />
            <span>AI Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
            Data Lineage Readiness for Enterprise AI
          </h2>
          <p className="text-base text-[#4D5564] mt-3 leading-relaxed">
            Enterprise generative and predictive AI fails when trained or prompted with untracked, 
            hallucinatory data. IX-ON constructs verifiable, field-level data lineage pipelines that 
            guarantee provenance, satisfy global regulators, and ensure autonomous AI systems operate with precision.
          </p>
        </div>

        {/* Interactive Lineage Inspector in Light Theme */}
        <div className="card p-6 sm:p-8 bg-white border border-[#D8CABA] shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#E8DFD2] gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#78614E] font-bold">
                Interactive Lineage Graph Inspector
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#14171F] mt-1">
                Select a Critical Field to Trace its Autonomous Path to AI
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lineageNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                    selectedNode.id === node.id
                      ? 'bg-[#14171F] text-[#FAF8F5] border-[#14171F] font-bold shadow-xs'
                      : 'bg-[#FAF8F5] text-[#586170] border-[#D8CABA] hover:text-[#14171F] hover:bg-[#F2ECE4]'
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
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] flex flex-col justify-between hover:border-[#B59E89] transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-[#7A6B5D] font-bold">Step 1: Origin</span>
                  <div className="w-6 h-6 rounded-md bg-white border border-[#D8CABA] flex items-center justify-center text-[#14171F]">
                    <Database size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#14171F] mb-2">Primary Ingestion Source</h4>
                <p className="text-xs text-[#454D5B] leading-relaxed font-sans font-medium">{selectedNode.systemOrigin}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DFD2] text-[11px] font-mono text-emerald-700 font-bold">
                Provenance Tagged &check;
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] flex flex-col justify-between hover:border-[#B59E89] transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-[#7A6B5D] font-bold">Step 2: Transform</span>
                  <div className="w-6 h-6 rounded-md bg-white border border-[#D8CABA] flex items-center justify-center text-[#14171F]">
                    <Binary size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#14171F] mb-2">Enrichment &amp; Verification</h4>
                <p className="text-xs text-[#454D5B] leading-relaxed font-sans font-medium">{selectedNode.enrichmentLogic}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DFD2] text-[11px] font-mono text-emerald-700 font-bold">
                Rule Validated &check;
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] flex flex-col justify-between hover:border-[#B59E89] transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-[#7A6B5D] font-bold">Step 3: AI Anchoring</span>
                  <div className="w-6 h-6 rounded-md bg-white border border-[#D8CABA] flex items-center justify-center text-[#14171F]">
                    <Cpu size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#14171F] mb-2">Vector &amp; Agent Grounding</h4>
                <p className="text-xs text-[#454D5B] leading-relaxed font-sans font-medium">{selectedNode.aiReadinessVector}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DFD2] text-[11px] font-mono text-[#78614E] font-bold">
                Context Anchored &check;
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] flex flex-col justify-between hover:border-[#B59E89] transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-mono text-[#7A6B5D] font-bold">Step 4: Governance</span>
                  <div className="w-6 h-6 rounded-md bg-white border border-[#D8CABA] flex items-center justify-center text-emerald-700">
                    <ShieldCheck size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#14171F] mb-2">Compliance Attestation</h4>
                <p className="text-xs text-[#454D5B] leading-relaxed font-sans font-medium">{selectedNode.governanceCompliance}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E8DFD2] text-[11px] font-mono text-emerald-700 font-bold">
                {selectedNode.confidenceScore}
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-6 p-4 rounded-xl bg-[#F4EFEA] border border-[#D8CABA] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#2D333F]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14171F] animate-pulse"></span>
              <span>Selected Trace Target: <strong className="text-[#14171F] font-mono font-bold">{selectedNode.field}</strong></span>
            </div>
            <div className="text-[#586170] font-mono text-[11px] font-medium">
              Ready for: LLM Function Calling, RAG Pipelines, Autonomous Underwriting
            </div>
          </div>
        </div>

        {/* 3 Pillars of Data Lineage Readiness */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="card">
            <h4 className="text-lg font-bold text-[#14171F] mb-2">1. Field-Level Provenance</h4>
            <p className="text-xs sm:text-sm text-[#4D5564] leading-relaxed font-medium">
              Every numerical calculation, financial ratio, and risk parameter is traced back to its immutable 
              origin with timestamped execution logs.
            </p>
          </div>
          <div className="card">
            <h4 className="text-lg font-bold text-[#14171F] mb-2">2. Hallucination Guardrails</h4>
            <p className="text-xs sm:text-sm text-[#4D5564] leading-relaxed font-medium">
              Large language models and AI agents are restricted to verified lineage context pools, 
              eliminating invented data in regulated credit and mortgage decisions.
            </p>
          </div>
          <div className="card">
            <h4 className="text-lg font-bold text-[#14171F] mb-2">3. Continuous Regulatory Audit</h4>
            <p className="text-xs sm:text-sm text-[#4D5564] leading-relaxed font-medium">
              Full compliance readiness for the European Union AI Act, Basel BCBS 239, CFPB, and OCC 
              model risk management mandates out of the box.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
