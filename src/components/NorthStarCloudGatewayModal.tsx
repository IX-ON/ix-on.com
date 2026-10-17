import React, { useState, useEffect } from 'react';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Cloud, 
  CreditCard, 
  Key, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  AlertCircle,
  Copy,
  Check,
  Building,
  UserCheck,
  RefreshCw,
  Eye
} from 'lucide-react';

interface NorthStarCloudGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'signin' | 'subscribe';
}

interface SavedSession {
  email: string;
  company: string;
  token: string;
  planName: string;
  expiresAt: string;
}

export const NorthStarCloudGatewayModal: React.FC<NorthStarCloudGatewayModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'signin',
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'subscribe' | 'preview'>(initialTab);
  
  // Custom or Default Cloud Target
  const [targetUrl, setTargetUrl] = useState<string>('https://app.northstarclouds.com');
  const [isEditingUrl, setIsEditingUrl] = useState(false);

  // Authentication State
  const [authEmail, setAuthEmail] = useState('');
  const [accessKey, setAccessKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [currentSession, setCurrentSession] = useState<SavedSession | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Payment / Subscription State
  const [selectedPlan, setSelectedPlan] = useState<'pilot' | 'enterprise'>('enterprise');
  const [billingName, setBillingName] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingCompany, setBillingCompany] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedToken, setGeneratedToken] = useState('');

  // Interactive Live Console Preview inside modal
  const [previewCaseType, setPreviewCaseType] = useState<'mortgage' | 'sme'>('mortgage');

  // Sync initial tab when modal opens
  useEffect(() => {
    if (currentSession) {
      setActiveTab('signin');
    } else {
      setActiveTab(initialTab);
    }
    setAuthError(null);
  }, [initialTab, isOpen, currentSession]);

  // Check saved session in local storage
  useEffect(() => {
    const saved = localStorage.getItem('ix_on_northstar_cloud_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentSession(parsed);
      } catch {
        // ignore
      }
    }
    const savedUrl = localStorage.getItem('ix_on_northstar_target_url');
    if (savedUrl) {
      setTargetUrl(savedUrl);
    }
  }, []);

  if (!isOpen) return null;

  const handleSaveUrl = (url: string) => {
    const formatted = url.trim();
    if (formatted) {
      setTargetUrl(formatted);
      localStorage.setItem('ix_on_northstar_target_url', formatted);
    }
    setIsEditingUrl(false);
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);

      const cleanKey = accessKey.trim();
      const cleanEmail = authEmail.trim();

      if (
        cleanKey.toUpperCase().startsWith('NS-') || 
        cleanKey.toUpperCase().includes('CLOUD') ||
        cleanKey.length >= 10
      ) {
        const companyName = cleanEmail.split('@')[1] ? cleanEmail.split('@')[1].split('.')[0].toUpperCase() : 'Enterprise Partner';
        const newSession: SavedSession = {
          email: cleanEmail,
          company: companyName,
          token: cleanKey,
          planName: cleanKey.toUpperCase().includes('VIP') || cleanKey.toUpperCase().includes('ENTERPRISE') 
            ? 'Full Production Cloud Suite' 
            : 'Secured Cloud License',
          expiresAt: '2027-10-15',
        };
        setCurrentSession(newSession);
        localStorage.setItem('ix_on_northstar_cloud_session', JSON.stringify(newSession));
      } else {
        setAuthError('Invalid Access Key. Keys must be issued via paid subscription or direct enterprise invitation (format: NS-xxxx-xxxx).');
      }
    }, 800);
  };

  const handleAutofillDemo = () => {
    setAuthEmail('underwriting.director@commercial-bank.com');
    setAccessKey('NS-CLOUD-ENTERPRISE-2026-SECURE');
    setAuthError(null);
  };

  const handlePaymentCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const randomSegment = Math.random().toString(36).substring(2, 8).toUpperCase();
      const token = `NS-CLOUD-${selectedPlan.toUpperCase()}-${randomSegment}-2026`;
      
      const newSession: SavedSession = {
        email: billingEmail,
        company: billingCompany || 'Licensed Enterprise Member',
        token: token,
        planName: selectedPlan === 'enterprise' ? 'Full Enterprise Production Cloud' : 'Pilot Cloud License',
        expiresAt: '2027-10-15',
      };

      setGeneratedToken(token);
      setPaymentSuccess(true);
      setCurrentSession(newSession);
      localStorage.setItem('ix_on_northstar_cloud_session', JSON.stringify(newSession));
    }, 1200);
  };

  const handleSignOut = () => {
    localStorage.removeItem('ix_on_northstar_cloud_session');
    setCurrentSession(null);
    setPaymentSuccess(false);
    setAccessKey('');
    setActiveTab('signin');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const copyDirectLaunchLink = () => {
    navigator.clipboard.writeText(getSecureLaunchUrl());
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Build the secured redirect URL with authentication token
  const getSecureLaunchUrl = () => {
    if (!currentSession) return targetUrl;
    try {
      const urlObj = new URL(targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`);
      urlObj.searchParams.set('token', currentSession.token);
      urlObj.searchParams.set('user', encodeURIComponent(currentSession.email));
      urlObj.searchParams.set('company', encodeURIComponent(currentSession.company));
      urlObj.searchParams.set('origin', 'ix-on.com');
      urlObj.searchParams.set('auth', 'verified');
      return urlObj.toString();
    } catch {
      return `${targetUrl}?token=${encodeURIComponent(currentSession.token)}&auth=verified`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-[#D8CABA] shadow-2xl p-6 sm:p-8 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-[#F8F6F1] border border-[#E5DCCF] text-[#4B5363] hover:text-[#12151B] hover:bg-[#EAE3D6] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs uppercase font-mono tracking-widest text-[#F8F6F1] font-bold bg-[#12151B] px-3 py-1 rounded-full shadow-xs flex items-center gap-1.5">
            <Lock size={11} />
            <span>Secured Gateway</span>
          </span>
          <span className="text-xs text-[#786450] font-semibold flex items-center gap-1">
            <Cloud size={13} />
            <span>North Star Clouds Project</span>
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#12151B] tracking-tight">
          North Star Clouds Access Portal
        </h3>
        <p className="text-xs sm:text-sm text-[#4B5363] mt-1.5 leading-relaxed">
          Access to the hosted North Star Clouds project is restricted exclusively to authenticated 
          enterprise teams with a paid subscription or verified license key.
        </p>

        {/* If Active Paid Session Exists */}
        {currentSession ? (
          <div className="mt-6 space-y-6">
            {/* Status Card */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F8F6F1] to-[#F1ECE2] border border-[#D9CEBF] shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#12151B] text-[#F8F6F1] flex items-center justify-center shrink-0 shadow-xs">
                    <UserCheck size={22} className="text-[#D9CEBF]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[#12151B]">{currentSession.email}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        <span>PAID ACCESS ACTIVE</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#4B5363] mt-1">
                      <span className="flex items-center gap-1">
                        <Building size={12} className="text-[#786450]" />
                        <span>{currentSession.company}</span>
                      </span>
                      <span>&bull;</span>
                      <span>{currentSession.planName}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSignOut}
                  className="text-xs text-[#786450] hover:text-rose-600 underline font-semibold px-2 py-1 shrink-0 transition-colors"
                >
                  Sign Out / Invalidate Key
                </button>
              </div>

              {/* License Token Bar */}
              <div className="mt-4 pt-3 border-t border-[#D9CEBF]/70 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <Key size={13} className="text-[#786450]" />
                  <span className="text-[#4B5363] font-medium">Session Token:</span>
                  <span className="font-mono text-xs font-bold text-[#12151B] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                    {currentSession.token}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(currentSession.token)}
                    className="text-xs text-[#12151B] hover:text-[#786450] font-medium flex items-center gap-1 px-2 py-1 bg-white rounded border border-[#D9CEBF]"
                  >
                    {copiedToken ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                    <span>{copiedToken ? 'Token Copied' : 'Copy Token'}</span>
                  </button>
                  <button
                    onClick={copyDirectLaunchLink}
                    className="text-xs text-[#12151B] hover:text-[#786450] font-medium flex items-center gap-1 px-2 py-1 bg-white rounded border border-[#D9CEBF]"
                  >
                    {copiedLink ? <Check size={12} className="text-emerald-700" /> : <ExternalLink size={12} />}
                    <span>{copiedLink ? 'Link Copied' : 'Copy Signed Link'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Launch Actions */}
            <div className="p-6 rounded-2xl bg-[#14171F] text-white border border-[#2B313E] shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 relative z-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 text-[11px] font-mono font-semibold mb-2">
                    <ShieldCheck size={12} />
                    <span>Authorized Token Ready</span>
                  </div>
                  <h4 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Cloud size={20} className="text-[#E8DFD8]" />
                    <span>Launch North Star Clouds Project</span>
                  </h4>
                  <p className="text-xs text-[#A6AFBD] mt-1 max-w-lg">
                    Redirect to the secure cloud deployment with your verified credentials pre-authenticated.
                  </p>
                  <div className="mt-2 text-[11px] text-[#D8CABA] font-mono">
                    Target: <strong className="text-white">{targetUrl}</strong>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <a
                    href={getSecureLaunchUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#14171F] font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:scale-102"
                  >
                    <span>Launch Project (New Tab)</span>
                    <ExternalLink size={14} />
                  </a>

                  <button
                    onClick={() => setActiveTab(activeTab === 'preview' ? 'signin' : 'preview')}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Eye size={13} />
                    <span>{activeTab === 'preview' ? 'Hide Embedded Workspace' : 'Preview Live Workspace Here'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Embedded Live Workspace Simulator for Instant Client Verification */}
            {activeTab === 'preview' && (
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#D8CABA] animate-in fade-in">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E8DFD2]">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#14171F] block">
                      North Star Clouds Active Console (Live Preview)
                    </span>
                    <span className="text-[11px] text-[#667080]">
                      Instance: ns-cloud-prod-eu1 &bull; Status: Healthy
                    </span>
                  </div>

                  <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#D8CABA]">
                    <button
                      onClick={() => setPreviewCaseType('mortgage')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        previewCaseType === 'mortgage'
                          ? 'bg-[#14171F] text-white'
                          : 'text-[#586170] hover:text-[#14171F]'
                      }`}
                    >
                      Mortgage Console
                    </button>
                    <button
                      onClick={() => setPreviewCaseType('sme')}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        previewCaseType === 'sme'
                          ? 'bg-[#14171F] text-white'
                          : 'text-[#586170] hover:text-[#14171F]'
                      }`}
                    >
                      SME Loan Console
                    </button>
                  </div>
                </div>

                {previewCaseType === 'mortgage' ? (
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Active Mortgage Queue</span>
                        <span className="text-lg font-bold text-[#14171F]">42 Cases</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Lineage Integrity</span>
                        <span className="text-lg font-bold text-emerald-700">100% Provenance</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Auto-Underwrite Rate</span>
                        <span className="text-lg font-bold text-[#14171F]">78.4%</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Living TRID Docs</span>
                        <span className="text-lg font-bold text-emerald-700">Auto-Generated</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#14171F]">Recent Case #MTG-9021 // Oakridge Residential</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                          CONDITION SATISFIED
                        </span>
                      </div>
                      <p className="text-[11px] text-[#586170]">
                        Asset Lineage: Open Banking Plaid verified &bull; Title Deed: County Registry hash matched &bull; Closing Package: Auto-compiled with TRID audit manifest.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-xs">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Commercial Pipeline</span>
                        <span className="text-lg font-bold text-[#14171F]">&pound;18.4M Total</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Accounting Feed Sync</span>
                        <span className="text-lg font-bold text-emerald-700">Real-Time (Xero/QBO)</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">DSCR Stress Engine</span>
                        <span className="text-lg font-bold text-[#14171F]">1.42x Stressed</span>
                      </div>
                      <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-bold block">Covenant Tracing</span>
                        <span className="text-lg font-bold text-emerald-700">Active Webhooks</span>
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#E8DFD2]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#14171F]">Facility #SME-44091 // Aero-Tech Logistics Ltd</span>
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">
                          &pound;650,000 FACILITY ISSUED
                        </span>
                      </div>
                      <p className="text-[11px] text-[#586170]">
                        Cash Flow Lineage: 24-Month bank feeds verified &bull; Director Guarantees: Registered &bull; Dynamic Covenant Schedule: Synced with monthly ledger.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          /* When NOT yet authenticated */
          <div>
            {/* Navigation Tabs */}
            <div className="flex border-b border-[#E8DFD2] mt-6 gap-2">
              <button
                onClick={() => setActiveTab('signin')}
                className={`pb-2.5 px-4 text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === 'signin'
                    ? 'border-[#14171F] text-[#14171F]'
                    : 'border-transparent text-[#667080] hover:text-[#14171F]'
                }`}
              >
                <Key size={15} />
                <span>Enter Paid License / Key</span>
              </button>
              <button
                onClick={() => setActiveTab('subscribe')}
                className={`pb-2.5 px-4 text-xs sm:text-sm font-bold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
                  activeTab === 'subscribe'
                    ? 'border-[#14171F] text-[#14171F]'
                    : 'border-transparent text-[#667080] hover:text-[#14171F]'
                }`}
              >
                <CreditCard size={15} />
                <span>Pay to Unlock Access</span>
              </button>
            </div>

            {/* TAB 1: SIGN IN WITH KEY */}
            {activeTab === 'signin' && (
              <div className="mt-6 space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F] mb-1.5">
                      Authorized Enterprise Work Email
                    </label>
                    <input
                      type="email"
                      required
                      value={authEmail}
                      onChange={(e) => setAuthEmail(e.target.value)}
                      placeholder="underwriter@financial-institution.com"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CABA] rounded-xl text-[#14171F] text-sm focus:outline-none focus:border-[#14171F] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F]">
                        North Star Clouds Access Token / License Key
                      </label>
                      <button
                        type="button"
                        onClick={handleAutofillDemo}
                        className="text-[11px] text-[#78614E] hover:text-[#14171F] underline font-semibold cursor-pointer"
                      >
                        Fill Sample Demo Key
                      </button>
                    </div>
                    <input
                      type="text"
                      required
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      placeholder="NS-CLOUD-XXXX-XXXX-XXXX"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#D8CABA] rounded-xl text-[#14171F] font-mono text-sm focus:outline-none focus:border-[#14171F] focus:bg-white transition-colors"
                    />
                  </div>

                  {authError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2 animate-in fade-in">
                      <AlertCircle size={16} className="shrink-0 mt-0.5 text-rose-600" />
                      <span>{authError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="btn w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-70"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>Verifying Paid License...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck size={16} />
                        <span>Verify License &amp; Unlock Cloud Link</span>
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-4 p-4 rounded-xl bg-[#FAF8F5] border border-[#E8DFD2] text-xs text-[#586170]">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#14171F]">Don't have a North Star Clouds license?</span>
                    <button
                      onClick={() => setActiveTab('subscribe')}
                      className="text-xs text-[#78614E] font-bold hover:underline cursor-pointer"
                    >
                      Pay for Access &rarr;
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Paid access unlocks private tenant execution, live Mortgage &amp; SME Loan case orchestration, and automated living documentation pipelines.
                  </p>
                </div>
              </div>
            )}

            {/* TAB 2: SUBSCRIBE / PAY TO UNLOCK */}
            {activeTab === 'subscribe' && (
              <div className="mt-6 space-y-5">
                {paymentSuccess ? (
                  <div className="p-6 rounded-2xl bg-emerald-50/70 border border-emerald-300 text-center animate-in fade-in">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <CheckCircle2 size={30} />
                    </div>
                    <h4 className="text-xl font-bold text-[#14171F]">Payment Confirmed &bull; License Issued</h4>
                    <p className="text-xs text-[#4D5564] mt-1 max-w-md mx-auto">
                      Your secured access credentials for the North Star Clouds project are now activated.
                    </p>

                    <div className="mt-4 p-3.5 rounded-xl bg-white border border-[#D8CABA] max-w-md mx-auto text-left shadow-xs">
                      <div className="text-[11px] font-bold uppercase text-[#7A6B5D] mb-1">Your Token Key:</div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-[#14171F] font-bold truncate">{generatedToken}</span>
                        <button
                          onClick={() => copyToClipboard(generatedToken)}
                          className="px-2.5 py-1 rounded bg-[#FAF8F5] hover:bg-[#EFE8DE] border border-[#D8CABA] text-xs font-semibold text-[#14171F] shrink-0 flex items-center gap-1 cursor-pointer"
                        >
                          {copiedToken ? <Check size={12} className="text-emerald-700" /> : <Copy size={12} />}
                          <span>{copiedToken ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={getSecureLaunchUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn py-3 px-6 text-xs flex items-center gap-2 shadow-md cursor-pointer"
                      >
                        <span>Launch North Star Clouds Project</span>
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handlePaymentCheckout} className="space-y-4">
                    {/* Plan Selection */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F] mb-2">
                        Select Paid Access Tier
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div
                          onClick={() => setSelectedPlan('pilot')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            selectedPlan === 'pilot'
                              ? 'border-[#14171F] bg-[#FAF8F5] shadow-xs'
                              : 'border-[#E8DFD2] bg-white hover:border-[#D8CABA]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#14171F]">Pilot Cloud License</span>
                            <span className="text-xs font-bold text-[#78614E]">&pound;1,200/mo</span>
                          </div>
                          <p className="text-[11px] text-[#586170] mt-1 leading-snug">
                            Up to 3 underwriter seats, sandbox banking APIs, and Mortgage/SME loan pipelines.
                          </p>
                        </div>

                        <div
                          onClick={() => setSelectedPlan('enterprise')}
                          className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                            selectedPlan === 'enterprise'
                              ? 'border-[#14171F] bg-[#FAF8F5] shadow-xs'
                              : 'border-[#E8DFD2] bg-white hover:border-[#D8CABA]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#14171F]">Enterprise Production</span>
                            <span className="text-xs font-bold text-[#78614E]">&pound;4,500/mo</span>
                          </div>
                          <p className="text-[11px] text-[#586170] mt-1 leading-snug">
                            Unlimited team seats, dedicated cloud tenancy, live ERP/core banking sync, and auto-closing docs.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Institution */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F] mb-1">
                          Billing Contact Name
                        </label>
                        <input
                          type="text"
                          required
                          value={billingName}
                          onChange={(e) => setBillingName(e.target.value)}
                          placeholder="Marcus Vance"
                          className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8CABA] rounded-xl text-[#14171F] text-xs focus:outline-none focus:border-[#14171F]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F] mb-1">
                          Enterprise Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={billingEmail}
                          onChange={(e) => setBillingEmail(e.target.value)}
                          placeholder="m.vance@capital-bank.com"
                          className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8CABA] rounded-xl text-[#14171F] text-xs focus:outline-none focus:border-[#14171F]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#14171F] mb-1">
                        Financial Institution / Organization
                      </label>
                      <input
                        type="text"
                        required
                        value={billingCompany}
                        onChange={(e) => setBillingCompany(e.target.value)}
                        placeholder="Premier Mortgage & Commercial Credit Partners"
                        className="w-full px-3.5 py-2 bg-[#FAF8F5] border border-[#D8CABA] rounded-xl text-[#14171F] text-xs focus:outline-none focus:border-[#14171F]"
                      />
                    </div>

                    {/* Payment Simulation Form */}
                    <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#D8CABA] text-xs">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-[#14171F] flex items-center gap-1.5">
                          <CreditCard size={14} className="text-[#78614E]" />
                          <span>Secure Card Payment</span>
                        </span>
                        <span className="text-[10px] text-[#7A6B5D] uppercase font-mono font-semibold">256-Bit SSL Encrypted</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          required
                          defaultValue="4242 •••• •••• 4242"
                          placeholder="Card Number"
                          className="col-span-2 px-3 py-1.5 bg-white border border-[#D8CABA] rounded-lg text-xs text-[#14171F] font-mono"
                        />
                        <input
                          type="text"
                          required
                          defaultValue="12/28"
                          placeholder="MM/YY"
                          className="px-3 py-1.5 bg-white border border-[#D8CABA] rounded-lg text-xs text-[#14171F] font-mono text-center"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isProcessingPayment}
                      className="btn w-full py-3.5 text-xs font-bold flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-75"
                    >
                      {isProcessingPayment ? (
                        <>
                          <RefreshCw size={14} className="animate-spin" />
                          <span>Processing Payment &amp; Authorizing Credentials...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={14} />
                          <span>Confirm Payment &amp; Unlock North Star Clouds</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}

        {/* Cloud Project URL Configuration Footer (Client can set their custom destination) */}
        <div className="mt-8 pt-4 border-t border-[#E8DFD2] flex flex-wrap items-center justify-between text-[11px] text-[#667080] gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-emerald-700" />
            <span>Encrypted Token-Gated Redirect Protocol (ix-on.com &rarr; North Star Clouds)</span>
          </div>

          <div className="flex items-center gap-2">
            {isEditingUrl ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  defaultValue={targetUrl}
                  id="target-url-input"
                  className="px-2 py-0.5 border border-[#D8CABA] rounded bg-white text-[11px] text-[#14171F] font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    const input = document.getElementById('target-url-input') as HTMLInputElement;
                    if (input) handleSaveUrl(input.value);
                  }}
                  className="px-2 py-0.5 bg-[#14171F] text-white rounded text-[10px] font-semibold cursor-pointer"
                >
                  Save URL
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingUrl(true)}
                className="text-[#78614E] hover:underline font-semibold cursor-pointer"
                title="Configure custom North Star Clouds target URL"
              >
                Target URL: <span className="font-mono text-[#14171F]">{targetUrl}</span> (Edit)
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
