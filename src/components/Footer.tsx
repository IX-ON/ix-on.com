import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#12151B] text-[#A6AFBD] py-16 border-t border-[#232834]">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <a href="#" className="text-xl font-bold tracking-tight text-white block">
              IX-ON
            </a>
            <p className="text-xs text-[#8E97A6] leading-relaxed max-w-xs">
              Independent systems architecture and process mapping consultancy. 
              Engineering data lineage readiness and automated living documentation for financial institutions.
            </p>
            <div className="pt-2 text-xs text-[#D9CEBF] font-mono">
              Offices: London &bull; Edinburgh
            </div>
            <a
              href="mailto:info@ix-on.com"
              className="text-xs text-white hover:text-[#D9CEBF] transition-colors inline-flex items-center gap-1.5 pt-1"
            >
              <Mail size={13} />
              <span>info@ix-on.com</span>
            </a>
          </div>

          {/* Practice Areas */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Advisory Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#process-mapping" className="hover:text-white transition-colors">
                  Current Process Mapping (As-Is)
                </a>
              </li>
              <li>
                <a href="#data-lineage" className="hover:text-white transition-colors">
                  Data Lineage &amp; AI Provenance
                </a>
              </li>
              <li>
                <a href="#automated-docs" className="hover:text-white transition-colors">
                  Automated Living Documentation
                </a>
              </li>
              <li>
                <a href="#diagnostic" className="hover:text-white transition-colors">
                  Process &amp; AI Maturity Diagnostic
                </a>
              </li>
              <li>
                <a href="#engagement" className="hover:text-white transition-colors">
                  Commercial Engagement Tiers
                </a>
              </li>
            </ul>
          </div>

          {/* North Star Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              North Star Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#north-star" className="hover:text-white text-[#D9CEBF] transition-colors">
                  Mortgage Case Management
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-white text-[#D9CEBF] transition-colors">
                  SME Loan Case Management
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-white transition-colors">
                  Underwriting Rules Engine
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-white transition-colors">
                  North Star Clouds Gateway (Paid)
                </a>
              </li>
            </ul>
          </div>

          {/* Governance & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Governance Standards
            </h4>
            <ul className="space-y-2 text-xs text-[#8E97A6]">
              <li>BCBS 239 Risk Data Aggregation</li>
              <li>EU AI Act Technical Documentation</li>
              <li>CFPB &amp; TRID Regulatory Alignment</li>
              <li>ISO 20022 Financial Data Lineage</li>
              <li>SOC2 Type II / ISO 27001 Security</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#232834] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6F7786]">
          <p>&copy; {new Date().getFullYear()} IX-ON Advisory Limited. Independent Systems Architecture. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#contact" className="hover:text-white transition-colors">Mutual NDA Terms</a>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-white transition-colors">Security Architecture</a>
            <span>&bull;</span>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
