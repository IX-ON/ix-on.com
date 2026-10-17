import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { FileText, CheckCircle2 } from 'lucide-react';

export const AutomatedDocPipelines: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const capabilities = [
    {
      index: '01',
      title: 'Living SOP & Process Synthesis',
      desc: 'Standard Operating Procedures automatically re-compile whenever underlying BPMN workflows, API contracts, or business rules are modified in production.',
      highlight: 'Continuous Zero-Drift Sync',
    },
    {
      index: '02',
      title: 'Regulatory Audit Package Bundler',
      desc: 'Pre-packaged, cryptographically verifiable compliance dossiers compiled on-demand for FCA, PRA, BaFin, and CFPB statutory examinations.',
      highlight: 'Statutory Audit Readiness',
    },
    {
      index: '03',
      title: 'AI Grounding Knowledge Injection',
      desc: 'Operational documentation is automatically vectorized into curated knowledge stores so enterprise copilots never cite deprecated policies or stale interest rates.',
      highlight: 'Grounded Context Store',
    },
    {
      index: '04',
      title: 'Machine-Readable Artifact Exports',
      desc: 'Simultaneous continuous export to OpenAPI specs, AsyncAPI schemas, BPMN 2.0 XML, and clean markdown for cross-engineering clarity.',
      highlight: 'Multi-Schema Export',
    },
  ];

  return (
    <section id="automated-docs" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#FFFFFF] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Core Consultancy Service</span>
            <span aria-hidden="true">&bull;</span>
            <span>03. Automated Documentation Pipelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Automated documentation pipelines that never go stale.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 leading-relaxed max-w-2xl">
            Static Confluence wikis and 400-page PDF policy manuals decay within weeks of publication. 
            IX-ON engineers self-updating living documentation pipelines that stay continuously synchronized 
            with your live systems, database schemas, and operator decision gates.
          </p>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => (
            <div key={cap.index} className="consultancy-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DCCF]">
                  <span className="font-mono text-xs font-bold text-[#786450]">
                    Pillar {cap.index}
                  </span>
                  <span className="text-xs text-[#4B5363] font-medium">
                    {cap.highlight}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#12151B] mb-2">{cap.title}</h3>
                <p className="text-sm text-[#4B5363] leading-relaxed">{cap.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E5DCCF] flex items-center gap-2 text-xs text-[#12151B] font-medium">
                <CheckCircle2 size={15} className="text-[#786450]" />
                <span>Integrated into version control &amp; release pipelines</span>
              </div>
            </div>
          ))}
        </div>

        {/* Living Documentation Architecture Panel */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#F8F6F1] border border-[#D9CEBF]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#E5DCCF]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#786450]">
                Architecture Overview
              </span>
              <h4 className="text-lg font-bold text-[#12151B] mt-1">
                How Living Documentation Eliminates Regulatory Friction
              </h4>
            </div>
            <div className="flex items-center gap-4 text-xs text-[#4B5363]">
              <span className="flex items-center gap-1.5">
                <FileText size={14} className="text-[#786450]" />
                <span>Format: Markdown / JSON-LD / BPMN 2.0</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 text-xs text-[#4B5363] leading-relaxed">
            <div>
              <strong className="text-[#12151B] block text-sm mb-1">1. Event-Driven Capture</strong>
              Every API deployment, schema migration, or policy adjustment triggers an automated webhook, generating deterministic documentation diffs in real time.
            </div>
            <div>
              <strong className="text-[#12151B] block text-sm mb-1">2. Multi-Stakeholder Compilation</strong>
              One single source of operational truth compiles simultaneously into executive compliance memos, developer API docs, and frontline underwriter condition sheets.
            </div>
            <div>
              <strong className="text-[#12151B] block text-sm mb-1">3. Immutable Audit Trails</strong>
              Every revision is cryptographically hashed, providing external regulators with instant proof that operations match written policy without manual audit fire-drills.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
