import React, { useState } from 'react';
import { MortgageCase, SmeFacility } from './types';
import { X, Home, Building2 } from 'lucide-react';

interface NewCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMortgageCase: (newCase: MortgageCase) => void;
  onAddSmeFacility: (newFacility: SmeFacility) => void;
}

export const NewCaseModal: React.FC<NewCaseModalProps> = ({
  isOpen,
  onClose,
  onAddMortgageCase,
  onAddSmeFacility,
}) => {
  const [caseType, setCaseType] = useState<'mortgage' | 'sme'>('mortgage');

  // Mortgage form state
  const [borrowerName, setBorrowerName] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [loanAmount, setLoanAmount] = useState('350000');
  const [purchasePrice, setPurchasePrice] = useState('450000');
  const [sourceFeed, setSourceFeed] = useState('Open Banking (Plaid) + HMRC PAYE Real-Time API');

  // SME form state
  const [companyName, setCompanyName] = useState('');
  const [companyNumber, setCompanyNumber] = useState('');
  const [industry, setIndustry] = useState('Advanced Manufacturing & Green Tech');
  const [facilityAmount, setFacilityAmount] = useState('500000');
  const [turnover, setTurnover] = useState('3200000');
  const [accountingFeed, setAccountingFeed] = useState<'Xero Connected' | 'QuickBooks Live' | 'Sage 50 Sync' | 'Open Banking API'>('Xero Connected');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (caseType === 'mortgage') {
      const loan = Number(loanAmount) || 300000;
      const price = Number(purchasePrice) || 400000;
      const computedLtv = Number(((loan / price) * 100).toFixed(1));
      const randomId = `NS-MTG-${Math.floor(1000 + Math.random() * 9000)}`;

      const newMtg: MortgageCase = {
        id: randomId,
        borrowerName: borrowerName.trim() || 'New Applicant',
        propertyAddress: propertyAddress.trim() || '12 St Andrews Square, London',
        propertyType: 'Residential Freehold',
        loanAmount: loan,
        purchasePrice: price,
        ltv: computedLtv,
        dti: 32.5,
        creditScore: 795,
        stage: 'intake',
        status: 'In Review',
        assignedUnderwriter: 'Auto-Assigned Underwriting Queue',
        sourceFeed: sourceFeed,
        lineageHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
        updatedAt: 'Just now',
        notes: 'Initial case intake ingested via automated open banking API stream.',
        conditions: [
          { id: 'c1', label: 'Primary Deposit Trail & 6-Month Liquidity Verification', category: 'income', status: 'pending' },
          { id: 'c2', label: 'HMRC Tax Calculation & SA302 Provenance Match', category: 'income', status: 'pending' },
          { id: 'c3', label: 'HM Land Registry Legal Charge Clearance', category: 'collateral', status: 'pending' },
        ],
      };

      onAddMortgageCase(newMtg);
    } else {
      const facility = Number(facilityAmount) || 500000;
      const rev = Number(turnover) || 2500000;
      const randomId = `NS-SME-${Math.floor(1000 + Math.random() * 9000)}`;

      const newSme: SmeFacility = {
        id: randomId,
        companyName: companyName.trim() || 'Horizon Innovations Ltd',
        companyNumber: companyNumber.trim() || '12847291',
        industry: industry,
        facilityType: 'Term Loan',
        facilityAmount: facility,
        turnover: rev,
        baseDscr: 1.75,
        stressedDscr: 1.35,
        tenorMonths: 36,
        marginBps: 320,
        stage: 'kyb_verify',
        status: 'KYB Cleared',
        accountingFeed: accountingFeed,
        lastFeedSync: 'Synced just now',
        directorGuarantor: 'Primary Director Guarantee Registered',
        covenantStatus: 'Compliant',
        lineageHash: `0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
      };

      onAddSmeFacility(newSme);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#D9CEBF] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F8F6F1] border border-[#E5DCCF] text-[#4B5363] hover:text-[#12151B] transition-colors cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
          <span>North Star Clouds Engine</span>
          <span aria-hidden="true">&bull;</span>
          <span>Case Ingestion</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-[#12151B] tracking-tight">
          Instantiate New Lending Case
        </h3>
        <p className="text-xs text-[#4B5363] mt-1">
          Select case type and configure primary parameters. Ingestion pipelines and data lineage anchors will be auto-provisioned.
        </p>

        {/* Type Toggle */}
        <div className="grid grid-cols-2 gap-2 mt-5 p-1 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
          <button
            type="button"
            onClick={() => setCaseType('mortgage')}
            className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              caseType === 'mortgage'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B]'
            }`}
          >
            <Home size={15} />
            <span>Mortgage Case</span>
          </button>
          <button
            type="button"
            onClick={() => setCaseType('sme')}
            className={`py-2 px-3 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
              caseType === 'sme'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B]'
            }`}
          >
            <Building2 size={15} />
            <span>SME Commercial Loan</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {caseType === 'mortgage' ? (
            <>
              <div>
                <label className="text-xs font-bold text-[#12151B] block mb-1">Borrower Full Name(s)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alistair & Claire Sterling"
                  value={borrowerName}
                  onChange={(e) => setBorrowerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#12151B] block mb-1">Property Address</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 44 High Street, Richmond, TW9 1PB"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Loan Amount (£)</label>
                  <input
                    type="number"
                    required
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Purchase Price (£)</label>
                  <input
                    type="number"
                    required
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#12151B] block mb-1">Primary Intake Feed</label>
                <input
                  type="text"
                  value={sourceFeed}
                  onChange={(e) => setSourceFeed(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="text-xs font-bold text-[#12151B] block mb-1">Company Registered Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vanguard Logistics Solutions Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#12151B] block mb-1">Industry Sector</label>
                <input
                  type="text"
                  required
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Companies House Number</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10984221"
                    value={companyNumber}
                    onChange={(e) => setCompanyNumber(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Accounting Feed</label>
                  <select
                    value={accountingFeed}
                    onChange={(e) => setAccountingFeed(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  >
                    <option value="Xero Connected">Xero Connected</option>
                    <option value="QuickBooks Live">QuickBooks Live</option>
                    <option value="Sage 50 Sync">Sage 50 Sync</option>
                    <option value="Open Banking API">Open Banking API</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Facility Amount (£)</label>
                  <input
                    type="number"
                    required
                    value={facilityAmount}
                    onChange={(e) => setFacilityAmount(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#12151B] block mb-1">Annual Turnover (£)</label>
                  <input
                    type="number"
                    required
                    value={turnover}
                    onChange={(e) => setTurnover(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] focus:outline-hidden focus:border-[#12151B]"
                  />
                </div>
              </div>
            </>
          )}

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#E5DCCF]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#4B5363] hover:text-[#12151B] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-[#12151B] hover:bg-[#232834] text-white font-bold text-xs transition-colors cursor-pointer shadow-sm"
            >
              Provision Case Ingestion Pipeline
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
