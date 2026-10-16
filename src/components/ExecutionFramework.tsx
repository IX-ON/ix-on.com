import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Compass, CheckCircle2, Search, Database, FileCode2, Rocket } from 'lucide-react';

export const ExecutionFramework: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const frameworkSteps = [
    {
      phase: 'Phase 01',
      title: 'Discover & Map (Current As-Is Exploration)',
      icon: Search,
      desc: 'Meticulous ethnographic process discovery, event-log extraction, stakeholder interviews, and shadow process identification to produce authoritative As-Is architecture maps.',
      outputs: ['As-Is BPMN 2.0 Flow Maps', 'Latency & Bottleneck Audit', 'Friction Point Catalog'],
    },
    {
      phase: 'Phase 02',
      title: 'Data Lineage Readiness & Provenance Tracing',
      icon: Database,
      desc: 'Cataloging source systems, recording transformations, establishing schema contracts, and certifying data provenance so inputs are 100% compliant and hallucination-free for AI.',
      outputs: ['Field-Level Lineage Matrix', 'BCBS 239 / EU AI Act Gap Analysis', 'Vector Context Schema'],
    },
    {
      phase: 'Phase 03',
      title: 'Automated Living Documentation Engineering',
      icon: FileCode2,
      desc: 'Constructing continuous documentation pipelines that sync directly with APIs, database changes, and business rules, generating living SOPs and automated regulatory audit dossiers.',
      outputs: ['CI/CD Doc Pipelines', 'Self-Healing SOP Repository', 'One-Click Compliance Exporter'],
    },
    {
      phase: 'Phase 04',
      title: 'Enterprise AI Activation & North Star Scale',
      icon: Rocket,
      desc: 'Deploying domain-specific case management engines—such as North Star Mortgage and SME Loan Case Management—equipped with grounded AI copilots and high-concurrency scalability.',
      outputs: ['North Star Case Management Deployment', 'Underwriting Copilots', 'Autonomous Governance Guardrails'],
    },
  ];

  return (
    <section id="framework" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F9F7F4] border-t border-[#E8DFD2]`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE] border border-[#D8CABA] text-[#14171F] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <Compass size={14} className="text-[#8C735D]" />
            <span>Consultancy Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
            The IX-ON Execution Framework
          </h2>
          <p className="text-base text-[#4D5564] mt-3 leading-relaxed">
            A battle-tested 4-stage engineering roadmap designed to bridge the gap between messy legacy 
            enterprise operations and autonomous, AI-driven scalability.
          </p>
        </div>

        {/* Timeline Items in Clean Light Theme */}
        <div className="timeline max-w-3xl mx-auto">
          {frameworkSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="timeline-item group">
                <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D8CABA]/70 group-hover:border-[#B59E89] group-hover:shadow-md transition-all shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#78614E] font-bold">
                      {step.phase}
                    </span>
                    <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#D8CABA] flex items-center justify-center text-[#14171F] shadow-2xs">
                      <Icon size={14} />
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#14171F] tracking-tight mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#4D5564] leading-relaxed mb-4 font-medium">
                    {step.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#E8DFD2]">
                    {step.outputs.map((out, oIdx) => (
                      <span
                        key={oIdx}
                        className="text-[11px] font-mono px-3 py-1 rounded-md bg-[#FAF8F5] text-[#2C313C] border border-[#D8CABA] flex items-center gap-1.5 font-medium shadow-2xs"
                      >
                        <CheckCircle2 size={12} className="text-emerald-700 font-bold" />
                        {out}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
