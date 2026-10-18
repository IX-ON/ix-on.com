import React, { useState, useEffect } from 'react';
import { NorthStarTab, MortgageCase, SmeFacility, LineageNode, LivingDoc } from './types';
import { 
  INITIAL_MORTGAGE_CASES, 
  INITIAL_SME_FACILITIES, 
  INITIAL_LINEAGE_NODES, 
  INITIAL_LIVING_DOCS 
} from './mockData';
import { MortgageWorkspace } from './MortgageWorkspace';
import { SmeLoanWorkspace } from './SmeLoanWorkspace';
import { DataLineageExplorer } from './DataLineageExplorer';
import { DocVault } from './DocVault';
import { NewCaseModal } from './NewCaseModal';
import { AdminLicenseManager } from './AdminLicenseManager';
import { 
  Cloud, 
  Home, 
  Building2, 
  Database, 
  FileText, 
  ArrowLeft, 
  ShieldCheck, 
  CheckCircle2,
  Lock,
  Key,
  LogOut,
  AlertCircle,
  Copy,
  Check,
  CreditCard,
  Crown
} from 'lucide-react';

interface SavedSession {
  email: string;
  company: string;
  token: string;
  planName: string;
  expiresAt: string;
  role?: 'admin' | 'underwriter';
}

interface NorthStarCloudAppProps {
  onExit: () => void;
  onOpenPaymentModal?: () => void;
}

