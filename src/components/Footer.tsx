import React from 'react';
import { Compass, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#02050c] text-gray-400">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#001a34] to-[#38bdf8] border border-[#b7d4ff]/30 flex items-center justify-center text-white">
                <Compass size={16} className="text-[#b7d4ff]" />
              </div>
              <span className="text-xl font-extrabold tracking-wider text-white">
                IX-ON
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Enterprise process mapping consultancy with data lineage readiness for AI scalability and automated living documentation pipelines.
            </p>
            <a
              href="mailto:info@ix-on.com"
              className="text-xs text-[#38bdf8] hover:text-white transition-colors flex items-center gap-1 font-mono"
            >
              <Mail size={12} />
              <span>info@ix-on.com</span>
            </a>
          </div>

          {/* Core Consultancy */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Consultancy Capabilities
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#process-mapping" className="hover:text-white transition-colors">
                  Current Process Mapping (As-Is)
                </a>
              </li>
              <li>
                <a href="#data-lineage" className="hover:text-white transition-colors">
                  AI Data Lineage &amp; Provenance
                </a>
              </li>
              <li>
                <a href="#automated-docs" className="hover:text-white transition-colors">
                  Automated Living Doc Pipelines
                </a>
              </li>
              <li>
                <a href="#framework" className="hover:text-white transition-colors">
                  Execution Methodology
                </a>
              </li>
            </ul>
          </div>

          {/* North Star Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              North Star Solutions
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#north-star" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1">
                  <span>Mortgage Case Management</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-[#38bdf8] transition-colors flex items-center gap-1">
                  <span>SME Loan Case Management</span>
                  <ArrowUpRight size={12} />
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-white transition-colors">
                  Automated Underwriting Workstream
                </a>
              </li>
              <li>
                <a href="#north-star" className="hover:text-white transition-colors">
                  Living Covenant &amp; Closing Packs
                </a>
              </li>
            </ul>
          </div>

          {/* Compliance & Standards */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
              Governance &amp; Rigor
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>BCBS 239 Risk Data Aggregation</li>
              <li>EU AI Act Technical Documentation</li>
              <li>CFPB &amp; TRID Regulatory Audits</li>
              <li>ISO 20022 Financial Data Harmonization</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>&copy; {new Date().getFullYear()} IX-ON. All rights reserved. Built for enterprise scale and verifiable AI readiness.</p>
          <div className="flex items-center gap-4 text-gray-400">
            <a href="#contact" className="hover:text-white transition-colors">Privacy &amp; MNDA</a>
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
