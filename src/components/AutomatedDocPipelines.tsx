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
    <section id="automated-docs" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase mb-3">
            <FileCode size={14} />
            <span>Zero-Drift Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Automated Documentation Pipelines
          </h2>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
            Eliminate stale confluence wikis, outdated PDF runbooks, and costly compliance audit findings. 
            IX-ON engineers self-updating living documentation pipelines that synchronize in lockstep with 
            your live code, APIs, and operational processes.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pipelineFeatures.map((feat, idx) => (
            <div key={idx} className="card group hover:border-[#38bdf8]/40 transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-1 rounded-full border border-[#38bdf8]/20">
                    {feat.tag}
                  </span>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-400 group-hover:text-[#b7d4ff] transition-colors">
                    <RefreshCw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feat.title}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{feat.desc}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400">
                <Check size={14} className="text-emerald-400" />
                <span>Integrated with CI/CD &amp; Version Control</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Terminal / Pipeline Demonstration */}
        <div className="mt-12 rounded-2xl bg-[#030712] border border-white/15 overflow-hidden shadow-2xl">
          <div className="bg-white/5 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs text-gray-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 text-gray-300">ix-on-living-docs-pipeline.sh</span>
            </div>
            <span className="text-[#38bdf8]">STATUS: LIVE_SYNCHRONIZING</span>
          </div>

          <div className="p-5 font-mono text-xs space-y-2 text-gray-300 leading-relaxed overflow-x-auto">
            <p className="text-gray-500"># Triggered by Process Map Update: Mortgage Underwriting Flow [v4.1.2]</p>
            <p className="text-[#b7d4ff]">$ ixon docs compile --scope enterprise --target regulatory-audit</p>
            <p className="text-emerald-400">[SUCCESS] Scanned 48 micro-services &amp; 112 event topics</p>
            <p className="text-emerald-400">[SUCCESS] Verified data lineage hashes for 340 schema fields</p>
            <p className="text-[#38bdf8]">[COMPILED] TRID-compliance-manifest-2026.pdf (Cryptographic SHA-256: 0x8a1b490f)</p>
            <p className="text-[#38bdf8]">[COMPILED] living-sop-underwriting-agent.md &amp; openapi-v3.yaml</p>
            <p className="text-[#b7d4ff]">[VECTORIZED] Synchronized 1,420 chunks into Enterprise AI Vector Memory</p>
            <p className="text-emerald-400 font-bold">&gt;&gt; Documentation pipeline execution completed in 1.42s with ZERO drift.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
