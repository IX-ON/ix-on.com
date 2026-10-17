import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ExecutionFrameworkProps {
  onSelectAuditOption?: (optionName: string) => void;
}

export const ExecutionFramework: React.FC<ExecutionFrameworkProps> = ({ onSelectAuditOption }) => {
  const { ref, isVisible } = useFadeIn();

  const engagementTiers = [
    {
      step: 'Phase 01',
      title: 'Systems & Lineage Discovery',
      price: '£995 Fixed Fee',
      timeline: '72-Hour Delivery',
      desc: 'An intensive, independent examination of your current operational workflows, manual handoffs, and data lineage gaps.',
      deliverables: [
        'Complete As-Is operational flow blueprint',
        'Field-level data lineage and compliance gap report',
        'Prioritized automation & bottleneck remediation plan',
        'Fixed-price architecture & implementation proposal'
      ],
      cta: 'Book Discovery (£995)',
      isCredited: '100% credited against full build if you proceed',
      featured: true,
    },
    {
      step: 'Phase 02',
      title: 'Architecture & Pipeline Engineering',
      price: 'Custom Scope',
      timeline: '4–8 Weeks',
      desc: 'Bespoke engineering of automated documentation pipelines, field-level provenance tracking, and core banking or ERP integrations.',
      deliverables: [
        'Deterministic data lineage graph implementation',
        'Automated living documentation pipelines (BPMN / Markdown)',
        'BCBS 239 & EU AI Act regulatory compliance manifests',
        'Core system webhooks and API orchestration'
      ],
      cta: 'Discuss Implementation',
      isCredited: 'Dedicated UK engineering delivery team',
      featured: false,
    },
    {
      step: 'Phase 03',
      title: 'North Star Clouds Production',
      price: 'From £1,200/mo',
      timeline: 'Instant Tenancy',
      desc: 'Turnkey deployment of North Star Mortgage or SME Loan Case Management on dedicated, secure cloud infrastructure.',
      deliverables: [
        'Private multi-tenant cloud instance',
        'Automated underwriting condition sheets & living docs',
        'Continuous covenant & credit monitoring feeds',
        'Token-gated access with SOC2 / ISO 27001 alignment'
      ],
      cta: 'Explore North Star Clouds',
      isCredited: 'Licensed seats for underwriter teams',
      featured: false,
    },
  ];

  return (
    <section id="engagement" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#FFFFFF] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Commercial Engagement Model</span>
            <span aria-hidden="true">&bull;</span>
            <span>Transparent &bull; Fixed Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            How we engage with financial institutions.
          </h2>
          <p className="text-base text-[#4D5564] mt-4 leading-relaxed max-w-2xl">
            Modelled on premier UK technology advisory practices. We de-risk every project 
            by starting with a fixed-price, 72-hour systems discovery before undertaking enterprise build and deployment.
          </p>
        </div>

        {/* 3 Commercial Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {engagementTiers.map((tier) => (
            <div
              key={tier.step}
              className={`consultancy-card flex flex-col justify-between ${
                tier.featured ? 'border-[#12151B] ring-1 ring-[#12151B] shadow-md' : 'border-[#E5DCCF]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DCCF]">
                  <span className="font-mono text-xs font-bold text-[#786450]">{tier.step}</span>
                  <span className="text-xs font-semibold text-[#12151B]">{tier.timeline}</span>
                </div>

                <h3 className="text-2xl font-bold text-[#12151B] tracking-tight">{tier.title}</h3>
                
                <div className="mt-3 mb-4">
                  <div className="text-2xl font-extrabold text-[#12151B] tracking-tight">{tier.price}</div>
                  <div className="text-xs text-[#786450] font-medium mt-0.5">{tier.isCredited}</div>
                </div>

                <p className="text-xs sm:text-sm text-[#4B5363] leading-relaxed mb-6">
                  {tier.desc}
                </p>

                <div className="pt-4 border-t border-[#E5DCCF] space-y-2.5">
                  <div className="text-xs font-bold text-[#12151B] uppercase tracking-wide">Key Deliverables:</div>
                  {tier.deliverables.map((deliv, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-[#4B5363]">
                      <CheckCircle2 size={14} className="text-[#786450] shrink-0 mt-0.5" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5DCCF]">
                <a
                  href="#contact"
                  onClick={() => onSelectAuditOption && onSelectAuditOption(`${tier.title} (${tier.price})`)}
                  className={`w-full py-3 px-5 rounded-full text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    tier.featured 
                      ? 'bg-[#12151B] hover:bg-[#232834] text-white shadow-sm'
                      : 'bg-white hover:bg-[#F8F6F1] text-[#12151B] border border-[#D9CEBF]'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
