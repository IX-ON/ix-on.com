import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProcessMappingSection } from './components/ProcessMappingSection';
import { DataLineageSection } from './components/DataLineageSection';
import { AutomatedDocPipelines } from './components/AutomatedDocPipelines';
import { NorthStarSection } from './components/NorthStarSection';
import { DiagnosticAudit } from './components/DiagnosticAudit';
import { ExecutionFramework } from './components/ExecutionFramework';
import { WhyIxOn } from './components/WhyIxOn';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NorthStarCloudGatewayModal } from './components/NorthStarCloudGatewayModal';
import { NorthStarCloudApp } from './components/northstar/NorthStarCloudApp';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface SavedSession {
  email: string;
  company: string;
  token: string;
  planName: string;
  expiresAt: string;
}

export const App: React.FC = () => {
  const [view, setView] = useState<'consultancy' | 'northstar-app'>('consultancy');
  const [selectedInterest, setSelectedInterest] = useState<string>('Systems Discovery (£995 Diagnostic)');
  const [cloudGatewayOpen, setCloudGatewayOpen] = useState(false);
  const [cloudGatewayTab, setCloudGatewayTab] = useState<'signin' | 'subscribe'>('signin');
  const [session, setSession] = useState<SavedSession | null>(null);

  const refreshSession = () => {
    try {
      const stored = localStorage.getItem('ix_on_northstar_cloud_session');
      if (stored) {
        const parsed: SavedSession = JSON.parse(stored);
        if (parsed && parsed.token) {
          setSession(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setSession(null);
  };

  useEffect(() => {
    refreshSession();
  }, [cloudGatewayOpen, view]);

  const handleSelectSolutionForContact = (solutionName: string) => {
    setSelectedInterest(solutionName);
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenCloudGateway = (tab: 'signin' | 'subscribe' = 'signin') => {
    setCloudGatewayTab(tab);
    setCloudGatewayOpen(true);
  };

  const handleLaunchMergedPlatform = () => {
    setView('northstar-app');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitNorthStar = () => {
    refreshSession();
    setView('consultancy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveSession = Boolean(session && session.token);

  if (view === 'northstar-app') {
    return (
      <NorthStarCloudApp
        onExit={handleExitNorthStar}
        onOpenPaymentModal={() => {
          handleOpenCloudGateway('subscribe');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F6F1] text-[#12151B] selection:bg-[#D9CEBF] selection:text-[#12151B]">
      {/* Top Banner announcing Encrypted Institutional Access */}
      <div className="bg-[#12151B] text-white py-2 px-4 text-xs border-b border-[#232834]">
        <div className="container-custom flex flex-wrap items-center justify-between gap-2">
          {hasActiveSession ? (
            <div className="flex items-center gap-2">
              <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
              <span className="font-mono text-[#D9CEBF] font-bold">LICENSED SESSION:</span>
              <span className="text-[#E5DCCF]">
                Active Encrypted Access for <strong>{session?.company}</strong> ({session?.planName})
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock size={12} className="text-amber-400 shrink-0" />
              <span className="font-mono text-[#D9CEBF] font-bold">NORTH STAR CLOUDS:</span>
              <span className="text-[#C8D1DE]">
                Proprietary banking architecture restricted behind encrypted access (issued post-payment).
              </span>
            </div>
          )}

          {hasActiveSession ? (
            <button
              onClick={handleLaunchMergedPlatform}
              className="text-emerald-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Open Encrypted Suite</span>
              <ArrowRight size={12} />
            </button>
          ) : (
            <button
              onClick={() => handleOpenCloudGateway('signin')}
              className="text-[#D9CEBF] hover:text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>Enter Key / Subscribe</span>
              <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>

      <Navbar 
        onOpenCloudGateway={handleOpenCloudGateway}
        onLaunchMergedPlatform={handleLaunchMergedPlatform}
        hasActiveSession={hasActiveSession}
      />
      <main>
        <Hero 
          onOpenCloudGateway={handleOpenCloudGateway}
          onLaunchMergedPlatform={handleLaunchMergedPlatform}
          hasActiveSession={hasActiveSession}
        />
        <ProcessMappingSection />
        <DataLineageSection />
        <AutomatedDocPipelines />
        <NorthStarSection 
          onSelectSolutionForContact={handleSelectSolutionForContact}
          onOpenCloudGateway={handleOpenCloudGateway}
          onLaunchMergedPlatform={handleLaunchMergedPlatform}
          hasActiveSession={hasActiveSession}
        />
        <DiagnosticAudit onSelectAuditOption={handleSelectSolutionForContact} />
        <ExecutionFramework onSelectAuditOption={handleSelectSolutionForContact} />
        <WhyIxOn />
        <ContactSection initialInterest={selectedInterest} />
      </main>
      <Footer />

      {/* Restricted North Star Clouds Paid Gateway Modal */}
      <NorthStarCloudGatewayModal
        isOpen={cloudGatewayOpen}
        onClose={() => {
          setCloudGatewayOpen(false);
          refreshSession();
        }}
        initialTab={cloudGatewayTab}
        onLaunchMergedPlatform={handleLaunchMergedPlatform}
      />
    </div>
  );
};

export default App;
