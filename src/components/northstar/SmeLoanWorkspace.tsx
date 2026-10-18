import React, { useState } from 'react';
import { SmeFacility, SmeStage } from './types';
import { 
  Building2, 
  Search, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Activity, 
  Sliders, 
  FileText, 
  ShieldAlert, 
  ArrowRight 
} from 'lucide-react';

interface SmeLoanWorkspaceProps {
  facilities: SmeFacility[];
  onUpdateFacility: (updated: SmeFacility) => void;
  onOpenNewCaseModal: () => void;
  onOpenDocVault: (docRef: string) => void;
}

const SME_STAGES: { key: SmeStage; label: string; num: string }[] = [
  { key: 'kyb_verify', label: 'KYB & Entities', num: '01' },
  { key: 'feed_harmonize', label: 'Ledger Feeds', num: '02' },
  { key: 'dscr_modeling', label: 'DSCR Stress Model', num: '03' },
  { key: 'guarantee_check', label: 'Guarantees & Debenture', num: '04' },
  { key: 'facility_pack', label: 'Facility Agreement', num: '05' },
];

export const SmeLoanWorkspace: React.FC<SmeLoanWorkspaceProps> = ({
  facilities,
  onUpdateFacility,
  onOpenNewCaseModal,
  onOpenDocVault,
}) => {
  const [selectedFacilityId, setSelectedFacilityId] = useState<string>(facilities[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Interactive Stress Testing controls
  const [rateHikeBps, setRateHikeBps] = useState<number>(200); // 200 bps hike
  const [revenueShockPct, setRevenueShockPct] = useState<number>(0); // 0% shock

  const selectedFacility = facilities.find(f => f.id === selectedFacilityId) || facilities[0];

  const filteredFacilities = facilities.filter(f => 
    f.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Compute dynamic stressed DSCR
  const computeStressedDscr = (baseDscr: number) => {
    const rateDrag = (rateHikeBps / 100) * 0.12; // interest rate sensitivity
    const revenueDrag = (revenueShockPct / 100) * 0.45; // revenue shock sensitivity
    const computed = baseDscr - rateDrag - revenueDrag;
    return Math.max(0.65, Number(computed.toFixed(2)));
  };

  const dynamicDscr = selectedFacility ? computeStressedDscr(selectedFacility.baseDscr) : 1.42;
  const isCovenantBreached = dynamicDscr < 1.20;

  const handleAdvanceStage = () => {
    if (!selectedFacility) return;
    const order: SmeStage[] = ['kyb_verify', 'feed_harmonize', 'dscr_modeling', 'guarantee_check', 'facility_pack', 'disbursed'];
    const currentIndex = order.indexOf(selectedFacility.stage);
    if (currentIndex < order.length - 1) {
      const nextStage = order[currentIndex + 1];
      onUpdateFacility({
        ...selectedFacility,
        stage: nextStage,
        status: nextStage === 'facility_pack' ? 'Facility Issued' : 'Credit Approved',
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
            <Building2 size={14} />
            <span>North Star Lending Suite &bull; SME Commercial Underwriting &amp; DSCR Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#12151B] tracking-tight mt-1">
            SME Loan Case Management Workspace
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5363] mt-0.5">
            Automated multi-source financial parsing, dynamic cash-flow stress testing, and living covenant tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewCaseModal}
            className="px-4 py-2 rounded-xl bg-[#12151B] text-white hover:bg-[#232834] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus size={15} />
            <span>New SME Facility</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Facility List + Facility Details & Dynamic DSCR Model */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Facilities List (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786450]" />
              <input
                type="text"
                placeholder="Search company, facility ID, or industry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] placeholder-[#786450] focus:outline-hidden focus:border-[#12151B]"
              />
            </div>
          </div>

          <div className="space-y-2.5 max-h-[680px] overflow-y-auto pr-1">
            {filteredFacilities.map(f => {
              const isSelected = selectedFacility?.id === f.id;
              return (
                <div
                  key={f.id}
                  onClick={() => setSelectedFacilityId(f.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#12151B] shadow-md ring-2 ring-[#12151B]/10'
                      : 'bg-[#F8F6F1]/80 hover:bg-white border-[#E5DCCF]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#12151B] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                      {f.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${
                      f.covenantStatus === 'Compliant'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}>
                      <Activity size={10} />
                      <span>{f.covenantStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#12151B]">{f.companyName}</h3>
                  <div className="text-[11px] text-[#4B5363] mt-0.5 truncate">
                    {f.industry}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[#E5DCCF] text-center">
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">Facility</span>
                      <span className="text-xs font-bold text-[#12151B]">£{(f.facilityAmount / 1000).toFixed(0)}k</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">Base DSCR</span>
                      <span className="text-xs font-bold text-emerald-700">{f.baseDscr}x</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-[#FAF8F5]">
                      <span className="text-[9px] text-[#786450] uppercase font-bold block">Feed</span>
                      <span className="text-[10px] font-bold text-[#12151B] truncate">{f.accountingFeed.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive SME Facility Modeling (7 Cols) */}
        {selectedFacility && (
          <div className="lg:col-span-7 space-y-5">
            {/* Facility Header */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5DCCF]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#12151B] bg-[#F8F6F1] px-2.5 py-1 rounded border border-[#D9CEBF]">
                      {selectedFacility.id}
                    </span>
                    <span className="text-xs text-[#786450] font-mono">Co. #{selectedFacility.companyNumber}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#12151B] mt-1.5">
                    {selectedFacility.companyName}
                  </h3>
                  <p className="text-xs text-[#4B5363] mt-0.5">
                    {selectedFacility.industry} &bull; Type: <strong>{selectedFacility.facilityType}</strong>
                  </p>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className="text-[10px] text-[#786450] uppercase font-bold">Accounting Sync</span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
                    {selectedFacility.accountingFeed} ({selectedFacility.lastFeedSync})
                  </span>
                </div>
              </div>

              {/* SME Stages Stepper */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#12151B] mb-2">
                  <span>Commercial Credit Underwriting Sequence</span>
                  <button
                    onClick={handleAdvanceStage}
                    className="text-xs text-[#786450] hover:text-[#12151B] font-semibold underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Advance Stage</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SME_STAGES.map((s, idx) => {
                    const currentIndex = SME_STAGES.findIndex(item => item.key === selectedFacility.stage);
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

              {/* Commercial Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Facility Amount</span>
                  <span className="text-base font-extrabold text-[#12151B]">£{selectedFacility.facilityAmount.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Verified Turnover</span>
                  <span className="text-base font-extrabold text-[#12151B]">£{selectedFacility.turnover.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Tenor &amp; Margin</span>
                  <span className="text-base font-extrabold text-[#12151B]">{selectedFacility.tenorMonths}m @ +{selectedFacility.marginBps}bps</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Guarantor</span>
                  <span className="text-xs font-bold text-[#12151B] truncate block">{selectedFacility.directorGuarantor.split(' ')[0]}</span>
                </div>
              </div>
            </div>

            {/* Dynamic DSCR Stress-Testing Engine */}
            <div className="p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-[#12151B] flex items-center gap-2">
                    <Sliders size={18} className="text-[#786450]" />
                    <span>Dynamic DSCR &amp; Cash-Flow Stress Testing Engine</span>
                  </h4>
                  <p className="text-xs text-[#4B5363] mt-0.5">
                    Simulate interest rate shocks and gross margin compression to verify covenant headroom.
                  </p>
                </div>
              </div>

              {/* Interactive Sliders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#12151B] mb-1.5">
                    <span>Base Rate Hike Simulation</span>
                    <span className="font-mono text-emerald-800">+{rateHikeBps} bps</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="50"
                    value={rateHikeBps}
                    onChange={(e) => setRateHikeBps(Number(e.target.value))}
                    className="w-full accent-[#12151B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#786450] mt-1 font-mono">
                    <span>0 bps (Current)</span>
                    <span>+250 bps</span>
                    <span>+500 bps (Severe)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-[#12151B] mb-1.5">
                    <span>Revenue Shock / Margin Squeeze</span>
                    <span className="font-mono text-rose-700">-{revenueShockPct}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="25"
                    step="5"
                    value={revenueShockPct}
                    onChange={(e) => setRevenueShockPct(Number(e.target.value))}
                    className="w-full accent-[#12151B] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-[#786450] mt-1 font-mono">
                    <span>0%</span>
                    <span>-10%</span>
                    <span>-25% Stress</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Stressed Results Box */}
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isCovenantBreached 
                  ? 'bg-rose-50 border-rose-300' 
                  : 'bg-emerald-50/70 border-emerald-200'
              }`}>
                <div className="flex items-center gap-3">
                  {isCovenantBreached ? (
                    <ShieldAlert size={26} className="text-rose-700 shrink-0" />
                  ) : (
                    <CheckCircle2 size={26} className="text-emerald-700 shrink-0" />
                  )}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-[#12151B]">
                      {isCovenantBreached ? 'Covenant Breach Triggered (<1.20x DSCR)' : 'Sufficient Covenant Headroom (Basel III / IV)'}
                    </div>
                    <div className="text-xs text-[#4B5363] mt-0.5">
                      Base DSCR: <strong>{selectedFacility.baseDscr}x</strong> &rarr; Stressed Under Simulation: <strong className={isCovenantBreached ? 'text-rose-700' : 'text-emerald-800'}>{dynamicDscr}x</strong>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-[#786450] uppercase font-bold block">Trigger Threshold</span>
                  <span className="text-xs font-mono font-bold text-[#12151B]">Min 1.20x DSCR</span>
                </div>
              </div>

              {/* Action: Open Facility Agreement */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onOpenDocVault(selectedFacility.id)}
                  className="px-4 py-2 rounded-xl bg-[#F8F6F1] hover:bg-[#EAE3D6] text-[#12151B] border border-[#D9CEBF] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <FileText size={14} />
                  <span>Inspect Facility Agreement &amp; Covenants in Vault &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