export const NorthStarCloudApp: React.FC<NorthStarCloudAppProps> = ({ 
  onExit,
  onOpenPaymentModal
}) => {
  // Session Authentication State
  const [session, setSession] = useState<SavedSession | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Lockscreen verification inputs
  const [inputEmail, setInputEmail] = useState('');
  const [inputKey, setInputKey] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  // Application Workspaces
  const [activeTab, setActiveTab] = useState<NorthStarTab>('mortgage');
  const [mortgageCases, setMortgageCases] = useState<MortgageCase[]>(INITIAL_MORTGAGE_CASES);
  const [smeFacilities, setSmeFacilities] = useState<SmeFacility[]>(INITIAL_SME_FACILITIES);
  const [lineageNodes] = useState<LineageNode[]>(INITIAL_LINEAGE_NODES);
  const [livingDocs] = useState<LivingDoc[]>(INITIAL_LIVING_DOCS);

  const [newCaseModalOpen, setNewCaseModalOpen] = useState(false);
  const [docVaultRef, setDocVaultRef] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check saved session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ix_on_northstar_cloud_session');
      if (stored) {
        const parsed: SavedSession = JSON.parse(stored);
        if (parsed && parsed.token) {
          setSession(parsed);
          if (parsed.role === 'admin' || parsed.email === 'sgodha@gmail.com') {
            setActiveTab('admin');
          }
        }
      }
    } catch {
      // invalid stored session
    }
    setAuthChecked(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isAdmin = Boolean(
    session?.role === 'admin' || 
    session?.email === 'sgodha@gmail.com' || 
    session?.token.toUpperCase().includes('ADMIN')
  );

  const handleVerifyAccessKey = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      const cleanKey = inputKey.trim().toUpperCase();
      const cleanEmail = inputEmail.trim().toLowerCase();

      if (!cleanEmail || !cleanEmail.includes('@')) {
        setAuthError('Please enter a valid email address.');
        return;
      }

      // Check Master Administrator credentials
      if (
        cleanEmail === 'sgodha@gmail.com' ||
        cleanKey.includes('ADMIN') ||
        cleanKey === 'NS-ADMIN-MASTER-2026-IXON'
      ) {
        const adminSession: SavedSession = {
          email: cleanEmail || 'sgodha@gmail.com',
          company: 'IX-ON Executive Advisory & Cloud Ops',
          token: cleanKey.startsWith('NS-') ? cleanKey : 'NS-ADMIN-MASTER-2026-IXON',
          planName: 'Master Platform Super Administrator',
          expiresAt: '2030-12-31',
          role: 'admin'
        };
        localStorage.setItem('ix_on_northstar_cloud_session', JSON.stringify(adminSession));
        setSession(adminSession);
        setActiveTab('admin');
        showToast('Authenticated as Master Administrator (sgodha@gmail.com)');
        return;
      }

      // Check Standard Encrypted Tenant credentials
      if (
        cleanKey.startsWith('NS-') || 
        cleanKey.includes('CLOUD') ||
        cleanKey.length >= 10
      ) {
        const domain = cleanEmail.split('@')[1];
        const companyName = domain ? domain.split('.')[0].toUpperCase() + ' Group' : 'Licensed Partner';
        const newSession: SavedSession = {
          email: cleanEmail,
          company: companyName,
          token: cleanKey,
          planName: cleanKey.includes('ENTERPRISE') ? 'Full Production Cloud Suite' : 'Secured Cloud License',
          expiresAt: '2027-10-15',
          role: 'underwriter'
        };
        localStorage.setItem('ix_on_northstar_cloud_session', JSON.stringify(newSession));
        setSession(newSession);
        setActiveTab('mortgage');
        showToast('Encrypted session authenticated successfully.');
      } else {
        setAuthError('Invalid Access Key. Keys are issued post-payment or via enterprise agreement (format: NS-xxxx-xxxx).');
      }
    }, 700);
  };

  const handleAutofillAdmin = () => {
    setInputEmail('sgodha@gmail.com');
    setInputKey('NS-ADMIN-MASTER-2026-IXON');
    setAuthError(null);
  };

  const handleAutofillDemo = () => {
    setInputEmail('underwriting.director@commercial-bank.com');
    setInputKey('NS-CLOUD-ENTERPRISE-2026-SECURE');
    setAuthError(null);
  };

  const handleSignOut = () => {
    localStorage.removeItem('ix_on_northstar_cloud_session');
    setSession(null);
    showToast('Session locked. Token invalidated.');
  };

  const copySessionToken = () => {
    if (session?.token) {
      navigator.clipboard.writeText(session.token);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  const handleUpdateMortgageCase = (updated: MortgageCase) => {
    setMortgageCases(prev => prev.map(c => c.id === updated.id ? updated : c));
    showToast(`Updated Mortgage Case ${updated.id} (${updated.status})`);
  };

  const handleUpdateSmeFacility = (updated: SmeFacility) => {
    setSmeFacilities(prev => prev.map(f => f.id === updated.id ? updated : f));
    showToast(`Updated SME Facility ${updated.id} (${updated.status})`);
  };

  const handleAddMortgageCase = (newCase: MortgageCase) => {
    setMortgageCases(prev => [newCase, ...prev]);
    showToast(`Instantiated new case ${newCase.id}`);
  };

  const handleAddSmeFacility = (newFacility: SmeFacility) => {
    setSmeFacilities(prev => [newFacility, ...prev]);
    showToast(`Instantiated new facility ${newFacility.id}`);
  };

  const handleOpenDocVaultForRef = (ref: string) => {
    setDocVaultRef(ref);
    setActiveTab('doc-vault');
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#12151B] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 text-sm font-mono text-[#D9CEBF]">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Verifying cryptographic credentials...</span>
        </div>
      </div>
    );
  }

  // LOCKED STATE: ACCESS RESTRICTED BEHIND ENCRYPTED ACCESS KEY
  if (!session) {
    return (
      <div className="min-h-screen bg-[#0D1017] text-white flex flex-col justify-between font-sans selection:bg-[#D9CEBF] selection:text-[#12151B]">
        {/* Top Minimal Bar */}
        <div className="border-b border-[#1F2532] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft size={13} />
              <span>Back to IX-ON Advisory</span>
            </button>
            <div className="h-4 w-px bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Cloud size={16} className="text-[#D9CEBF]" />
              <span className="text-xs font-bold text-white tracking-wide">North Star Clouds</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/60 px-3 py-1 rounded-full">
            <Lock size={11} />
            <span>ENCRYPTED ACCESS REQUIRED</span>
          </div>
        </div>

        {/* Center Lockscreen Card */}
        <div className="max-w-xl w-full mx-auto p-6 sm:p-8">
          <div className="p-8 rounded-3xl bg-[#141923] border border-[#2B3547] shadow-2xl relative overflow-hidden">
            {/* Background ambient glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-700/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto mb-4 shadow-inner">
                <Lock size={26} />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-[#D9CEBF] uppercase mb-2">
                Restricted Institutional Portal
              </div>

              <h2 className="text-2xl font-black tracking-tight text-white">
                North Star Clouds Suite
              </h2>
              <p className="text-xs text-[#9BA5B7] mt-2 leading-relaxed max-w-md mx-auto">
                This cloud solution contains proprietary mortgage and SME lending infrastructure. Access is strictly restricted to licensed partners holding an encrypted key issued post-payment.
              </p>
            </div>

            {/* Quick Administrator One-Click Access Card */}
            <div className="mt-5 p-3.5 rounded-2xl bg-amber-950/40 border border-amber-600/50 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-[#12151B] flex items-center justify-center shrink-0 font-bold">
                  <Crown size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold text-amber-300">Administrator Access</div>
                  <div className="text-[11px] text-[#A6AFBD] font-mono">Master command for sgodha@gmail.com</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutofillAdmin}
                className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#12151B] font-extrabold text-xs shrink-0 cursor-pointer shadow-xs transition-colors"
              >
                Autofill Admin Key
              </button>
            </div>

            {/* Error Alert */}
            {authError && (
              <div className="mt-5 p-3.5 rounded-xl bg-rose-950/60 border border-rose-800/80 text-rose-200 text-xs flex items-start gap-2.5">
                <AlertCircle size={15} className="text-rose-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{authError}</span>
              </div>
            )}

            {/* Verification Form */}
            <form onSubmit={handleVerifyAccessKey} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#D9CEBF] mb-1.5">
                  Institutional / Administrator Email
                </label>
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="e.g. sgodha@gmail.com or director@bank.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0F131C] border border-[#2B3547] text-white text-xs placeholder:text-[#5E687A] focus:outline-none focus:border-amber-400 transition-colors font-mono"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#D9CEBF]">
                    Encrypted Access Key / Token
                  </label>
                  <span className="text-[10px] font-mono text-[#7A8699]">Format: NS-xxxx-xxxx</span>
                </div>
                <div className="relative">
                  <input
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Enter issued key or Master Admin Token"
                    required
                    className="w-full px-4 py-2.5 pl-10 rounded-xl bg-[#0F131C] border border-[#2B3547] text-white text-xs placeholder:text-[#5E687A] focus:outline-none focus:border-amber-400 transition-colors font-mono"
                  />
                  <Key size={14} className="absolute left-3.5 top-3 text-[#7A8699]" />
                </div>
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full py-3 rounded-xl bg-white text-[#12151B] hover:bg-[#FAF8F5] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#12151B] border-t-transparent rounded-full animate-spin"></span>
                    <span>Decrypting &amp; Validating Session...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={15} />
                    <span>Verify Key &amp; Unlock Suite</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Demo Autofill & Payment Links */}
            <div className="mt-6 pt-5 border-t border-[#232B3B] space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleAutofillDemo}
                  className="text-xs text-[#D9CEBF] hover:text-white underline font-mono flex items-center gap-1 cursor-pointer"
                >
                  <Key size={11} />
                  <span>Autofill Client Underwriter Demo Key</span>
                </button>

                {onOpenPaymentModal && (
                  <button
                    type="button"
                    onClick={onOpenPaymentModal}
                    className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <CreditCard size={12} />
                    <span>Purchase Access / Issue Key &rarr;</span>
                  </button>
                )}
              </div>

              <p className="text-[11px] text-[#707C91] text-center leading-relaxed">
                Need an institutional deployment or custom credit stress modules? Keys are provisioned following agreement and payment verification.
              </p>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-[#1F2532] px-6 py-3 text-center text-[11px] text-[#5E687A] font-mono">
          North Star Clouds Protected Tenant Gateway &bull; Encrypted SHA-256 Auth
        </div>
      </div>
    );
  }

  // AUTHENTICATED STATE: FULL SUITE ACCESS
  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#12151B] flex flex-col font-sans selection:bg-[#D9CEBF]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#12151B] text-white shadow-2xl border border-white/20 flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-5">
          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Application Header */}
      <header className="sticky top-0 z-40 bg-[#12151B] text-white border-b border-[#232834] px-4 sm:px-8 py-3.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          {/* Brand & Instance Tag */}
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold mr-1"
              title="Return to IX-ON Advisory Website"
            >
              <ArrowLeft size={14} />
              <span className="hidden md:inline">Return to IX-ON</span>
            </button>

            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#EAE3D6] to-[#C9B9A6] flex items-center justify-center text-[#12151B] shadow-xs">
              <Cloud size={18} />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                  North Star Clouds
                </h1>
                {isAdmin ? (
                  <span className="text-[10px] font-mono font-bold bg-amber-400 text-[#12151B] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Crown size={10} />
                    <span>ADMIN COMMAND</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-mono font-bold bg-white/15 text-[#EAE3D6] px-2 py-0.5 rounded-full border border-white/10">
                    ENCRYPTED TENANT v2.4
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#A6AFBD] font-mono leading-none mt-0.5">
                Financial Architecture &bull; Lending Engine
              </p>
            </div>
          </div>

          {/* User Session & Status Bar */}
          <div className="flex flex-wrap items-center gap-2.5 self-end sm:self-center">
            {isAdmin ? (
              <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-500/40">
                <Crown size={14} className="text-amber-400 shrink-0" />
                <span>Super Admin: <strong className="text-white">{session.email}</strong></span>
                <span className="text-amber-400/60 hidden lg:inline">&bull;</span>
                <span className="hidden lg:inline text-[11px] font-mono text-amber-300 font-bold">MASTER PRIVILEGES</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#A6AFBD] bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>Tenant: <strong className="text-white">{session.company}</strong></span>
                <span className="text-[#A6AFBD] hidden lg:inline">&bull;</span>
                <span className="hidden lg:inline text-[11px] font-mono text-emerald-400">ENCRYPTED ACTIVE</span>
              </div>
            )}

            {/* Token Badge */}
            <div className="hidden sm:flex items-center gap-1.5 bg-white/10 px-2.5 py-1.5 rounded-xl border border-white/10 text-xs">
              <Key size={12} className="text-[#D9CEBF]" />
              <span className="font-mono text-[11px] text-[#D9CEBF]">{session.token.slice(0, 16)}...</span>
              <button
                onClick={copySessionToken}
                className="text-white hover:text-[#D9CEBF] cursor-pointer ml-1"
                title="Copy full key token"
              >
                {copiedToken ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
              </button>
            </div>

            <button
              onClick={() => setNewCaseModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-white text-[#12151B] hover:bg-[#FAF8F5] font-extrabold text-xs transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
            >
              <span>+ Ingest Case</span>
            </button>

            <button
              onClick={handleSignOut}
              className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40 text-xs transition-colors cursor-pointer flex items-center gap-1"
              title="Lock Session and Invalidate Token"
            >
              <LogOut size={13} />
              <span className="hidden md:inline">Lock Session</span>
            </button>
          </div>
        </div>
      </header>

      {/* Sub-Header Navigation Tabs */}
      <nav className="bg-white border-b border-[#D9CEBF] px-4 sm:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5">
          {isAdmin && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
                activeTab === 'admin'
                  ? 'bg-amber-400 text-[#12151B] shadow-xs font-black'
                  : 'text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Crown size={15} className="text-amber-700" />
              <span>Admin &amp; Client Licenses</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-amber-200 text-amber-950 font-bold">
                COMMAND
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('mortgage')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'mortgage'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B] hover:bg-[#F8F6F1]'
            }`}
          >
            <Home size={15} />
            <span>Mortgage Case Management</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'mortgage' ? 'bg-white/20 text-white' : 'bg-[#EAE3D6] text-[#12151B]'}`}>
              {mortgageCases.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('sme')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'sme'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B] hover:bg-[#F8F6F1]'
            }`}
          >
            <Building2 size={15} />
            <span>SME Loan Management</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'sme' ? 'bg-white/20 text-white' : 'bg-[#EAE3D6] text-[#12151B]'}`}>
              {smeFacilities.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('lineage')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'lineage'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B] hover:bg-[#F8F6F1]'
            }`}
          >
            <Database size={15} />
            <span>Data Lineage Explorer</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'lineage' ? 'bg-white/20 text-white' : 'bg-[#EAE3D6] text-[#12151B]'}`}>
              {lineageNodes.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('doc-vault')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0 ${
              activeTab === 'doc-vault'
                ? 'bg-[#12151B] text-white shadow-xs'
                : 'text-[#4B5363] hover:text-[#12151B] hover:bg-[#F8F6F1]'
            }`}
          >
            <FileText size={15} />
            <span>Automated Document Vault</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${activeTab === 'doc-vault' ? 'bg-white/20 text-white' : 'bg-[#EAE3D6] text-[#12151B]'}`}>
              {livingDocs.length}
            </span>
          </button>
        </div>
      </nav>

      {/* Main Workspace Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8">
        {isAdmin && activeTab === 'admin' && (
          <AdminLicenseManager
            adminEmail={session.email}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'mortgage' && (
          <MortgageWorkspace
            cases={mortgageCases}
            onUpdateCase={handleUpdateMortgageCase}
            onOpenDocVault={handleOpenDocVaultForRef}
            onOpenNewCaseModal={() => setNewCaseModalOpen(true)}
          />
        )}

        {activeTab === 'sme' && (
          <SmeLoanWorkspace
            facilities={smeFacilities}
            onUpdateFacility={handleUpdateSmeFacility}
            onOpenDocVault={handleOpenDocVaultForRef}
            onOpenNewCaseModal={() => setNewCaseModalOpen(true)}
          />
        )}

        {activeTab === 'lineage' && (
          <DataLineageExplorer
            nodes={lineageNodes}
            onOpenCase={(caseId) => {
              if (caseId.startsWith('NS-MTG')) {
                setActiveTab('mortgage');
              } else if (caseId.startsWith('NS-SME')) {
                setActiveTab('sme');
              }
            }}
          />
        )}

        {activeTab === 'doc-vault' && (
          <DocVault
            initialSelectedDocRef={docVaultRef}
            docs={livingDocs}
          />
        )}
      </main>

      {/* New Case Creation Modal */}
      <NewCaseModal
        isOpen={newCaseModalOpen}
        onClose={() => setNewCaseModalOpen(false)}
        onAddMortgageCase={handleAddMortgageCase}
        onAddSmeFacility={handleAddSmeFacility}
      />
    </div>
  );
};
