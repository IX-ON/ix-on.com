import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { ArrowRight, CheckCircle2, RotateCcw } from 'lucide-react';

interface DiagnosticAuditProps {
  onSelectAuditOption?: (summary: string) => void;
}

export const DiagnosticAudit: React.FC<DiagnosticAuditProps> = ({ onSelectAuditOption }) => {
  const { ref, isVisible } = useFadeIn();

  const [q1, setQ1] = useState<string>('manual');
  const [q2, setQ2] = useState<string>('siloed');
  const [q3, setQ3] = useState<string>('underwriting');
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateResults = () => {
    setIsCalculated(true);
  };

  const resetDiagnostic = () => {
    setIsCalculated(false);
  };

  return (
    <section id="diagnostic" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F1ECE2] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Diagnostic Assessment</span>
            <span aria-hidden="true">&bull;</span>
            <span>60-Second Evaluation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Evaluate your process maturity and AI lineage readiness.
          </h2>
          <p className="text-sm sm:text-base text-[#4B5363] mt-3 leading-relaxed">
            Inspired by independent UK technology maturity audits. Discover where operational latency, 
            manual transcriptions, and undocumented data fields are holding back your automation initiatives.
          </p>
        </div>

        {/* Diagnostic Card */}
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-[#D9CEBF] p-6 sm:p-10 shadow-sm">
          {!isCalculated ? (
            <div className="space-y-8">
              
              {/* Question 1 */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#786450] mb-2">
                  01. Operational Workflow Documentation
                </label>
                <h3 className="text-base sm:text-lg font-bold text-[#12151B] mb-3">
                  How are your current operational workflows and handoffs captured?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'informal', label: 'Informal / Tacit Knowledge', desc: 'Held in operators’ heads with no centralized maps' },
                    { id: 'manual', label: 'Static PDF & Word SOPs', desc: 'Manual manuals that quickly go out of date' },
                    { id: 'semi', label: 'Diagrams & Flowcharts', desc: 'Periodic Visio/Miro diagrams with untracked APIs' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQ1(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        q1 === opt.id
                          ? 'border-[#12151B] bg-[#F8F6F1] shadow-xs'
                          : 'border-[#E5DCCF] hover:border-[#CFC2B0] bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#12151B]">{opt.label}</div>
                      <div className="text-[11px] text-[#4B5363] mt-1 leading-snug">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div className="pt-6 border-t border-[#E5DCCF]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#786450] mb-2">
                  02. Data Lineage &amp; Provenance Readiness
                </label>
                <h3 className="text-base sm:text-lg font-bold text-[#12151B] mb-3">
                  How traceable is field-level data from source APIs to downstream reports or AI models?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'siloed', label: 'Siloed & Untracked', desc: 'Frequent manual copy-paste between portals & spreadsheets' },
                    { id: 'partial', label: 'Database Schema Only', desc: 'Tables known, but transformations and field origin unverified' },
                    { id: 'mature', label: 'Partial Pipeline Logs', desc: 'Basic ETL logs exist without end-to-end model governance' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQ2(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        q2 === opt.id
                          ? 'border-[#12151B] bg-[#F8F6F1] shadow-xs'
                          : 'border-[#E5DCCF] hover:border-[#CFC2B0] bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#12151B]">{opt.label}</div>
                      <div className="text-[11px] text-[#4B5363] mt-1 leading-snug">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div className="pt-6 border-t border-[#E5DCCF]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#786450] mb-2">
                  03. Operational Friction Area
                </label>
                <h3 className="text-base sm:text-lg font-bold text-[#12151B] mb-3">
                  Where does your organization experience the greatest cycle latency?
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'intake', label: 'Intake & Document Triage', desc: 'Reconciling customer PDFs, payroll feeds, bank statements' },
                    { id: 'underwriting', label: 'Underwriting & Decisioning', desc: 'Validating policy conditions and credit committee memos' },
                    { id: 'compliance', label: 'Regulatory Audit Reporting', desc: 'Tracing historical provenance for BCBS 239 / TRID audits' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQ3(opt.id)}
                      className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
                        q3 === opt.id
                          ? 'border-[#12151B] bg-[#F8F6F1] shadow-xs'
                          : 'border-[#E5DCCF] hover:border-[#CFC2B0] bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#12151B]">{opt.label}</div>
                      <div className="text-[11px] text-[#4B5363] mt-1 leading-snug">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[#786450]">
                  Immediate diagnostic summary generated without obligation.
                </span>
                <button
                  type="button"
                  onClick={calculateResults}
                  className="btn-primary"
                >
                  <span>Generate Diagnostic Report</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#E5DCCF]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#786450]">
                    Diagnostic Maturity Profile
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#12151B] mt-1">
                    Stage 1: High Latency &amp; Lineage Gap Identified
                  </h3>
                </div>
                <button
                  onClick={resetDiagnostic}
                  className="inline-flex items-center gap-1.5 text-xs text-[#4B5363] hover:text-[#12151B] transition-colors"
                >
                  <RotateCcw size={13} />
                  <span>Retake</span>
                </button>
              </div>

              {/* Assessment Findings */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                  <span className="text-[11px] font-semibold text-[#786450] uppercase">Identified Latency</span>
                  <div className="text-xl font-bold text-[#12151B] mt-1">18–24 Hours/Week</div>
                  <p className="text-[11px] text-[#4B5363] mt-1">Lost across manual document transcriptions and handoff lags</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                  <span className="text-[11px] font-semibold text-[#786450] uppercase">AI Readiness Risk</span>
                  <div className="text-xl font-bold text-[#9E4B2B] mt-1">Critical Lineage Void</div>
                  <p className="text-[11px] text-[#4B5363] mt-1">AI models cannot be safely grounded without source verification</p>
                </div>

                <div className="p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                  <span className="text-[11px] font-semibold text-[#786450] uppercase">Audit Remediation</span>
                  <div className="text-xl font-bold text-[#12151B] mt-1">72-Hour Discovery</div>
                  <p className="text-[11px] text-[#4B5363] mt-1">Fixed-scope Systems Discovery (£995) maps exact target state</p>
                </div>
              </div>

              {/* Concrete Recommendations */}
              <div className="p-5 rounded-xl border border-[#E5DCCF] bg-[#FFFFFF] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#12151B]">
                  Recommended Advisory Roadmap:
                </h4>
                <div className="space-y-2 text-xs text-[#4B5363]">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                    <span><strong>Conduct As-Is Process Observation:</strong> Map step-by-step workflow handoffs and quantify manual touch points.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                    <span><strong>Implement Field-Level Provenance:</strong> Tag financial documents at ingestion with immutable source hashes.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                    <span><strong>Deploy Automated Living Documentation:</strong> Replace static runbooks with self-updating API-driven documentation pipelines.</span>
                  </div>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-[#4B5363]">
                  Credited 100% against system build if you proceed with IX-ON.
                </p>
                <a
                  href="#contact"
                  onClick={() => onSelectAuditOption && onSelectAuditOption('Systems Discovery (£995 Diagnostic)')}
                  className="btn-primary"
                >
                  <span>Book Systems Discovery (£995)</span>
                  <ArrowRight size={16} />
                </a>
              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
};
