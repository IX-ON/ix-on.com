import React from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { CheckCircle2 } from 'lucide-react';

export const WhyIxOn: React.FC = () => {
  const { ref, isVisible } = useFadeIn();

  const differentiators = [
    {
      index: '01',
      title: 'Vendor-Impartial Systems Architecture',
      desc: 'Like premier Scottish and UK advisory firms, we do not sell proprietary black boxes or push specific software vendors. We architect the best technical solution for your existing stack.',
    },
    {
      index: '02',
      title: 'Ground-Level Operator Observation',
      desc: 'We shadow underwriters, case handlers, and credit officers in their daily work. We capture the actual tacit workarounds, undocumented spreadsheets, and manual handoffs that executive slides overlook.',
    },
    {
      index: '03',
      title: 'Deterministic Regulatory Assurance',
      desc: 'Our lineage protocols are engineered to withstand strict statutory oversight from the FCA, PRA, BaFin, and CFPB. Every field has mathematical provenance before reaching an AI model.',
    },
    {
      index: '04',
      title: 'North Star Production Acceleration',
      desc: 'We don’t just deliver PowerPoint recommendations. Our pre-architected North Star Mortgage and SME Loan Case Management platforms allow rapid, turnkey deployment on dedicated private clouds.',
    },
  ];

  return (
    <section id="why-ixon" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F8F6F1] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Advisory Principles</span>
            <span aria-hidden="true">&bull;</span>
            <span>Why Financial Leaders Choose IX-ON</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Rigorous engineering over generic AI hype.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 leading-relaxed max-w-2xl">
            We bridge high-level operational strategy with deep systems integration to deliver 
            audit-proof, high-performance execution for modern lending operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((diff) => (
            <div key={diff.index} className="consultancy-card bg-white flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E5DCCF]">
                  <span className="font-mono text-xs font-bold text-[#786450]">
                    Standard {diff.index}
                  </span>
                  <CheckCircle2 size={16} className="text-[#786450]" />
                </div>
                <h3 className="text-xl font-bold text-[#12151B] mb-2">{diff.title}</h3>
                <p className="text-sm text-[#4B5363] leading-relaxed">{diff.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
