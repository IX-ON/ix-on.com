import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Database, Binary, ShieldCheck, Cpu } from 'lucide-react';

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
      governanceCompliance: 'BCBS 239 Principle 3 (Aggregation) & EU AI Act Annex IV (Record-Keeping & Technical Documentation)',
      confidenceScore: '100% Cryptographically Verified',
    },
    {
      id: 'income',
      field: 'verified_borrower_annual_income',
      systemOrigin: 'HMRC / IRS direct tax transcript API + Automated Payroll OCR (Equifax / WorkNumber)',
      enrichmentLogic: 'Cross-verifies pay stub YTD run rates against historical 2-year tax transcript declarations, identifying variance gaps > 1.5%',
      aiReadinessVector: 'Normalized JSON schema fed into Mortgage Underwriter Agent with verifiable citation pointers to primary source PDFs',
      governanceCompliance: 'CFPB Ability-to-Repay / Qualified Mortgage (ATR/QM) Rule & Fair Lending Act',
      confidenceScore: '100% Direct Authority Match',
    },
    {
      id: 'collateral',
      field: 'collateral_valuation_index (AVM)',
      systemOrigin: 'Land Registry + Multi-Model Automated Valuation Feed (CoreLogic / Hometrack)',
      enrichmentLogic: 'Harmonizes GIS deed parcel records with neighborhood hedonic pricing indices and recent sales comp regressions',
      aiReadinessVector: 'Injected into Credit Risk AI Agent with geocoded spatial confidence bounds and hazard zone flags',
      governanceCompliance: 'Interagency Appraisal and Evaluation Guidelines & FIRREA Title XI',
      confidenceScore: '99.85% Multi-Model Consensus',
    },
  ];

  const [selectedNode, setSelectedNode] = useState<LineageTrace>(lineageNodes[0]);

  return (
    <section id="data-lineage" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F8F6F1] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Core Consultancy Service</span>
            <span aria-hidden="true">&bull;</span>
            <span>02. Data Lineage &amp; AI Provenance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Data lineage readiness for enterprise AI.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 leading-relaxed max-w-2xl">
            Enterprise generative and predictive AI fails when trained or prompted with untracked, 
            unverified data. IX-ON constructs verifiable, field-level data lineage pipelines that 
            guarantee origin provenance, satisfy financial regulators, and ensure AI agents operate with mathematical grounding.
          </p>
        </div>

        {/* Interactive Lineage Inspector */}
        <div className="consultancy-card p-6 sm:p-8 bg-white border border-[#D9CEBF] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 mb-6 border-b border-[#E5DCCF] gap-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#786450] font-bold">
                Field Provenance Inspector
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-[#12151B] mt-0.5">
                Trace field origin from source API to AI reasoning layer
              </h3>
            </div>
            
            {/* Interactive Selectors */}
            <div className="flex items-center gap-1.5 p-1 bg-[#F8F6F1] rounded-xl border border-[#E5DCCF]">
              {lineageNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedNode.id === node.id
                      ? 'bg-white text-[#12151B] font-bold shadow-xs'
                      : 'text-[#4B5363] hover:text-[#12151B]'
                  }`}
                >
                  {node.id.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Trace Breakdown Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-mono text-[#786450] font-bold">Step 1: Origin</span>
                  <div className="w-6 h-6 rounded bg-white border border-[#D9CEBF] flex items-center justify-center text-[#12151B]">
                    <Database size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#12151B] mb-1.5">Primary Ingestion Source</h4>
                <p className="text-xs text-[#4B5363] leading-relaxed font-medium">{selectedNode.systemOrigin}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5DCCF] text-[11px] font-mono text-emerald-800 font-semibold">
                Provenance Tagged &bull; Verified
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-mono text-[#786450] font-bold">Step 2: Transform</span>
                  <div className="w-6 h-6 rounded bg-white border border-[#D9CEBF] flex items-center justify-center text-[#12151B]">
                    <Binary size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#12151B] mb-1.5">Enrichment &amp; Stress Rules</h4>
                <p className="text-xs text-[#4B5363] leading-relaxed font-medium">{selectedNode.enrichmentLogic}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5DCCF] text-[11px] font-mono text-emerald-800 font-semibold">
                Deterministic Validation
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-mono text-[#786450] font-bold">Step 3: Grounding</span>
                  <div className="w-6 h-6 rounded bg-white border border-[#D9CEBF] flex items-center justify-center text-[#12151B]">
                    <Cpu size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#12151B] mb-1.5">Vector &amp; Agent Anchoring</h4>
                <p className="text-xs text-[#4B5363] leading-relaxed font-medium">{selectedNode.aiReadinessVector}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5DCCF] text-[11px] font-mono text-[#786450] font-semibold">
                Context Bounds Locked
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] uppercase font-mono text-[#786450] font-bold">Step 4: Audit</span>
                  <div className="w-6 h-6 rounded bg-white border border-[#D9CEBF] flex items-center justify-center text-emerald-800">
                    <ShieldCheck size={13} />
                  </div>
                </div>
                <h4 className="text-xs font-bold text-[#12151B] mb-1.5">Regulatory Standard</h4>
                <p className="text-xs text-[#4B5363] leading-relaxed font-medium">{selectedNode.governanceCompliance}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#E5DCCF] text-[11px] font-mono text-emerald-800 font-semibold">
                {selectedNode.confidenceScore}
              </div>
            </div>
          </div>

          {/* Bottom Summary Bar */}
          <div className="mt-6 p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-[#12151B]">
              <span className="font-semibold text-[#786450]">Active Field Trace:</span>
              <span className="font-mono font-bold">{selectedNode.field}</span>
            </div>
            <div className="text-[#4B5363] font-mono text-[11px]">
              Ready for: LLM Function Calling &bull; Autonomous Underwriting &bull; BCBS 239 Audits
            </div>
          </div>
        </div>

        {/* 3 Pillars of Lineage Assurance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="consultancy-card">
            <h4 className="text-base font-bold text-[#12151B] mb-2">01. Field-Level Provenance</h4>
            <p className="text-xs sm:text-sm text-[#4B5363] leading-relaxed">
              Every numerical calculation, financial ratio, and risk parameter is traced back to its immutable 
              origin with timestamped execution logs.
            </p>
          </div>
          <div className="consultancy-card">
            <h4 className="text-base font-bold text-[#12151B] mb-2">02. Hallucination Elimination</h4>
            <p className="text-xs sm:text-sm text-[#4B5363] leading-relaxed">
              Large language models and AI agents are restricted to verified lineage context pools, 
              eliminating invented data in regulated credit and mortgage decisions.
            </p>
          </div>
          <div className="consultancy-card">
            <h4 className="text-base font-bold text-[#12151B] mb-2">03. Continuous Audit Proofs</h4>
            <p className="text-xs sm:text-sm text-[#4B5363] leading-relaxed">
              Full compliance readiness for the European Union AI Act, Basel BCBS 239, CFPB, and OCC 
              model risk management mandates out of the box.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
