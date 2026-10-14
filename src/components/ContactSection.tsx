import React, { useState, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Mail, Check, Send, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  initialInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialInterest }) => {
  const { ref, isVisible } = useFadeIn();
  const [copied, setCopied] = useState(false);
  const [interest, setInterest] = useState(initialInterest || 'North Star: Mortgage Case Management');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    timeline: 'Within 30 Days',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialInterest) {
      setInterest(initialInterest);
    }
  }, [initialInterest]);

  const copyEmail = () => {
    navigator.clipboard.writeText('info@ix-on.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '', timeline: 'Within 30 Days', message: '' });
    }, 4500);
  };

  return (
    <section id="contact" ref={ref} className={`fade ${isVisible ? 'show' : ''} relative`}>
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[#38bdf8] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles size={14} />
            <span>Consultancy Assessment</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Schedule an Enterprise AI Readiness &amp; Lineage Audit
          </h2>
          <p className="text-base sm:text-lg text-gray-300 mt-3 max-w-2xl mx-auto leading-relaxed">
            Partner with IX-ON to map your current processes, verify data lineage for generative AI, 
            or deploy the North Star Mortgage &amp; SME Loan Case Management solutions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href={`mailto:info@ix-on.com?subject=IX-ON%20Inquiry%20-%20${encodeURIComponent(interest)}`}
              className="btn inline-flex items-center gap-2 text-sm"
            >
              <Mail size={16} />
              <span>Direct Email: info@ix-on.com</span>
            </a>

            <button
              onClick={copyEmail}
              className="px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/15 text-xs font-medium transition-all backdrop-blur-md inline-flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={15} className="text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <span>Copy info@ix-on.com</span>
              )}
            </button>
          </div>
        </div>

        {/* Audit Request Card */}
        <div className="card max-w-2xl mx-auto bg-black/80 border-[#38bdf8]/20 shadow-2xl p-6 sm:p-8">
          {submitted ? (
            <div className="text-center py-10 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Assessment Request Received</h3>
              <p className="text-sm text-gray-300 mt-2 max-w-md mx-auto leading-relaxed">
                Thank you. An IX-ON Enterprise Process &amp; Lineage Principal will review your submission and reach out within 24 hours.
              </p>
              <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-gray-400 max-w-sm mx-auto font-mono">
                Assigned Topic: <span className="text-[#38bdf8] font-bold">{interest}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Primary Area of Engagement
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
                >
                  <option value="North Star: Mortgage Case Management">North Star: Mortgage Case Management</option>
                  <option value="North Star: SME Loan Case Management">North Star: SME Loan Case Management</option>
                  <option value="Current Process Mapping & Discovery">Current Process Mapping &amp; Discovery</option>
                  <option value="AI Data Lineage & Provenance Readiness">AI Data Lineage &amp; Provenance Readiness</option>
                  <option value="Automated Living Documentation Pipelines">Automated Living Documentation Pipelines</option>
                  <option value="Full Enterprise Modernization Package">Full Enterprise Modernization Package</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="s.jenkins@financial-corp.com"
                    className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Organization / Institution
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Tier 1 Bank / FinTech / Enterprise"
                    className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                    Engagement Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors"
                  >
                    <option value="Immediate (1-2 Weeks)">Immediate (1-2 Weeks)</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                    <option value="Next Quarter (Strategic Planning)">Next Quarter (Strategic Planning)</option>
                    <option value="Exploratory Architecture Review">Exploratory Architecture Review</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-300 mb-1.5">
                  Brief Overview of Current Bottlenecks or Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline your current process pain points, data systems, or North Star case management goals..."
                  className="w-full px-3.5 py-2.5 bg-black/80 border border-white/20 rounded-xl text-white text-sm focus:outline-none focus:border-[#38bdf8] transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#b7d4ff] via-[#38bdf8] to-white text-black font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(56,189,248,0.3)] cursor-pointer"
              >
                <Send size={16} />
                <span>Submit Readiness Assessment Request</span>
              </button>

              <p className="text-[11px] text-gray-400 text-center mt-2">
                All inquiries are protected by our standard enterprise mutual non-disclosure agreement (MNDA).
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
