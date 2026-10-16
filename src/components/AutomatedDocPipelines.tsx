import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { FileCode, RefreshCw, Check } from 'lucide-react';

export const AutomatedDocPipelines: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const pipelineFeatures = [
    {
      title: 'Living SOP Generation',
      desc: 'Standard Operating Procedures automatically re-synthesize when underlying BPMN flows, APIs, or business rules are modified.',
      tag: 'Zero-Maintenance',
    },
    {
      title: 'Regulatory Audit Bundler',
      desc: 'Pre-packaged, cryptographically verifiable compliance documentation compiled on-demand for CFPB, PRA, FCA, and BaFin audits.',
      tag: 'Continuous Compliance',
    },
    {
      title: 'AI Agent Knowledge Injection',
      desc: 'Documentation is vectorized into fresh, contextual knowledge stores so your enterprise AI assistants never reference deprecated policies.',
      tag: 'Grounding Vector Engine',
    },
    {
      title: 'Machine-Readable Artifacts',
      desc: 'Simultaneous export to OpenAPI, AsyncAPI, BPMN 2.0 XML, and Markdown for seamless cross-engineering alignment.',
      tag: 'Universal Sync',
    },
  ];

  return (
    <section id="automated-docs" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#FAF8F5] border-t border-[#E8DFD2]`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE] border border-[#D8CABA] text-[#14171F] text-xs font-semibold tracking-wider uppercase mb-3 shadow-xs">
            <FileCode size={14} className="text-[#8C735D]" />
            <span>Zero-Drift Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#14171F] tracking-tight">
            Automated Documentation Pipelines
          </h2>
          <p className="text-base text-[#4D5564] mt-3 leading-relaxed">
            Eliminate stale confluence wikis, outdated PDF runbooks, and costly compliance audit findings. 
            IX-ON engineers self-updating living documentation pipelines that synchronize in lockstep with 
            your live code, APIs, and operational processes.
          </p>
        </div>

        {/* Feature Grid in Clean Light Theme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pipelineFeatures.map((feat, idx) => (
            <div key={idx} className="card group hover:border-[#B59E89] transition-all flex flex-col justify-between bg-white border border-[#D8CABA]/70 shadow-xs hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[11px] font-mono text-[#14171F] bg-[#EFE8DE] px-3 py-1 rounded-full border border-[#D8CABA] font-bold">
                    {feat.tag}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAF8F5] border border-[#D8CABA] text-[#7A6B5D] flex items-center justify-center group-hover:text-[#14171F] transition-colors shadow-2xs">
                    <RefreshCw size={15} className="group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#14171F] mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-[#4D5564] leading-relaxed font-medium">{feat.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DFD2] flex items-center gap-2 text-xs text-[#586170] font-medium">
                <Check size={14} className="text-emerald-700" />
                <span>Integrated with CI/CD &amp; Version Control</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Terminal / Pipeline Demonstration */}
        <div className="mt-12 rounded-2xl bg-[#14171F] border border-[#2B313E] overflow-hidden shadow-xl">
          <div className="bg-[#1E232E] px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs text-[#9AA3B2] font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E57373]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFD54F]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#81C784]"></span>
              <span className="ml-2 text-white font-medium">ix-on-living-docs-pipeline.sh</span>
            </div>
            <span className="text-[#E8DFD8] font-bold text-[11px] bg-white/10 px-2.5 py-0.5 rounded">STATUS: LIVE_SYNCHRONIZING</span>
          </div>

          <div className="p-5 font-mono text-xs space-y-2 text-[#D8C7B8] leading-relaxed overflow-x-auto">
            <p className="text-[#8C95A5]"># Triggered by Process Map Update: Mortgage Underwriting Flow [v4.1.2]</p>
            <p className="text-white font-bold">$ ixon docs compile --scope enterprise --target regulatory-audit</p>
            <p className="text-emerald-400">[SUCCESS] Scanned 48 micro-services &amp; 112 event topics</p>
            <p className="text-emerald-400">[SUCCESS] Verified data lineage hashes for 340 schema fields</p>
            <p className="text-[#FAF8F5]">[COMPILED] TRID-compliance-manifest-2026.pdf (Cryptographic SHA-256: 0x8a1b490f)</p>
            <p className="text-[#FAF8F5]">[COMPILED] living-sop-underwriting-agent.md &amp; openapi-v3.yaml</p>
            <p className="text-emerald-300">[VECTORIZED] Synchronized 1,420 chunks into Enterprise AI Vector Memory</p>
            <p className="text-white font-bold">&gt;&gt; Documentation pipeline execution completed in 1.42s with ZERO drift.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
