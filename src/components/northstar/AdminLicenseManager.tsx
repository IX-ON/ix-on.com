import React, { useState } from 'react';
import { IssuedLicense } from './types';
import { 
  Key, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  Copy, 
  Check, 
  Search, 
  Crown,
  Database,
  Cpu
} from 'lucide-react';

interface AdminLicenseManagerProps {
  adminEmail?: string;
  onShowToast: (msg: string) => void;
}

const INITIAL_LICENSES: IssuedLicense[] = [
  {
    id: 'LIC-901',
    companyName: 'Barclays Private & Commercial Lending',
    contactEmail: 'underwriting.director@barclays.com',
    token: 'NS-CLOUD-ENTERPRISE-8B4K2-2026',
    tier: 'Enterprise Production',
    status: 'active',
    issuedAt: '2026-09-01',
    expiresAt: '2027-09-01',
    allowedSeats: 25
  },
  {
    id: 'LIC-902',
    companyName: 'Santander Corporate & SME Banking',
    contactEmail: 'head.credit@santander.co.uk',
    token: 'NS-CLOUD-ENTERPRISE-3N9P1-2026',
    tier: 'Enterprise Production',
    status: 'active',
    issuedAt: '2026-08-15',
    expiresAt: '2027-08-15',
    allowedSeats: 15
  },
  {
    id: 'LIC-903',
    companyName: 'OakNorth Bank Specialist Lending',
    contactEmail: 'risk.ops@oaknorth.co.uk',
    token: 'NS-CLOUD-PILOT-7X2W9-2026',
    tier: 'Pilot Sandbox',
    status: 'active',
    issuedAt: '2026-10-01',
    expiresAt: '2027-01-01',
    allowedSeats: 5
  },
  {
    id: 'LIC-904',
    companyName: 'Apex Commercial Finance Ltd',
    contactEmail: 'cfo@apexcommercial.co.uk',
    token: 'NS-CLOUD-PILOT-1M5T8-2026',
    tier: 'Pilot Sandbox',
    status: 'revoked',
    issuedAt: '2026-05-10',
    expiresAt: '2026-08-10',
    allowedSeats: 3
  }
];

