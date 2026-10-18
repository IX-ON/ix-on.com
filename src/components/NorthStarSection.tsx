import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { NorthStarModal, SolutionDetails } from './NorthStarModal';
import mortgageFintechImg from '../assets/images/mortgage_fintech_system_1792269440370.jpg';
import { 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Lock,
  CreditCard,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface NorthStarSectionProps {
  onSelectSolutionForContact: (solutionName: string) => void;
  onOpenCloudGateway?: (tab: 'signin' | 'subscribe') => void;
  onLaunchMergedPlatform?: () => void;
  hasActiveSession?: boolean;
}

export const NorthStarSection: React.FC<NorthStarSectionProps> = ({ 
  onSelectSolutionForContact,
  onOpenCloudGateway,
  onLaunchMergedPlatform,
  hasActiveSession = false,
}) => {
  const { ref, isVisible } = useFadeIn();
  const [selectedSolution, setSelectedSolution] = useState<SolutionDetails | null>(null);

  const mortgageDetails: SolutionDetails = {
    id: 'mortgage',
    title: 'Mortgage Case Management',
    productName: 'North Star',
    tagline: 'Precision Lending Execution with Full Document & Decision Provenance',
    description: 'Transform high-friction residential and commercial mortgage origination into an AI-ready, audit-proof workflow. Combines continuous document lineage, automated underwriting verification, and living compliance documentation.',
    stages: [
      { step: '1', name: 'Borrower Intake & Asset Ingestion', lineage: 'Bank APIs, Payroll (Plaid/Argyle), Tax Portals', docOutput: 'Initial 1003 / Case Ingestion Spec' },
      { step: '2', name: 'Field-Level Document Provenance Audit', lineage: 'OCR Textract + MISMO Schema Normalizer', docOutput: 'Lineage Integrity Report (MISMO 3.4)' },
      { step: '3', name: 'Automated Underwriting & Policy Rules Engine', lineage: 'Fannie Mae DU / Freddie Mac LPA Rules Engine', docOutput: 'Preliminary Underwriting Condition Sheet' },
      { step: '4', name: 'Title, Appraisal & Fraud Lineage Cross-Check', lineage: 'County Deeds DB, AVM Valuation API, FraudNet', docOutput: 'Collateral Provenance Verification Dossier' },
      { step: '5', name: 'Automated Closing Package & Audit Manifest', lineage: 'e-Closing Vault + Immutable Audit Trail', docOutput: 'Living Closing Documentation & TRID Audit Package' },
    ],
    lineageMetrics: [
      { label: 'Audit Coverage', value: '100%' },
      { label: 'Time-to-Underwrite', value: '-65%' },
      { label: 'TRID Compliance Rate', value: '99.9%' },
      { label: 'AI Grounding Accuracy', value: '99.4%' },
    ],
    complianceStandards: ['TRID / CFPB', 'RESPA & TILA', 'MISMO 3.4', 'BCBS 239 Data Lineage', 'Fannie Mae DU Specs'],
    sampleDocTitle: 'North Star Automated Underwriting Memo & Audit Pack',
    sampleDocContent: `========================================================================
NORTH STAR MORTGAGE CASE MANAGEMENT // LIVING DOCUMENTATION SYSTEM
CASE ID: NS-MTG-2026-884109 | STATUS: APPROVED_WITH_CONDITIONS
TRACEABILITY HASH: 0x9f4a88bc3e1290aa7c | REVISION: 4.1 (AUTO-SYNCED)
========================================================================
1. BORROWER PROVENANCE:
   • Primary Applicant: Verified via Open Banking API + HMRC / W-2 direct feed
   • DTI Ratio: 34.2% (Calculated from verified net monthly cashflows)
   • LTV Ratio: 72.5% based on independent AVM valuation (Provenance: Land Registry / CoreLogic)

2. DATA LINEAGE VERIFICATION:
   • All 28 critical financial fields traced back to primary source authorities.
   • Zero manual transcriptions detected.
   • Embedded Vector Hash: Ready for Underwriter AI Copilot querying.

3. REGULATORY COMPLIANCE ATTESTATION:
   • TRID 3-Day disclosure window verified compliant.
   • Fair Lending adverse impact tests passed with zero variance.
   • Automated closing documentation bundle generated and locked in secure vault.`,
  };

  const smeDetails: SolutionDetails = {
    id: 'sme-loan',
    title: 'SME Loan Case Management',
    productName: 'North Star',
    tagline: 'High-Velocity Commercial Underwriting with Real-Time Financial Lineage',
    description: 'Empower commercial lenders and credit committees with automated multi-source financial parsing, cash-flow lineage mapping, real-time stress testing, and auto-generated covenant documentation.',
    stages: [
      { step: '1', name: 'KYB & Corporate Entity Verification', lineage: 'Companies House / OpenCorporates / Dun & Bradstreet', docOutput: 'Corporate Identity Verification Dossier' },
      { step: '2', name: 'Multi-Bank & Accounting Feed Harmonization', lineage: 'Xero, QuickBooks, Sage, Open Banking Feeds', docOutput: 'Harmonized 24-Month Cash Flow Lineage Map' },
      { step: '3', name: 'Real-Time Debt Service & Solvency Modeling', lineage: 'Dynamic DSCR Engine + Real-time VAT / Tax Reconciliation', docOutput: 'Credit Committee Risk Assessment Matrix' },
      { step: '4', name: 'Director Guarantees & Collateral Valuation', lineage: 'Land Registry, UCC-1 Filing Registry, Asset Valuation DB', docOutput: 'Security & Collateral Perfection Summary' },
      { step: '5', name: 'Automated Loan Agreement & Covenant Pack', lineage: 'Smart Legal Document Pipeline + Live Monitoring Hooks', docOutput: 'Executable Facility Agreement & Living Covenant Schedule' },
    ],
    lineageMetrics: [
      { label: 'Decision Velocity', value: '4x Faster' },
      { label: 'Financial Feed Sync', value: 'Real-Time' },
      { label: 'Covenant Auto-Tracking', value: '100%' },
      { label: 'Underwriting Cost', value: '-55%' },
    ],
    complianceStandards: ['Basel III / IV Risk Weights', 'SME Finance Code of Conduct', 'AML / KYB 6th Directive', 'ISO 20022 Financial Messaging'],
    sampleDocTitle: 'North Star SME Credit Approval & Covenant Framework',
    sampleDocContent: `========================================================================
NORTH STAR SME LOAN CASE MANAGEMENT // LIVING DOCUMENTATION SYSTEM
FACILITY ID: NS-SME-2026-44091 | BORROWER: AERO-TECH LOGISTICS LTD
DATA LINEAGE REVISION: 12.0 (LIVE FINANCIAL FEED INTEGRATION)
========================================================================
1. COMMERCIAL PROFILE & CASH-FLOW LINEAGE:
   • Enterprise Turnover: £4,850,000 (Cross-verified: Bank Feeds + VAT returns)
   • Historical DSCR: 1.84x | Projected Stressed DSCR: 1.42x (+250 bps rate hike)
   • Top 5 Customer Concentration: 22% (Low dependency risk verified via invoice ledger)

2. DATA TRACEABILITY CONFIRMATION:
   • 100% of accounting ledgers anchored to direct ERP APIs with zero stale inputs.
   • Ingestion timestamp: Synchronized 14 minutes ago.

3. AUTOMATED FACILITY GENERATION:
   • Facility Amount: £650,000 Term Loan (36 Months amortizing)
   • Covenants: Monthly live Open Banking liquidity test (<1.20x DSCR alerts credit team)
   • Living documentation pipeline initialized for continuous post-disbursal monitoring.`,
  };

  return (
    <section id="north-star" ref={ref} className={`fade ${isVisible ? 'show' : ''} bg-[#F8F6F1] border-b border-[#E5DCCF]`}>
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#786450] mb-3">
            <span>Specialized Lending Solutions</span>
            <span aria-hidden="true">&bull;</span>
            <span>Product Name: North Star</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#12151B] tracking-tight text-balance">
            North Star case management suites.
          </h2>
          <p className="text-base text-[#4B5363] mt-4 leading-relaxed max-w-2xl">
            Pre-architected, production-ready case management engines engineered by IX-ON. 
            Designed specifically for mortgage originators and commercial credit lenders requiring 
            complete document lineage, automated underwriting condition sheets, and living audit documentation.
          </p>
        </div>

        {/* The Two Dedicated North Star Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* TILE 1: Mortgage Case Management */}
          <div className="consultancy-card flex flex-col justify-between border-[#D9CEBF] bg-white">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5DCCF]">
                <div className="text-xs font-mono font-bold text-[#12151B]">
                  Product: North Star &bull; Lending Suite
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] flex items-center justify-center text-[#12151B]">
                  <Home size={18} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12151B] tracking-tight">
                Mortgage Case Management
              </h3>
              <p className="text-xs font-semibold text-[#786450] mt-1 uppercase tracking-wide">
                Traceable Underwriting &bull; Zero-Leakage Loan Origination
              </p>

              {/* Image Preview */}
              <div className="mt-4 mb-5 rounded-xl overflow-hidden border border-[#E5DCCF]">
                <img
                  src={mortgageFintechImg}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/mortgage_fintech_system.jpg';
                  }}
                  alt="North Star Mortgage Case Management Interface"
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Core Description */}
              <p className="text-sm text-[#4B5363] leading-relaxed">
                Replaces fragmented origination spreadsheets with a deterministic, machine-readable pipeline. 
                Unifies borrower asset intake, automated W-2 and tax transcript verification, 
                and self-generating TRID compliance closing packages.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 mt-5 pt-5 border-t border-[#E5DCCF] text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">End-to-End Document Lineage (W-2, Deeds, AVMs)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">Automated Underwriting Condition Sheet Generation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">Continuous TRID &amp; CFPB Audit Manifest Lock</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5DCCF] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSolution(mortgageDetails)}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <span>Inspect System Architecture</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onSelectSolutionForContact('North Star: Mortgage Case Management')}
                className="text-xs text-[#12151B] hover:text-[#786450] font-bold underline underline-offset-4 cursor-pointer"
              >
                Request Deployment Brief &rarr;
              </button>
            </div>
          </div>

          {/* TILE 2: SME Loan Case Management */}
          <div className="consultancy-card flex flex-col justify-between border-[#D9CEBF] bg-white">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E5DCCF]">
                <div className="text-xs font-mono font-bold text-[#12151B]">
                  Product: North Star &bull; Commercial Credit Suite
                </div>
                <div className="w-10 h-10 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] flex items-center justify-center text-[#12151B]">
                  <Building2 size={18} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12151B] tracking-tight">
                SME Loan Case Management
              </h3>
              <p className="text-xs font-semibold text-[#786450] mt-1 uppercase tracking-wide">
                Real-Time Financial Lineage &bull; Automated Credit Decisioning
              </p>

              {/* Architectural Feature Callout Box */}
              <div className="mt-4 mb-5 p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF] space-y-2 text-xs">
                <div className="flex items-center justify-between font-mono font-semibold text-[#786450]">
                  <span>Accounting Integration:</span>
                  <span className="text-[#12151B]">Xero &bull; QBO &bull; Open Banking</span>
                </div>
                <div className="flex items-center justify-between font-mono font-semibold text-[#786450]">
                  <span>Credit Committee Pack:</span>
                  <span className="text-emerald-800">Auto-Generated in 15s</span>
                </div>
                <div className="flex items-center justify-between font-mono font-semibold text-[#786450]">
                  <span>Post-Disbursal Tracking:</span>
                  <span className="text-[#12151B]">Automated Covenant Webhooks</span>
                </div>
              </div>

              {/* Core Description */}
              <p className="text-sm text-[#4B5363] leading-relaxed">
                Synthesizes fragmented commercial accounting ledgers, HMRC tax returns, and banking feeds 
                into unified cash-flow lineage. Features real-time credit committee assessment matrices 
                and dynamic post-loan covenant health monitoring.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-2.5 mt-5 pt-5 border-t border-[#E5DCCF] text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">Multi-Bank &amp; ERP Cash Flow Harmonization (Xero/QBO)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">Automated DSCR &amp; Solvency Stress Modeling</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#786450] shrink-0 mt-0.5" />
                  <span className="text-[#12151B] font-medium">Dynamic Loan Agreement &amp; Living Covenant Pipeline</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#E5DCCF] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSolution(smeDetails)}
                className="btn-primary text-xs py-2.5 px-5"
              >
                <span>Inspect System Architecture</span>
                <ArrowRight size={14} />
              </button>

              <button
                onClick={() => onSelectSolutionForContact('North Star: SME Loan Case Management')}
                className="text-xs text-[#12151B] hover:text-[#786450] font-bold underline underline-offset-4 cursor-pointer"
              >
                Request Deployment Brief &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* NORTH STAR CLOUDS SECURED ACCESS BANNER */}
        <div className="mt-12 p-8 sm:p-10 rounded-2xl bg-[#12151B] text-white border border-[#2B313E] shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold tracking-wider uppercase text-[#D9CEBF]">
                <Lock size={12} className="text-[#D9CEBF]" />
                <span>Restricted Cloud Environment &bull; Paid Shared Access Only</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                North Star Clouds Project
              </h3>
              <p className="text-sm text-[#A6AFBD] leading-relaxed">
                Dedicated enterprise cloud instance hosting live Mortgage &amp; SME Loan case management 
                pipelines, real-time data lineage graph monitors, and automated documentation engines. 
                Access is restricted to authenticated teams with an active paid license seat.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#D9CEBF] font-mono">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-400" />
                  <span>Token-Gated Authentication</span>
                </span>
                <span>&bull;</span>
                <span className="flex items-center gap-1.5">
                  <CreditCard size={14} className="text-emerald-400" />
                  <span>Verified License Seats</span>
                </span>
                <span>&bull;</span>
                <span>SOC2 Type II Aligned</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              {hasActiveSession ? (
                <button
                  onClick={onLaunchMergedPlatform}
                  className="px-6 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                >
                  <Lock size={14} />
                  <span>Open Merged Cloud Suite (Active Session)</span>
                </button>
              ) : (
                <>
                  <button
                    onClick={() => onOpenCloudGateway && onOpenCloudGateway('signin')}
                    className="px-6 py-3 rounded-full bg-white hover:bg-[#F8F6F1] text-[#12151B] font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock size={13} />
                    <span>Enter Encrypted Access Key</span>
                  </button>

                  <button
                    onClick={() => onOpenCloudGateway && onOpenCloudGateway('subscribe')}
                    className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CreditCard size={13} className="text-[#D9CEBF]" />
                    <span>Subscribe to Issue License Key</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Custom Integration Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-white border border-[#E5DCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-[#12151B]">
              Custom Core Banking &amp; Legacy System Integration
            </h4>
            <p className="text-xs text-[#4B5363] mt-0.5">
              IX-ON integrates North Star case management with existing core banking databases, ERPs, and document vaults.
            </p>
          </div>
          <a
            href="#contact"
            className="btn-secondary text-xs py-2.5 px-4 shrink-0"
          >
            <span>Discuss Custom Architecture</span>
            <ExternalLink size={13} />
          </a>
        </div>

      </div>

      {/* Interactive Modal */}
      <NorthStarModal
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
        onContactSelect={onSelectSolutionForContact}
      />
    </section>
  );
};
