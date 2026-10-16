import React, { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { NorthStarModal, SolutionDetails } from './NorthStarModal';
import { 
  Compass, 
  Home, 
  Building2, 
  ArrowRight, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface NorthStarSectionProps {
  onSelectSolutionForContact: (solutionName: string) => void;
}

export const NorthStarSection: React.FC<NorthStarSectionProps> = ({ onSelectSolutionForContact }) => {
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
   • Primary Applicant: Verified via Open Banking API + W-2 IRS direct feed
   • DTI Ratio: 34.2% (Calculated from verified net monthly cashflows)
   • LTV Ratio: 72.5% based on independent AVM valuation (Provenance: CoreLogic)

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
      { step: '2', name: 'Multi-Bank & Accounting Feed Harmonization', lineage: 'Xero, QuickBooks, Sage, Open Banking Transaction Feeds', docOutput: 'Harmonized 24-Month Cash Flow Lineage Map' },
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
   • Enterprise Turnover: £4,850,000 (Cross-verified: Bank Statement Feeds + VAT returns)
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
    <section id="north-star" ref={ref} className={`fade ${isVisible ? 'show' : ''} relative`}>
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-[#EFE8DE]/50 via-[#E4DDD2]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DE] border border-[#D8CABA] text-[#14171F] text-xs font-semibold tracking-widest uppercase mb-4 shadow-xs">
            <Compass size={14} className="text-[#8C735D] animate-spin-slow" />
            <span>Product Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#14171F] tracking-tight">
            North Star Solutions
          </h2>
          <p className="text-base sm:text-lg text-[#475060] mt-4 leading-relaxed">
            Enterprise case management architectures powered by IX-ON's current process mapping, 
            verifiable data lineage, and automated living documentation pipelines.
          </p>
        </div>

        {/* The Two Dedicated North Star Tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* TILE 1: Mortgage Case Management */}
          <div className="northstar-card group flex flex-col justify-between">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs uppercase font-mono tracking-widest font-bold text-[#FAF8F5] bg-[#14171F] px-3.5 py-1 rounded-full shadow-xs">
                    Product: North Star
                  </span>
                  <span className="text-xs text-[#7A6B5D] font-semibold">Lending Suite</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] border border-[#D8CABA] flex items-center justify-center text-[#14171F] group-hover:scale-105 group-hover:bg-[#14171F] group-hover:text-[#FAF8F5] transition-all shadow-xs">
                  <Home size={22} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight group-hover:text-[#78614E] transition-colors">
                Mortgage Case Management
              </h3>
              <p className="text-sm text-[#78614E] font-semibold mt-1">
                Zero-Leakage Lending Lifecycle &amp; Traceable Underwriting
              </p>

              {/* Core Description */}
              <p className="text-sm text-[#4D5564] mt-4 leading-relaxed">
                An enterprise-grade case orchestration engine that replaces fractured origination steps 
                with mapped, machine-readable workstreams. Unifies borrower document ingestion, verified 
                asset lineage, and automated TRID/RESPA compliance packages.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t border-[#E8DFD2] text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">End-to-End Document Lineage (W-2, Deeds, AVM)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Automated Underwriting Workstream &amp; Decisioning</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Continuous TRID / CFPB Regulatory Audit Trail</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Living Closing Package &amp; Auto-Generated Memos</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#E8DFD2] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSolution(mortgageDetails)}
                className="btn text-xs py-3 px-5 flex items-center gap-2"
              >
                <span>Explore Mortgage Architecture</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectSolutionForContact('North Star: Mortgage Case Management')}
                className="text-xs text-[#14171F] hover:text-[#78614E] underline underline-offset-4 transition-colors font-bold"
              >
                Request Deployment Brief &rarr;
              </button>
            </div>
          </div>

          {/* TILE 2: SME Loan Case Management */}
          <div className="northstar-card group flex flex-col justify-between">
            <div>
              {/* Product Badge & Category */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs uppercase font-mono tracking-widest font-bold text-[#FAF8F5] bg-[#14171F] px-3.5 py-1 rounded-full shadow-xs">
                    Product: North Star
                  </span>
                  <span className="text-xs text-[#7A6B5D] font-semibold">Commercial Credit Suite</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#F4EFEA] border border-[#D8CABA] flex items-center justify-center text-[#14171F] group-hover:scale-105 group-hover:bg-[#14171F] group-hover:text-[#FAF8F5] transition-all shadow-xs">
                  <Building2 size={22} />
                </div>
              </div>

              {/* Title & Tagline */}
              <h3 className="text-2xl sm:text-3xl font-bold text-[#14171F] tracking-tight group-hover:text-[#78614E] transition-colors">
                SME Loan Case Management
              </h3>
              <p className="text-sm text-[#78614E] font-semibold mt-1">
                Real-Time Financial Lineage &amp; Automated Credit Decisioning
              </p>

              {/* Core Description */}
              <p className="text-sm text-[#4D5564] mt-4 leading-relaxed">
                An agile commercial lending pipeline that synthesizes fragmented accounting ledgers, 
                tax filings, and banking APIs into unified cash-flow lineage. Features real-time credit 
                committee dossiers and living covenant documentation pipelines.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-6 border-t border-[#E8DFD2] text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Multi-Bank &amp; ERP Cash Flow Lineage (Xero/QBO)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Automated Financial Ratio &amp; DSCR Stress Models</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Dynamic Term-Sheet &amp; Facility Doc Generation</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[#8C735D] shrink-0 mt-0.5" />
                  <span className="text-[#2C313C] font-medium">Continuous Post-Loan Covenant Health Tracing</span>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-8 pt-6 border-t border-[#E8DFD2] flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setSelectedSolution(smeDetails)}
                className="btn text-xs py-3 px-5 flex items-center gap-2"
              >
                <span>Explore SME Loan Architecture</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onSelectSolutionForContact('North Star: SME Loan Case Management')}
                className="text-xs text-[#14171F] hover:text-[#78614E] underline underline-offset-4 transition-colors font-bold"
              >
                Request Deployment Brief &rarr;
              </button>
            </div>
          </div>

        </div>

        {/* Integration Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#D8CABA] text-center max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h4 className="text-base font-bold text-[#14171F] flex items-center gap-2">
                <Sparkles size={16} className="text-[#8C735D]" />
                Custom Solution Integration with IX-ON
              </h4>
              <p className="text-xs sm:text-sm text-[#586170] mt-1 max-w-xl leading-relaxed">
                Need to connect North Star Case Management with your proprietary core banking systems, 
                legacy document vaults, or private AI models? IX-ON engineers custom integration pipelines.
              </p>
            </div>
            <a
              href="#contact"
              className="btn-secondary text-xs shrink-0 py-3 px-5"
            >
              Discuss System Integration
            </a>
          </div>
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
