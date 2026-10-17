import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export const ProcessMappingSection: React.FC = () => {
  const { ref, isVisible } = useFadeIn();
  const [activeWorkflow, setActiveWorkflow] = useState<'lending' | 'underwriting' | 'compliance'>('lending');

  const workflows = {
    lending: {
      title: 'Commercial & Retail Loan Intake',
      asIs: [
        { phase: 'Applicant Submission', issue: 'Fragmented portals, unverified attachments, missing source lineage', latency: '2–4 Days' },
        { phase: 'Manual Document Triage', issue: 'Operators transcribing bank PDF numbers into underwriting spreadsheets', latency: '3–5 Days' },
        { phase: 'Credit Committee Prep', issue: 'Static decks compiled from stale ledger snapshots without audit trails', latency: '2 Days' },
      ],
      targetState: [
        { phase: 'Mapped Omnichannel Intake', solution: 'Direct API & document provenance tagging at ingestion point', speed: '< 15 Mins' },
        { phase: 'Automated Lineage Normalization', solution: 'OCR & field-level provenance verified against primary institutions', speed: 'Real-time' },
        { phase: 'Dynamic Living Dossier', solution: 'Living documentation pipeline continuously syncing with live feeds', speed: 'Continuous' },
      ],
      metrics: { timeReduction: '72%', errorReduction: '94%' },
    },
    underwriting: {
      title: 'Mortgage & Risk Underwriting Workstream',
      asIs: [
        { phase: 'Credit & Income Fetch', issue: 'Multiple vendor logins, disconnected PDFs, missing traceability', latency: '2 Days' },
        { phase: 'Policy Condition Validation', issue: 'Underwriters cross-referencing 300+ page lending manuals manually', latency: '3 Days' },
        { phase: 'Audit Packaging', issue: 'Scattered email threads and manual checklists before final sign-off', latency: '1–2 Days' },
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
        { phase: 'Historical Data Tracing', issue: 'Back-tracing numbers through 4 disparate SQL schemas with missing timestamps', latency: '3–4 Weeks' },
        { phase: 'Manual Report Compilation', issue: 'Teams manually assembling Word/PDF compliance exhibits for external regulators', latency: '2 Weeks' },
        { phase: 'Remediation Iterations', issue: 'Audit flags due to lack of verifiable data lineage and untracked transformations', latency: 'Ongoing' },
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
    <section id="process-mapping" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#FFFFFF] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Core Consultancy Service</span>
            <span aria-hidden="true">&bull;</span>
            <span>01. Process Mapping</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Current process mapping &amp; operational friction eradication.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 leading-relaxed max-w-2xl">
            Enterprise AI cannot thrive on top of broken or opaque workflows. 
            IX-ON observes your operational reality on the ground—mapping operator handoffs, 
            hidden spreadsheet dependencies, and manual transcription delays before architecting the automated target state.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Workflow Switcher & As-Is vs Target Board */}
          <div className="lg:col-span-7 space-y-6">
            {/* Functional Workflow Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2 p-1 bg-[#F8F6F1] rounded-xl border border-[#E5DCCF]">
              <button
                type="button"
                onClick={() => setActiveWorkflow('lending')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeWorkflow === 'lending'
                    ? 'bg-white text-[#12151B] shadow-xs'
                    : 'text-[#4B5363] hover:text-[#12151B]'
                }`}
              >
                Loan Intake &amp; Triage
              </button>
              <button
                type="button"
                onClick={() => setActiveWorkflow('underwriting')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeWorkflow === 'underwriting'
                    ? 'bg-white text-[#12151B] shadow-xs'
                    : 'text-[#4B5363] hover:text-[#12151B]'
                }`}
              >
                Mortgage Underwriting
              </button>
              <button
                type="button"
                onClick={() => setActiveWorkflow('compliance')}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeWorkflow === 'compliance'
                    ? 'bg-white text-[#12151B] shadow-xs'
                    : 'text-[#4B5363] hover:text-[#12151B]'
                }`}
              >
                Regulatory Audit &amp; TRID
              </button>
            </div>

            {/* As-Is Reality Card */}
            <div className="consultancy-card border-[#E5DCCF] bg-[#FAF8F5]">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DCCF]">
                <div className="flex items-center gap-2">
                  <AlertCircle size={17} className="text-[#9E4B2B]" />
                  <h3 className="font-bold text-sm text-[#12151B]">
                    Current As-Is Reality (Before IX-ON Advisory)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#9E4B2B] font-semibold">
                  Manual Friction Identified
                </span>
              </div>

              <div className="space-y-3">
                {current.asIs.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-[#E5DCCF]/80">
                    <div className="flex items-center justify-between text-xs font-bold text-[#12151B]">
                      <span>{item.phase}</span>
                      <span className="text-[#9E4B2B] font-mono flex items-center gap-1 font-semibold text-[11px]">
                        <Clock size={11} /> {item.latency}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5363] mt-1 leading-snug">{item.issue}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target State Card */}
            <div className="consultancy-card border-[#12151B] bg-white shadow-sm">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DCCF]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-emerald-700" />
                  <h3 className="font-bold text-sm text-[#12151B]">
                    Engineered Target State (Mapped by IX-ON)
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold">
                  <span className="text-[#12151B]">{current.metrics.timeReduction} Turnaround</span>
                  <span aria-hidden="true">&bull;</span>
                  <span className="text-emerald-700">{current.metrics.errorReduction} Fewer Defects</span>
                </div>
              </div>

              <div className="space-y-3">
                {current.targetState.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]/80">
                    <div className="flex items-center justify-between text-xs font-bold text-[#12151B]">
                      <span>{item.phase}</span>
                      <span className="text-emerald-700 font-mono text-[11px]">
                        {item.speed}
                      </span>
                    </div>
                    <p className="text-xs text-[#4B5363] mt-1 leading-snug font-medium">{item.solution}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Blueprint Photography & Advisory Methodology */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-[#D9CEBF] bg-white shadow-sm">
              <img
                src="/src/assets/images/process_mapping_engineering_1792269453446.jpg"
                alt="Business Process Mapping Blueprint and Automated Systems Architecture"
                className="w-full h-64 sm:h-72 object-cover"
                loading="lazy"
              />
              <div className="p-5 bg-white border-t border-[#E5DCCF]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#786450]">
                  IX-ON Mapping Methodology:
                </h4>
                <div className="mt-3 space-y-2.5 text-xs text-[#4B5363]">
                  <div>
                    <strong className="text-[#12151B]">1. Operator Shadowing &amp; Micro-Audits:</strong> We observe real underwriters and case managers rather than relying on outdated management flowcharts.
                  </div>
                  <div>
                    <strong className="text-[#12151B]">2. System Handoff &amp; Lineage Inventory:</strong> Documenting every spreadsheet export, third-party portal query, and manual approval gate.
                  </div>
                  <div>
                    <strong className="text-[#12151B]">3. Deterministic Target Architecture:</strong> Designing machine-readable pipelines with automated validation and living documentation.
                  </div>
                </div>
              </div>
            </div>

            {/* Advisory Quote Card */}
            <div className="p-5 rounded-2xl bg-[#F8F6F1] border border-[#E5DCCF]">
              <p className="text-xs sm:text-sm text-[#12151B] italic leading-relaxed">
                &ldquo;Automating a broken process only accelerates the generation of errors. 
                Rigorous as-is process mapping is the essential prerequisite to sustainable AI adoption.&rdquo;
              </p>
              <div className="mt-3 text-xs text-[#786450] font-medium">
                IX-ON Enterprise Advisory Practice
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