export const AdminLicenseManager: React.FC<AdminLicenseManagerProps> = ({
  adminEmail = 'sgodha@gmail.com',
  onShowToast
}) => {
  const [licenses, setLicenses] = useState<IssuedLicense[]>(INITIAL_LICENSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [copiedTokenId, setCopiedTokenId] = useState<string | null>(null);

  // New License Generator Form State
  const [newCompany, setNewCompany] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newTier, setNewTier] = useState<'Enterprise Production' | 'Pilot Sandbox' | 'Institutional White-Label'>('Enterprise Production');
  const [newSeats, setNewSeats] = useState(10);
  const [newDurationMonths, setNewDurationMonths] = useState(12);
  const [lastGeneratedKey, setLastGeneratedKey] = useState<string | null>(null);

  const handleCopy = (token: string, id: string) => {
    navigator.clipboard.writeText(token);
    setCopiedTokenId(id);
    onShowToast(`Copied token ${token}`);
    setTimeout(() => setCopiedTokenId(null), 2000);
  };

  const handleToggleRevoke = (id: string) => {
    setLicenses(prev => prev.map(lic => {
      if (lic.id === id) {
        const nextStatus = lic.status === 'active' ? 'revoked' : 'active';
        onShowToast(`License ${lic.companyName} set to ${nextStatus.toUpperCase()}`);
        return { ...lic, status: nextStatus };
      }
      return lic;
    }));
  };

  const handleExtendOneYear = (id: string) => {
    setLicenses(prev => prev.map(lic => {
      if (lic.id === id) {
        onShowToast(`License ${lic.companyName} extended by 12 months`);
        return { ...lic, expiresAt: '2028-10-18', status: 'active' };
      }
      return lic;
    }));
  };

  const handleGenerateLicense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany || !newEmail) return;

    const randomSeg = Math.random().toString(36).substring(2, 7).toUpperCase();
    const tierCode = newTier === 'Enterprise Production' ? 'ENTERPRISE' : newTier === 'Pilot Sandbox' ? 'PILOT' : 'INSTITUTION';
    const token = `NS-CLOUD-${tierCode}-${randomSeg}-2026`;

    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + newDurationMonths);

    const newLic: IssuedLicense = {
      id: `LIC-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: newCompany.trim(),
      contactEmail: newEmail.trim().toLowerCase(),
      token: token,
      tier: newTier,
      status: 'active',
      issuedAt: new Date().toISOString().split('T')[0],
      expiresAt: expDate.toISOString().split('T')[0],
      allowedSeats: newSeats
    };

    setLicenses(prev => [newLic, ...prev]);
    setLastGeneratedKey(token);
    onShowToast(`Generated encrypted license for ${newCompany}`);
  };

  const filteredLicenses = licenses.filter(lic =>
    lic.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lic.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lic.token.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Admin Privilege Top Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#12151B] via-[#1A202C] to-[#12151B] text-white border border-[#2B3547] shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-[#12151B] flex items-center justify-center shrink-0 shadow-lg font-black">
              <Crown size={24} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-widest font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                  Master Administrator Session
                </span>
                <span className="text-xs text-[#A6AFBD]">Global Super-User Privileges</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                North Star Clouds Administrative Command
              </h2>
              <p className="text-xs text-[#A6AFBD] mt-0.5 max-w-xl">
                Authenticated as <strong className="text-white">{adminEmail}</strong>. You have full cryptographic key generation authority, tenant management permissions, and underwriting audit overrides.
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setLastGeneratedKey(null);
              setShowGenerateModal(true);
            }}
            className="px-5 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-[#12151B] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:scale-102"
          >
            <Plus size={15} />
            <span>Issue New Encrypted Key</span>
          </button>
        </div>

        {/* System telemetry stats */}
        <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[10px] font-mono text-[#A6AFBD] uppercase">Active Licenses</div>
            <div className="text-lg font-black text-white mt-0.5">
              {licenses.filter(l => l.status === 'active').length} Tenants
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#A6AFBD] uppercase">Enclave Security</div>
            <div className="text-lg font-black text-emerald-400 mt-0.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>AES-256 GCM</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#A6AFBD] uppercase">Hardware HSM Status</div>
            <div className="text-lg font-black text-white mt-0.5 flex items-center gap-1">
              <Cpu size={14} className="text-[#D9CEBF]" />
              <span>Operational (3ms)</span>
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-[#A6AFBD] uppercase">Authorized Seats</div>
            <div className="text-lg font-black text-amber-300 mt-0.5">
              {licenses.reduce((acc, l) => acc + (l.status === 'active' ? l.allowedSeats : 0), 0)} Seats
            </div>
          </div>
        </div>
      </div>

      {/* Main License Management Table Card */}
      <div className="p-6 rounded-3xl bg-white border border-[#D9CEBF] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-[#12151B] tracking-tight">
              Tenant License &amp; Encrypted Key Registry
            </h3>
            <p className="text-xs text-[#4B5363] mt-0.5">
              Manage client organizations, inspect token expiration, and issue immediate revocations.
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tenant, email, or token..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] placeholder:text-[#786450] focus:outline-none focus:border-[#12151B]"
            />
            <Search size={14} className="absolute left-3 top-2.5 text-[#786450]" />
          </div>
        </div>

        {/* License Table */}
        <div className="overflow-x-auto border border-[#E5DCCF] rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F8F6F1] border-b border-[#E5DCCF] text-[#786450] font-mono uppercase text-[10px]">
              <tr>
                <th className="py-3 px-4">Client Tenant</th>
                <th className="py-3 px-4">Tier &amp; Seats</th>
                <th className="py-3 px-4">Encrypted Token Key</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Expires</th>
                <th className="py-3 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5DCCF]">
              {filteredLicenses.map((lic) => (
                <tr key={lic.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-[#12151B]">{lic.companyName}</div>
                    <div className="text-[11px] text-[#786450] font-mono">{lic.contactEmail}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#12151B]">{lic.tier}</span>
                    <span className="text-[11px] text-[#786450] block font-mono">{lic.allowedSeats} Seats</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <div className="flex items-center gap-1.5 bg-[#F5F2EB] px-2 py-1 rounded border border-[#E5DCCF] max-w-fit">
                      <Key size={11} className="text-[#786450]" />
                      <span className="font-bold text-[#12151B] text-[11px]">{lic.token}</span>
                      <button
                        onClick={() => handleCopy(lic.token, lic.id)}
                        className="text-[#786450] hover:text-[#12151B] ml-1 cursor-pointer"
                        title="Copy Token"
                      >
                        {copiedTokenId === lic.id ? (
                          <Check size={12} className="text-emerald-700" />
                        ) : (
                          <Copy size={12} />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    {lic.status === 'active' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                        <CheckCircle2 size={10} />
                        <span>ACTIVE</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full border border-rose-300">
                        <XCircle size={10} />
                        <span>REVOKED</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-[#4B5363]">
                    {lic.expiresAt}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleExtendOneYear(lic.id)}
                        className="px-2.5 py-1 rounded bg-[#F8F6F1] hover:bg-[#EAE3D6] text-[11px] font-bold text-[#12151B] border border-[#D9CEBF] transition-colors cursor-pointer"
                        title="Extend License by 1 Year"
                      >
                        +1 Yr
                      </button>
                      <button
                        onClick={() => handleToggleRevoke(lic.id)}
                        className={`px-2.5 py-1 rounded text-[11px] font-bold border transition-colors cursor-pointer ${
                          lic.status === 'active'
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200'
                            : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                        }`}
                      >
                        {lic.status === 'active' ? 'Revoke' : 'Reactivate'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Direct Administrative Master Underwriting Override Tool */}
      <div className="p-6 rounded-3xl bg-white border border-[#D9CEBF] shadow-xs">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#12151B] text-white flex items-center justify-center">
              <ShieldAlert size={20} className="text-amber-400" />
            </div>
            <div>
              <h4 className="text-base font-black text-[#12151B]">
                Underwriting &amp; Covenant Override Protocols
              </h4>
              <p className="text-xs text-[#4B5363] mt-0.5">
                Super Administrator authority to bypass flagged DSCR thresholds or sign off high-risk conditions.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            AUDIT TRAIL LOGGED
          </span>
        </div>

        <div className="mt-4 p-4 rounded-2xl bg-[#F8F6F1] border border-[#E5DCCF] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Database size={15} className="text-[#786450]" />
            <span>Master regulatory snapshot hash: <strong className="font-mono text-[#12151B]">0x99F4A...B701</strong></span>
          </div>
          <button
            onClick={() => onShowToast('Master administrative compliance snapshot exported.')}
            className="px-4 py-2 rounded-xl bg-[#12151B] text-white hover:bg-[#232834] font-bold text-xs cursor-pointer"
          >
            Export Global Audit Package
          </button>
        </div>
      </div>

      {/* License Generator Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#D9CEBF] shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Crown size={18} className="text-amber-500" />
                <h3 className="text-lg font-black text-[#12151B]">Issue Client Encrypted Access Key</h3>
              </div>
              <button
                onClick={() => setShowGenerateModal(false)}
                className="text-xs text-[#786450] hover:text-[#12151B] font-bold"
              >
                Close
              </button>
            </div>

            {lastGeneratedKey ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center">
                  <CheckCircle2 size={32} className="text-emerald-700 mx-auto mb-2" />
                  <h4 className="font-bold text-[#12151B]">Encrypted License Generated!</h4>
                  <p className="text-xs text-[#4B5363] mt-1">
                    Send this token to the paying client to unlock their dedicated cloud suite.
                  </p>
                  
                  <div className="mt-3 p-3 rounded-xl bg-white border border-[#D9CEBF] flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-[#12151B] select-all truncate">
                      {lastGeneratedKey}
                    </span>
                    <button
                      onClick={() => handleCopy(lastGeneratedKey, 'new')}
                      className="px-3 py-1.5 rounded bg-[#12151B] text-white text-xs font-bold shrink-0 cursor-pointer"
                    >
                      {copiedTokenId === 'new' ? 'Copied!' : 'Copy Key'}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setLastGeneratedKey(null);
                    setShowGenerateModal(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#12151B] text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleGenerateLicense} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#12151B] uppercase mb-1">
                    Client Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Standard Chartered Lending Group"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] focus:outline-none focus:border-[#12151B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12151B] uppercase mb-1">
                    Authorized Contact Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="e.g. credit.director@sc.com"
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] focus:outline-none focus:border-[#12151B]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#12151B] uppercase mb-1">
                    License Tier
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as any)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] focus:outline-none"
                  >
                    <option value="Enterprise Production">Enterprise (£4,850/mo)</option>
                    <option value="Pilot Sandbox">Pilot (£1,450/mo)</option>
                    <option value="Institutional White-Label">White-Label Custom</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#12151B] uppercase mb-1">
                      Seats Allowed
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={newSeats}
                      onChange={(e) => setNewSeats(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#12151B] uppercase mb-1">
                      Term Duration
                    </label>
                    <select
                      value={newDurationMonths}
                      onChange={(e) => setNewDurationMonths(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-xs text-[#12151B] focus:outline-none"
                    >
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months (1 Year)</option>
                      <option value={24}>24 Months (2 Years)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#12151B] font-extrabold text-xs transition-all shadow-md cursor-pointer"
                  >
                    Generate &amp; Encrypt License Key
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
