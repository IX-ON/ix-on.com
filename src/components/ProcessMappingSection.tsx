import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { AlertTriangle, CheckCircle2, Search, Zap, Clock } from 'lucide-react';

export const ProcessMappingSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn();
  const [activeWorkflow, setActiveWorkflow] = useState<'lending' | 'underwriting' | 'compliance'>('lending');

  const workflows = {
    lending: {
      title: 'Commercial & Retail Loan Intake',
      asIs: [
        { phase: 'Applicant Submission', issue: 'Fragmented portals, unverified attachments, missing lineage metadata', delay: '2-4 Days' },
        { phase: 'Manual Document Triage', issue: 'Staff manually transcribing bank PDF numbers into underwriting spreadsheets', delay: '3-5 Days' },
        { phase: 'Credit Committee Prep', issue: 'Static PowerPoints compiled from stale ledger snapshots without audit trails', delay: '2 Days' },
      ],
      targetState: [
        { phase: 'Mapped Omnichannel Intake', solution: 'Direct API & document provenance tagging at point of ingestion', speed: '< 15 Mins' },
        { phase: 'Automated Lineage Normalization', solution: 'OCR & field-level provenance verified against primary institutions', speed: 'Real-time' },
        { phase: 'Dynamic Living Dossier', solution: 'Living documentation pipeline continuously syncing with live financial feeds', speed: 'Instant' },
      ],
      metrics: { timeReduction: '72%', errorReduction: '94%' },
    },
    underwriting: {
      title: 'Mortgage & Risk Underwriting Workstream',
      asIs: [
        { phase: 'Credit Bureau & Income Fetch', issue: 'Multiple vendor logins, unlinked credit inquiries, disconnected files', delay: '2 Days' },
        { phase: 'Policy Condition Validation', issue: 'Underwriters cross-referencing 300+ page lending manuals manually', delay: '3 Days' },
        { phase: 'Audit Packaging', issue: 'Scattered email threads and manual checklists before sign-off', delay: '1-2 Days' },
      ],
      targetState: [
        { phase: 'Unified Data Fabric', solution: 'Single-call provenance aggregation with cryptographic hash verification', speed: '< 5 Mins' },
        { phase: 'AI-Ready Policy Engine', solution: 'Vectorized policy rules with source-anchored citations and automated conditions', speed: 'Sub-second' },
        { phase: 'Living Audit Manifest', solution: 'Automated regulatory manifest generated concurrently with every decision', speed: 'Continuous' },
      ],
      metrics: { timeReduction: '68%', errorReduction: '99%' },
    },
    compliance: {
      title: 'Regulatory Audit & Reporting (BCBS 239 / TRID)',
      asIs: [
        { phase: 'Historical Data Tracing', issue: 'Back-tracing numbers through 4 disparate SQL schemas with missing timestamps', delay: '3-4 Weeks' },
        { phase: 'Manual Report Compilation', issue: 'Teams manually assembling Word/PDF compliance exhibits for external regulators', delay: '2 Weeks' },
        { phase: 'Remediation Iterations', issue: 'Audit flags due to lack of verifiable data lineage and untracked transformations', delay: 'Ongoing' },
      ],
      targetState: [
        { phase: 'Continuous Graph Lineage', solution: 'Autonomous lineage graph tracing every field from source API to model output', speed: 'Instant Query' },
        { phase: 'Automated Living Docs', solution: 'Regulatory documentation pipelines compiling compliant artifacts on demand', speed: 'One-Click' },
        { phase: 'Zero Audit Deficiencies', solution: 'Deterministic lineage proofs acceptable to global financial regulators', speed: '100% Traceable' },
      ],
      metrics: { timeReduction: '85%', errorReduction: '100%' },
    },
  };

  const current = workflows[activeWorkflow];

  return (
    <section id="process-mapping" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F4EFE9]/40 border-y border-[#E8DFD2]`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE] border border-[#D8CABA] text-[#14171F] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Search size={14} className="text-[#8C735D]" />
            <span>Consultancy Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
            Current Process Mapping &amp; Bottleneck Eradication
          </h2>
          <p className="text-base text-[#4D5564] mt-3 leading-relaxed">
            Enterprise AI cannot thrive on top of broken or opaque workflows. IX-ON maps your current 
            as-is operational reality, exposing hidden latency, manual handoffs, and lineage gaps 
            before engineering the scalable target state.
          </p>
        </div>

        {/* Interactive Workflow Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveWorkflow('lending')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeWorkflow === 'lending'
                ? 'bg-[#14171F] text-[#FAF8F5] border-[#14171F] shadow-sm'
                : 'bg-white text-[#586170] border-[#D8CABA] hover:text-[#14171F] shadow-xs'
            }`}
          >
            Workflow: Loan Intake &amp; Triage
          </button>
          <button
            onClick={() => setActiveWorkflow('underwriting')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeWorkflow === 'underwriting'
                ? 'bg-[#14171F] text-[#FAF8F5] border-[#14171F] shadow-sm'
                : 'bg-white text-[#586170] border-[#D8CABA] hover:text-[#14171F] shadow-xs'
            }`}
          >
            Workflow: Risk Underwriting
          </button>
          <button
            onClick={() => setActiveWorkflow('compliance')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeWorkflow === 'compliance'
                ? 'bg-[#14171F] text-[#FAF8F5] border-[#14171F] shadow-sm'
                : 'bg-white text-[#586170] border-[#D8CABA] hover:text-[#14171F] shadow-xs'
            }`}
          >
            Workflow: Regulatory Audit (BCBS 239)
          </button>
        </div>

        {/* Comparison Board: As-Is vs IX-ON Target State in Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* As-Is State */}
          <div className="card bg-[#FFFDFB] border border-[#E5DACD] shadow-sm">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#EFE5D9]">
              <div className="flex items-center gap-2 text-[#9A5333]">
                <AlertTriangle size={18} />
                <h3 className="font-bold text-base text-[#14171F]">Current As-Is Reality (Before IX-ON)</h3>
              </div>
              <span className="text-[11px] font-mono text-[#9A5333] bg-[#FDF2EC] px-2.5 py-0.5 rounded border border-[#E9C7B7] font-semibold">
                High Latency &amp; Lineage Gaps
              </span>
            </div>

            <div className="space-y-4">
              {current.asIs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EFE7DD]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#14171F]">
                    <span>{item.phase}</span>
                    <span className="text-[#9A5333] font-mono flex items-center gap-1 font-semibold">
                      <Clock size={12} /> {item.delay}
                    </span>
                  </div>
                  <p className="text-xs text-[#586170] mt-1.5 leading-relaxed">{item.issue}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE5D9] text-xs text-[#667080] flex items-center justify-between">
              <span>Legacy Documentation Status:</span>
              <span className="text-[#9A5333] font-mono font-medium">Outdated static PDFs / Manual Word files</span>
            </div>
          </div>

          {/* IX-ON Target State */}
          <div className="card bg-white border border-[#14171F]/40 shadow-md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E8DFD2]">
              <div className="flex items-center gap-2 text-[#14171F]">
                <Zap size={18} className="text-[#78614E]" />
                <h3 className="font-bold text-base text-[#14171F]">Target State (Mapped by IX-ON)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#FAF8F5] bg-[#14171F] px-2.5 py-0.5 rounded font-bold shadow-xs">
                  {current.metrics.timeReduction} Faster
                </span>
                <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-bold">
                  {current.metrics.errorReduction} Fewer Errors
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {current.targetState.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2]">
                  <div className="flex items-center justify-between text-xs font-bold text-[#14171F]">
                    <span className="text-[#14171F]">{item.phase}</span>
                    <span className="text-emerald-700 font-mono flex items-center gap-1 font-bold">
                      <CheckCircle2 size={13} /> {item.speed}
                    </span>
                  </div>
                  <p className="text-xs text-[#454D5B] mt-1.5 leading-relaxed font-medium">{item.solution}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#E8DFD2] text-xs text-[#454D5B] flex items-center justify-between">
              <span>Living Documentation Pipeline:</span>
              <span className="text-[#14171F] font-mono font-bold">Auto-generated &amp; live synced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
