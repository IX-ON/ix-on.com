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
    <section id="process-mapping" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase mb-3">
            <Search size={14} />
            <span>Consultancy Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Current Process Mapping &amp; Bottleneck Eradication
          </h2>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
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
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            Workflow: Loan Intake &amp; Triage
          </button>
          <button
            onClick={() => setActiveWorkflow('underwriting')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeWorkflow === 'underwriting'
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            Workflow: Risk Underwriting
          </button>
          <button
            onClick={() => setActiveWorkflow('compliance')}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border ${
              activeWorkflow === 'compliance'
                ? 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]'
                : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            Workflow: Regulatory Audit (BCBS 239)
          </button>
        </div>

        {/* Comparison Board: As-Is vs IX-ON Target State */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* As-Is State */}
          <div className="card border-rose-500/20 bg-rose-950/[0.04]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400">
                <AlertTriangle size={18} />
                <h3 className="font-bold text-base text-white">Current As-Is Reality (Before IX-ON)</h3>
              </div>
              <span className="text-[11px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                High Latency &amp; Lineage Gaps
              </span>
            </div>

            <div className="space-y-4">
              {current.asIs.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-200">
                    <span>{item.phase}</span>
                    <span className="text-rose-400 font-mono flex items-center gap-1">
                      <Clock size={12} /> {item.delay}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">{item.issue}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-400 flex items-center justify-between">
              <span>Legacy Documentation Status:</span>
              <span className="text-rose-400 font-mono">Outdated static PDFs / Manual Word files</span>
            </div>
          </div>

          {/* IX-ON Target State */}
          <div className="card border-[#38bdf8]/30 bg-[#001a34]/30 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#38bdf8]/30">
              <div className="flex items-center gap-2 text-[#38bdf8]">
                <Zap size={18} />
                <h3 className="font-bold text-base text-white">Target State (Mapped by IX-ON)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded border border-[#38bdf8]/30">
                  {current.metrics.timeReduction} Faster
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {current.metrics.errorReduction} Fewer Errors
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {current.targetState.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-[#38bdf8]/20">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span className="text-[#b7d4ff]">{item.phase}</span>
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 size={12} /> {item.speed}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">{item.solution}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-gray-300 flex items-center justify-between">
              <span>Living Documentation Pipeline:</span>
              <span className="text-emerald-400 font-mono">Auto-generated &amp; live synced</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
