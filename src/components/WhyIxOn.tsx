import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Layers, ShieldCheck, Cpu, GitFork } from 'lucide-react';

export const WhyIxOn: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const valuePillars = [
    {
      title: 'Current Process Rigor',
      icon: GitFork,
      subtitle: 'We do not guess or rely on outdated org charts. We discover and codify the real as-is operational reality down to individual task handoffs.',
    },
    {
      title: 'Regulated AI Lineage',
      icon: ShieldCheck,
      subtitle: 'Complete field-level data provenance ensuring compliance with BCBS 239, EU AI Act, and CFPB mandates before AI touches customer data.',
    },
    {
      title: 'Zero-Maintenance Living Docs',
      icon: Layers,
      subtitle: 'Continuous documentation pipelines eliminate technical and operational drift, keeping SOPs and API contracts automatically in sync.',
    },
    {
      title: 'North Star Production Engines',
      icon: Cpu,
      subtitle: 'Field-tested case management architectures for Mortgage and SME Loan workflows delivering immediate ROI and enterprise scale.',
    },
  ];

  return (
    <section id="why-ixon" ref={ref} className={`fade ${isVisible ? 'show' : ''}`}>
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Global Enterprises Partner with IX-ON
          </h2>
          <p className="text-base text-gray-300 mt-3 leading-relaxed">
            Bridging operational strategy and deep software engineering to transform legacy financial 
            and enterprise workflows into AI-ready, scalable engines.
          </p>
        </div>

        <div className="grid-cards">
          {valuePillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="card group cursor-default">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#38bdf8] group-hover:scale-110 group-hover:border-[#38bdf8]/50 transition-all">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
