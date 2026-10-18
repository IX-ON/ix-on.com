import React, { useState } from 'react';
import { MortgageCase, MortgageStage } from './types';
import { 
  Home, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Database, 
  ShieldCheck, 
  FileText, 
  User, 
  MapPin, 
  ArrowRight 
} from 'lucide-react';

interface MortgageWorkspaceProps {
  cases: MortgageCase[];
  onUpdateCase: (updatedCase: MortgageCase) => void;
  onOpenNewCaseModal: () => void;
  onOpenDocVault: (docRef: string) => void;
}

const STAGES: { key: MortgageStage; label: string; num: string }[] = [
  { key: 'intake', label: 'Intake & Plaid API', num: '01' },
  { key: 'lineage_audit', label: 'Document Lineage', num: '02' },
  { key: 'underwriting', label: 'Policy Rules Engine', num: '03' },
  { key: 'collateral_fraud', label: 'Title & Valuation', num: '04' },
  { key: 'closing_package', label: 'Closing & TRID Pack', num: '05' },
];

export const MortgageWorkspace: React.FC<MortgageWorkspaceProps> = ({
  cases,
  onUpdateCase,
  onOpenNewCaseModal,
  onOpenDocVault,
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(cases[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');

  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  const filteredCases = cases.filter(c => {
    const matchesQuery = 
      c.borrowerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (stageFilter === 'all') return matchesQuery;
    return matchesQuery && c.stage === stageFilter;
  });

  const handleToggleCondition = (conditionId: string) => {
    if (!selectedCase) return;
    const updatedConditions = selectedCase.conditions.map(cond => {
      if (cond.id === conditionId) {
        const nextStatus = cond.status === 'cleared' ? 'pending' : 'cleared';
        return {
          ...cond,
          status: nextStatus as 'cleared' | 'pending',
          clearedBy: nextStatus === 'cleared' ? 'Underwriter (Manual Sign-off)' : undefined,
          clearedAt: nextStatus === 'cleared' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined,
        };
      }
      return cond;
    });

    const allCleared = updatedConditions.every(c => c.status === 'cleared');
    const newStatus = allCleared ? 'Closing Ready' : 'Conditions Pending';

    onUpdateCase({
      ...selectedCase,
      conditions: updatedConditions,
      status: newStatus,
      updatedAt: 'Just now',
    });
  };

  const handleAdvanceStage = () => {
    if (!selectedCase) return;
    const order: MortgageStage[] = ['intake', 'lineage_audit', 'underwriting', 'collateral_fraud', 'closing_package', 'completed'];
    const currentIndex = order.indexOf(selectedCase.stage);
    if (currentIndex < order.length - 1) {
      const nextStage = order[currentIndex + 1];
      onUpdateCase({
        ...selectedCase,
        stage: nextStage,
        status: nextStage === 'closing_package' ? 'Closing Ready' : 'In Review',
        updatedAt: 'Just now',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Metrics */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
            <Home size={14} />
            <span>North Star Lending Suite &bull; Residential &amp; Commercial Mortgage Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#12151B] tracking-tight mt-1">
            Mortgage Case Management Workspace
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5363] mt-0.5">
            Real-time pipeline with automated underwriting rule passes, source data lineage, and living compliance documentation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onOpenNewCaseModal}
            className="px-4 py-2 rounded-xl bg-[#12151B] text-white hover:bg-[#232834] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus size={15} />
            <span>New Mortgage Case</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Case List (Left) + Detailed Case Workspace (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Filter & Case Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786450]" />
              <input
                type="text"
                placeholder="Search borrower, address, or case ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] placeholder-[#786450] focus:outline-hidden focus:border-[#12151B]"
              />
            </div>

            {/* Stage Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => setStageFilter('all')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                  stageFilter === 'all'
                    ? 'bg-[#12151B] text-white'
                    : 'bg-[#F8F6F1] text-[#4B5363] hover:text-[#12151B]'
                }`}
              >
                All ({cases.length})
              </button>
              {STAGES.map(s => (
                <button
                  key={s.key}
                  onClick={() => setStageFilter(s.key)}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors cursor-pointer ${
                    stageFilter === s.key
                      ? 'bg-[#12151B] text-white'
                      : 'bg-[#F8F6F1] text-[#4B5363] hover:text-[#12151B]'
                  }`}
                >
                  {s.label.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Case Cards List */}
          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredCases.map(c => {
              const isSelected = selectedCase?.id === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedCaseId(c.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#12151B] shadow-md ring-2 ring-[#12151B]/10'
                      : 'bg-[#F8F6F1]/80 hover:bg-white border-[#E5DCCF]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#12151B] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                      {c.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      c.status === 'Closing Ready' 
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                        : c.status === 'Conditions Pending'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      <CheckCircle2 size={10} />
                      <span>{c.status}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#12151B]">{c.borrowerName}</h3>
                  <div className="text-[11px] text-[#4B5363] flex items-center gap-1 mt-0.5 truncate">
                    <MapPin size={11} className="shrink-0 text-[#786450]" />
                    <span className="truncate">{c.propertyAddress}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#E5DCCF] text-center">
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">Loan</span>
                      <span className="text-xs font-bold text-[#12151B]">£{(c.loanAmount / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">LTV</span>
                      <span className="text-xs font-bold text-[#12151B]">{c.ltv}%</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">DTI</span>
                      <span className="text-xs font-bold text-[#12151B]">{c.dti}%</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredCases.length === 0 && (
              <div className="p-8 text-center text-xs text-[#786450] bg-white rounded-2xl border border-dashed border-[#D9CEBF]">
                No mortgage cases match your query.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Case Deep-Dive Workspace (7 Cols) */}
        {selectedCase && (
          <div className="lg:col-span-7 space-y-5">
            {/* Header & Progression Stepper */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DCCF]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#12151B] bg-[#F8F6F1] px-2.5 py-1 rounded border border-[#D9CEBF]">
                      {selectedCase.id}
                    </span>
                    <span className="text-xs text-[#786450] font-medium">Updated {selectedCase.updatedAt}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#12151B] mt-1.5">
                    {selectedCase.borrowerName}
                  </h3>
                  <p className="text-xs text-[#4B5363] flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#786450]" />
                    <span>{selectedCase.propertyAddress} &bull; {selectedCase.propertyType}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1.5">
                  <span className="text-[10px] text-[#786450] uppercase font-bold">Assigned Underwriter</span>
                  <span className="text-xs font-semibold text-[#12151B] flex items-center gap-1">
                    <User size={13} className="text-[#786450]" />
                    <span>{selectedCase.assignedUnderwriter}</span>
                  </span>
                </div>
              </div>

              {/* Stage Progress Stepper */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#12151B] mb-2">
                  <span>Pipeline Execution Checkpoints</span>
                  <button
                    onClick={handleAdvanceStage}
                    className="text-xs text-[#786450] hover:text-[#12151B] font-semibold underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Advance to Next Stage</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {STAGES.map((s, idx) => {
                    const currentIndex = STAGES.findIndex(item => item.key === selectedCase.stage);
                    const isCompleted = idx < currentIndex;
                    const isCurrent = idx === currentIndex;

                    return (
                      <div
                        key={s.key}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isCurrent
                            ? 'bg-[#12151B] text-white border-[#12151B] shadow-xs'
                            : isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                            : 'bg-[#F8F6F1] text-[#786450] border-[#E5DCCF]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                          <span>{s.num}</span>
                          {isCompleted && <CheckCircle2 size={12} className="text-emerald-700" />}
                          {isCurrent && <Clock size={12} className="text-amber-400" />}
                        </div>
                        <div className="text-[11px] font-bold leading-tight truncate">
                          {s.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Financial Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Loan Amount</span>
                  <span className="text-base font-extrabold text-[#12151B]">£{selectedCase.loanAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Purchase Price</span>
                  <span className="text-base font-extrabold text-[#12151B]">£{selectedCase.purchasePrice.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">LTV / DTI</span>
                  <span className="text-base font-extrabold text-[#12151B]">{selectedCase.ltv}% / {selectedCase.dti}%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Credit Score</span>
                  <span className="text-base font-extrabold text-emerald-700">{selectedCase.creditScore} Prime</span>
                </div>
              </div>

              {/* Data Lineage & Cryptographic Provenance Hash */}
              <div className="p-3.5 rounded-xl bg-[#12151B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <Database size={15} className="text-[#D9CEBF] shrink-0" />
                  <div>
                    <div className="text-[10px] text-[#D9CEBF] font-mono uppercase tracking-wider">
                      Continuous Lineage Hash (BCBS 239)
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      {selectedCase.lineageHash}
                    </div>
                  </div>
                </div>
                <div className="text-[11px] text-[#A6AFBD] font-mono">
                  Source: <strong className="text-white">{selectedCase.sourceFeed}</strong>
                </div>
              </div>
            </div>

            {/* Interactive Underwriting Conditions Clearing Panel */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-[#12151B] flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#786450]" />
                    <span>Underwriting Conditions &amp; Policy Clearance</span>
                  </h4>
                  <p className="text-xs text-[#4B5363] mt-0.5">
                    Click any condition to clear or toggle status. All sign-offs generate an immutable audit trace.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#12151B] bg-[#F8F6F1] px-2.5 py-1 rounded-full border border-[#D9CEBF]">
                  {selectedCase.conditions.filter(c => c.status === 'cleared').length} of {selectedCase.conditions.length} Cleared
                </span>
              </div>

              <div className="space-y-2">
                {selectedCase.conditions.map(cond => (
                  <div
                    key={cond.id}
                    onClick={() => handleToggleCondition(cond.id)}
                    className={`p-3.5 rounded-xl border flex items-start gap-3 transition-colors cursor-pointer ${
                      cond.status === 'cleared'
                        ? 'bg-emerald-50/70 border-emerald-200'
                        : 'bg-[#F8F6F1] border-[#E5DCCF] hover:bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={cond.status === 'cleared'}
                      onChange={() => {}}
                      className="mt-0.5 w-4 h-4 rounded text-[#12151B] cursor-pointer"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`font-bold ${cond.status === 'cleared' ? 'text-emerald-950 line-through' : 'text-[#12151B]'}`}>
                          {cond.label}
                        </span>
                        <span className="text-[10px] font-mono uppercase font-bold text-[#786450] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                          {cond.category}
                        </span>
                      </div>
                      {cond.clearedBy && (
                        <div className="text-[11px] text-emerald-800 mt-1 flex items-center gap-1 font-medium">
                          <CheckCircle2 size={11} />
                          <span>Cleared by {cond.clearedBy} ({cond.clearedAt})</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Action: View Living Documentation in Vault */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onOpenDocVault(selectedCase.id)}
                  className="px-4 py-2 rounded-xl bg-[#F8F6F1] hover:bg-[#EAE3D6] text-[#12151B] border border-[#D9CEBF] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Inspect Generated TRID Audit Package in Vault &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
