import React, { useState, useEffect } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { Mail, Check, Send } from 'lucide-react';

interface ContactSectionProps {
  initialInterest?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialInterest }) => {
  const { ref, isVisible } = useFadeIn();
  const [copied, setCopied] = useState(false);
  const [interest, setInterest] = useState(initialInterest || 'Systems Discovery (£995 Diagnostic)');
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
    <section id="contact" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#FFFFFF] border-b border-[#E5DCCF]`}>
      <div className="container-custom max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Direct Advisory Inquiry</span>
            <span aria-hidden="true">&bull;</span>
            <span>London &amp; Edinburgh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            Schedule a Systems Discovery Session.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 max-w-2xl mx-auto leading-relaxed">
            Discuss your operational bottlenecks, regulatory lineage requirements, or North Star deployment 
            with an independent systems architect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <a
              href="mailto:info@ix-on.com?subject=IX-ON%20Systems%20Discovery%20Inquiry"
              className="btn-primary text-xs py-2.5 px-5"
            >
              <Mail size={14} />
              <span>Direct Email: info@ix-on.com</span>
            </a>
            <button
              onClick={copyEmail}
              className="btn-secondary text-xs py-2.5 px-4"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Mail size={14} />}
              <span>{copied ? 'Email Copied' : 'Copy Email Address'}</span>
            </button>
          </div>
        </div>

        {/* Contact & Consultation Form */}
        <div className="consultancy-card border-[#D9CEBF] bg-[#F8F6F1] p-6 sm:p-10 shadow-sm">
          {submitted ? (
            <div className="p-8 rounded-xl bg-white border border-emerald-300 text-center animate-in fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto mb-3">
                <Check size={22} />
              </div>
              <h3 className="text-xl font-bold text-[#12151B]">Inquiry Received</h3>
              <p className="text-xs sm:text-sm text-[#4B5363] mt-2 max-w-md mx-auto">
                Thank you for contacting IX-ON. A principal consultant will review your operational requirements 
                and reply within 24 business hours to schedule your discovery call.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B] mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Marcus Vance"
                    className="w-full px-4 py-2.5 bg-white border border-[#D9CEBF] rounded-xl text-[#12151B] text-xs focus:outline-none focus:border-[#12151B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B] mb-1.5">
                    Corporate Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="m.vance@capital-bank.com"
                    className="w-full px-4 py-2.5 bg-white border border-[#D9CEBF] rounded-xl text-[#12151B] text-xs focus:outline-none focus:border-[#12151B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B] mb-1.5">
                    Financial Institution / Company
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Commercial Lending Partners"
                    className="w-full px-4 py-2.5 bg-white border border-[#D9CEBF] rounded-xl text-[#12151B] text-xs focus:outline-none focus:border-[#12151B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B] mb-1.5">
                    Primary Area of Inquiry
                  </label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-[#D9CEBF] rounded-xl text-[#12151B] text-xs focus:outline-none focus:border-[#12151B]"
                  >
                    <option value="Systems Discovery (£995 Diagnostic)">Systems &amp; Lineage Discovery (£995 Audit)</option>
                    <option value="North Star: Mortgage Case Management">North Star: Mortgage Case Management</option>
                    <option value="North Star: SME Loan Case Management">North Star: SME Loan Case Management</option>
                    <option value="Process Mapping & Automated Documentation">Process Mapping &amp; Automated Living Docs</option>
                    <option value="Data Lineage for Generative AI">Data Lineage Readiness for AI Models</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#12151B] mb-1.5">
                  Brief Overview of Current Workflows or Objectives
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Outline any manual bottlenecks, current underwriting systems, or specific data lineage mandates you are seeking to address..."
                  className="w-full px-4 py-2.5 bg-white border border-[#D9CEBF] rounded-xl text-[#12151B] text-xs focus:outline-none focus:border-[#12151B] leading-relaxed"
                ></textarea>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[11px] text-[#4B5363]">
                  All inquiries covered by mutual non-disclosure (NDA) standards.
                </span>
                <button
                  type="submit"
                  className="btn-primary w-full sm:w-auto"
                >
                  <Send size={14} />
                  <span>Submit Discovery Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
